const express = require('express');
const router = express.Router();
const db = require('./db');

// Example routes
router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

router.post('/register', async (req, res) => {
    const { user, password } = req.body;

    try {
      const userId = await db.registraUsuario(user, password);
      res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!', userId });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao registrar usuário', error: error.message });
    }
  });

router.post('/login', async (req, res) => {
    const { user, password } = req.body;
  
    try {
      const authData = await db.autenticaUsuario(user, password);
      if (authData) {
        res.status(200).json({ success: true, token: authData.token, userId: authData.userId });
      } else {
        res.status(401).json({ success: false, message: 'Credenciais inválidas' });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Erro ao fazer login', error: error.message });
    }
  });


function autenticarToken(req, res, next) {
const token = req.headers.authorization?.split(' ')[1];
if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
}
try {
    const decoded = jwt.verify(token, ChaveSecreta);
    req.userId = decoded.userId;
    next();
} catch (error) {
    res.status(403).json({ message: 'Token inválido' });
}
}

router.post('/qr-codes', autenticarToken, async (req, res) => {
const { code, username } = req.body;

if (!code || !username) {
    return res.status(400).json({ success: false, message: 'Código e username são obrigatórios' });
}

try {
    const updatedUser = await AdicionaCodigo(username, code); // Atualiza o banco com o QR-Code
    res.status(200).json({ success: true, message: 'QR-Code salvo com sucesso!', user: updatedUser });
} catch (error) {
    console.error('Erro ao salvar QR-Code:', error.message);
    res.status(500).json({ success: false, message: 'Erro ao salvar QR-Code' });
}
});

router.get('/user-qr-codes', autenticarToken, async (req, res) => {
    const userId = req.userId;
    try {
      const codes = await db.buscarCodigos(userId);
      console.log(codes)
      res.status(200).json({ success: true, codes });
    } catch (error) {
      console.error('Erro ao buscar QR-Codes do usuário:', error.message);
      res.status(500).json({ success: false, message: 'Erro ao buscar QR-Codes' });
    }
});

router.get('/notificação', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date() });
});

// Add more routes as needed
module.exports = router;
