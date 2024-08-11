import { Router } from 'express'
import UserTableC from '../controllers/userTable.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth.auth, UserTableC.create)

export default router
