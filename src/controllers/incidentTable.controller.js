import IncidentM from '../models/Incident.js'

class Incident {
  static create = async (req, res) => {
    try {
      const { userId } = req
      await IncidentM.create(userId)
      await IncidentM.seed(userId)
      return res.json({ success: true, message: 'Incidente creado' })
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message })
    }
  }
}

export default Incident
