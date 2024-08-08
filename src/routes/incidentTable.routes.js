import { Router } from 'express'
import IncidentC from '../controllers/incidentTable.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.post('/', auth, IncidentC.create)

export default router
