import { Router } from 'express'
import Usuario from '../models/usuario.js'
import { getUsers, login, cadastro, listaPortas } from '../controllers/controller.js'
import { authenticaToken } from '../middlewares/middleware.js'

const router = Router()

router.get('/', (req, res) => {
    res.send('Servidor online')
})

router.get('/usuarios', getUsers)

router.post('/login', login)

router.post('/cadastro', cadastro)

router.get('/lista',authenticaToken, listaPortas)

router.post('/abre', (req, res) => {
    res.send('Abre')
});


export default router;