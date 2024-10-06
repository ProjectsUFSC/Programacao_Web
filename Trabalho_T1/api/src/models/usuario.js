import mongoose from "mongoose"

const usuarioSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idufsc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    salas: {
        type: Array,
        required: false
    }
})

const Usuario = mongoose.model('Usuario', usuarioSchema)

export default Usuario