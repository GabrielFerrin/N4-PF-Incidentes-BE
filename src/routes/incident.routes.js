import { Router } from 'express'
import IncidentC from '../controllers/incident.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.get('/', auth.auth, IncidentC.get)
router.post('/', auth.auth, IncidentC.create)
router.patch('/update', auth.auth, IncidentC.update)
router.patch('/archive', auth.auth, IncidentC.archive)

export default router
