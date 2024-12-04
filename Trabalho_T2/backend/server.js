const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const db = require('./db');
const routes = require('./routes'); 

const app = express();

app.use(express.json());

app.use(cors());

db.conectaDB();

// Middleware para servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'www')));

// Rota para a API
app.use('/api', routes);

// Rota para arquivos do SPA (tratamento de rotas do Vue.js)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www', 'index.html'));
});

// Certificados SSL
const key = fs.readFileSync(path.join(__dirname, 'localhost-key.pem'), 'utf8');
const cert = fs.readFileSync(path.join(__dirname, 'localhost-cert.pem'), 'utf8');

// Servidor HTTPS
const httpsServer = https.createServer({ key, cert }, app);

const PORT = 3000;

httpsServer.listen(PORT, () => {
  console.log(`HTTPS Server running on https://localhost:${PORT}`);
});
