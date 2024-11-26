const express = require('express');
const db = require('./db');
const routes = require('./routes'); 
const cors = require('cors');



const app = express();

app.use(express.json());

app.use(cors());

db.conectaDB();

app.use('/api', routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});