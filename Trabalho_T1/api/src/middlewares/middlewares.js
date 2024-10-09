import jwt from 'jsonwebtoken'
import Usuario from "../models/usuario.js"

export const authenticaToken = (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) return res.status(403).json({ message: 'Token não fornecido' })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' })

        req.user = user
        next()
    })
}

export const masterAuthentication =  async (req, res, next) => {
    const token = req.headers['authorization']

    if (!token) return res.status(403).json({ message: 'Token não fornecido' })
    const userid = jwt.decode(token)
    const master = await Usuario.findOne({idufsc: "masterUser"});
    if (userid.id != master.id) {
        return res.status(403).json({ message: 'Usuário não tem acesso'});}

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: 'Token inválido' })
    
        req.user = user
        next()
    })
}

export default { authenticaToken, masterAuthentication }