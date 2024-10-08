import Usuario from "../models/usuario.js"
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { fechaduras } from "../../server.js"


export const getUsers = async (req, res) => {
    try{
        const usuarios = await Usuario.find()
        if(usuarios == null){
            return res.status(404).json({ message: 'Nenhum usuário encontrado' })}
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar usuários', error: error.message})
    }
}

export const login = async (req, res) => {
    try{
        const usuario = await Usuario.findOne({idufsc: req.body.idufsc})
        if(!usuario){
            return res.status(404).json({ message: 'Usuário não encontrado' })}
        if(await bcrypt.compare(req.body.senha, usuario.senha) == false){
            return res.status(401).json({ message: 'Senha incorreta' })}

        const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.status(200).json({ message: 'Login efetuado com sucesso', token: token, id: usuario._id })

    } catch (error) {
        res.status(500).json({message: 'Erro ao buscar usuário', error: error.message})
    }}

export const cadastro = async (req, res) => {
    const usuario = new Usuario({
        nome: req.body.nome,
        idufsc: req.body.idufsc,
        email: req.body.email,
        senha: await bcrypt.hash(req.body.senha, 10),
    })
    try{
        if(await Usuario.findOne({idufsc: req.body.idufsc})){
            return res.status(409).json({ message: 'Usuário já cadastrado' })}
        const novoUsuario = await usuario.save()
        res.status(201).json(novoUsuario)
    } catch (error) {
        res.status(400).json({message: 'Erro ao criar usuário', error: error.message})
    }}

export const listaPortas = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.user.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        const master = await Usuario.findOne({idufsc: "masterUser"});
        if (usuario.id == master.id) {
            return res.status(200).json({salas: usuario.salas , isAdmin: true });
        }
        res.status(200).json({ salas: usuario.salas , isAdmin: false });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar salas', error: error.message });
    }}

export const abrePorta = (req, res) => {
    const porta = fechaduras[req.body.id];

    if (!porta) {
        return res.status(404).json({ message: 'Porta não encontrada' });
    }
    else {
        porta.send(JSON.stringify({ tipo: 'abre' }));
        res.status(200).json({ message: 'Porta aberta' });
    }
};

export default {getUsers, login, cadastro, listaPortas, abrePorta}