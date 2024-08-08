import IncientM from '../models/Incident.js'
import UserM from '../models/User.js'

class Incident {
  static get = async (req, res) => {
    try {
      const { userId } = req
      const { incidentId } = req.query
      if (incidentId) {
        const incident = await IncientM.getById(userId, incidentId)
        return res.json({ success: true, incident })
      } else {
        const incidents = await IncientM.get(userId)
        return res.json({ success: true, incidents })
      }
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }

  static archive = async (req, res) => {
    try {
      const { userId } = req
      const { incidentId } = req.query
      if (!incidentId) {
        return res.status(400).json({
          success: false, message: 'incidentId es requerido'
        })
      }
      const isAdmin = await UserM.validateMaintenance(userId)
      if (!isAdmin) {
        return res.status(401).json({
          success: false, message: 'No autorizado'
        })
      }
      await IncientM.archive(userId, incidentId)
      return res.json({ success: true, message: 'Incidente archivado' })
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }
}

export default Incident
