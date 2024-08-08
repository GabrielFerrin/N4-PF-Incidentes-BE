import { Router } from 'express'
import IncidentC from '../controllers/incident.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.get('/', auth, IncidentC.get)
router.post('/archive', auth, IncidentC.archive)

export default router
