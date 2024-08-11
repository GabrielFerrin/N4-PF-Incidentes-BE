import { Router } from 'express'
import FileTableC from '../controllers/fileTable.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth.auth, FileTableC.add)

export default router
