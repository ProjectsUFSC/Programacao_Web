import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv/config"
import router from './src/routes/routes.js'
import http from 'http';
import { server as WebSocketServer } from 'websocket';

const app = express()
const PORT = process.env.PORT || 2000
const WS_PORT = process.env.WS_PORT || 4000
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/controlePortas'

mongoose.connect(MONGO_URL)

const db = mongoose.connection;
db.on('error', (error) => console.error('Erro ao conectar ao MongoDB:', error))
db.once('open', () => {
    console.log('Conexão com MongoDB estabelecida com sucesso')
})

app.use(express.json())
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

const server = http.createServer()

server.listen(WS_PORT, () => {
    console.log(`Servidor WebSocket está ouvindo na porta ${WS_PORT}`);
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: true
});

const fechaduras = {}

wsServer.on('connect', function(connection) {
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            let dados = JSON.parse(message.utf8Data);
            console.log(`\nFechadura ${dados.id} com senha ${dados.passwd} foi cadastrada`);
            fechaduras[dados.id] = connection;
            console.log(fechaduras);
        }


    });

    connection.on('close', function() {
        console.log('Conexão fechada.');
    });
});

export { fechaduras }
