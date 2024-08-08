import { Router } from 'express'
import IncidentTableC from '../controllers/incidentTable.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth, IncidentTableC.create)

export default router
