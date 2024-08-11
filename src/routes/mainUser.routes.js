import { Router } from 'express'
import MainUserC from '../controllers/mainUser.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', MainUserC.register)
router.post('/login', MainUserC.login)
router.post('/verify', auth.verify)
router.get('/users', auth.auth, MainUserC.getUsers)

export default router
