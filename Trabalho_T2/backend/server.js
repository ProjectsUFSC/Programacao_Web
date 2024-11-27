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

app.use('/api', routes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`HTTP Server running on http://localhost:${PORT}`);
})

// const key = fs.readFileSync(path.join(__dirname, 'localhost+2-key.pem'), 'utf8');
// const cert = fs.readFileSync(path.join(__dirname, 'localhost+2.pem'), 'utf8');
// const httpsServer = https.createServer({ key, cert }, app);

// httpsServer.listen(PORT, () => {
//   console.log(`HTTPS Server running on https://localhost:${PORT}`);
// });
