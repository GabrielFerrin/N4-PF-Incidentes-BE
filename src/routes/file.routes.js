import { Router } from 'express'
import { files } from '../middlewares/files.js'
import auth from '../middlewares/auth.js'
import FileC from '../controllers/file.controller.js'

const router = Router()

router.post('/', auth.auth, files, FileC.add)
router.delete('/', auth.auth, FileC.delete)

export default router
