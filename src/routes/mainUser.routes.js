import { Router } from 'express'
import MainUserC from '../controllers/mainUser.controller.js'

const router = Router()

router.post('/', MainUserC.register)

export default router
