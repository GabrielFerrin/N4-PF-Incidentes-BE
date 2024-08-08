import { Router } from 'express'
import MainUserC from '../controllers/mainUser.controller.js'

const router = Router()

router.post('/', MainUserC.register)
router.post('/login', MainUserC.login)

export default router
