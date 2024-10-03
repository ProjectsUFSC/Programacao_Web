import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv/config"
import router from './src/routes/index.js'

const app = express()
const PORT = process.env.PORT || 2000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/controlePortas'

mongoose.connect(MONGO_URL)

const db = mongoose.connection;
db.on('error', (error) => console.error('Erro ao conectar ao MongoDB:', error));
db.once('open', () => {
    console.log('Conexão com MongoDB estabelecida com sucesso');
});

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
});


