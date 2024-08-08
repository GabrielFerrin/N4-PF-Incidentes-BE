import { Router } from 'express'
import IncidentC from '../controllers/incident.controller.js'
import auth from '../middlewares/auth.js'

const router = Router()

router.get('/', auth, IncidentC.get)
router.post('/', auth, IncidentC.create)
router.patch('/update', auth, IncidentC.update)
router.patch('/archive', auth, IncidentC.archive)

export default router
