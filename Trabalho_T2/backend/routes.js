const express = require('express');
const router = express.Router();
const db = require('./db');
const webpush = require ('web-push');

const chaves = require('./webpush-keys.json');
const SUBJECT = 'mailto:seu-email@dominio.com';

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

router.post('/register', async (req, res) => {
  const { user, password, pushSubscription } = req.body;
  // console.log('Received PushSubscription:', pushSubscription);
  debugger
  try {
    const userId = await db.registraUsuario(user, password, pushSubscription);
    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!', userId });
  } catch (error) {
    res.status(500).json({ success: false, message: req.body, error: error.message });
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

router.post('/qr-codes', db.autenticaToken, async (req, res) => {
  const { code, username } = req.body;

  if (!code || !username) {
      return res.status(400).json({ success: false, message: 'Código e username são obrigatórios' });
  }

  try {
      const updatedUser = await db.AdicionaCodigo(username, code);
      res.status(200).json({ success: true, message: 'QR-Code salvo com sucesso!', user: updatedUser });
  } catch (error) {
      console.error('Erro ao salvar QR-Code:', error.message);
      res.status(500).json({ success: false, message: 'Erro ao salvar QR-Code' });
  }
});

router.get('/user-qr-codes', db.autenticaToken, async (req, res) => {
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

async function envia(destinatario, assunto) {
  const { endpoint, keys } = destinatario;
  const { p256dh, auth } = keys;

  webpush.setVapidDetails(SUBJECT, chaves.publicKey, chaves.privateKey);

  try {
    await webpush.sendNotification(
      { endpoint, keys: { p256dh, auth } },
      JSON.stringify({
        title: 'Sorteio',
        body: assunto, // Use 'body' em vez de 'message'
      })
    );
    console.log('Notificação enviada com sucesso.');
  } catch (error) {
    console.error('Erro ao enviar notificação:', error);
  }
}

router.post('/sorteio', async function (req, resp) {
  console.log('Realizando sorteio e enviando mensagem para um cliente aleatório');

  try {
    const resultado = await db.CodigoAleatorio();
    if (!resultado) {
      return resp.status(404).json({ success: false, message: 'Nenhum código disponível para sorteio' });
    }

    const { code, pushSubscription } = resultado;

    if (!pushSubscription) {
      return resp.status(404).json({ success: false, message: 'PushSubscription não encontrada para o código selecionado' });
    }

    const mensagem = `Codigo: ${code}. Parabéns, você foi sorteado na promoção dos produtos X, entre em contato para receber seu prêmio.`;
    console.log('Enviando mensagem para o cliente:', mensagem);
    console.log('PushSubscription:', pushSubscription);
    await envia(pushSubscription, mensagem);

    resp.status(200).json({
      success: true,
      message: 'Mensagem enviada com sucesso',
      sorteado: { code, pushSubscription }
    });
  } catch (error) {
    console.error('Erro ao realizar o sorteio:', error.message);
    resp.status(500).json({ success: false, message: 'Erro ao realizar o sorteio', error: error.message });
  }
});

module.exports = router;
