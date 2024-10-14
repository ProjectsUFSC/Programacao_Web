import { Router } from 'express'
import Usuario from '../models/usuario.js'
import { getUsers, login, cadastro, listaPortas, abrePorta, cadastraPorta } from '../controllers/controller.js'
import { authenticaToken, masterAuthentication } from '../middlewares/middlewares.js'

const router = Router()

router.get('/', (req, res) => {
    res.send('Servidor online')
})

router.get('/usuarios', getUsers)

router.post('/login', login)

router.post('/cadastro', cadastro)

router.get('/lista',authenticaToken, listaPortas)

router.post('/abre',authenticaToken, abrePorta)

router.post('/adiciona', masterAuthentication ,cadastraPorta)

export default router;