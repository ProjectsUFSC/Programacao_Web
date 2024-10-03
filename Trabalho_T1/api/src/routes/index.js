import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.send('Servidor online');
});npm 

router.get('/lista', (req, res) => {
    res.send('Lista');
});

router.post('/login', (req, res) => {
    res.send('Login');
});

router.post('/abre', (req, res) => {
    res.send('Abre');
});

export default router;