import express from "express";
import router from './src/routes/index.js';

const app = express();
const PORT = process.env.PORT || 2000;

app.get('/', (req, res) => {
    res.send('Servidor online');
});

app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


