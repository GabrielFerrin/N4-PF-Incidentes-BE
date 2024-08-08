import IncidentTableM from '../models/IncidentTable.js'

class IncidentTable {
  static create = async (req, res) => {
    try {
      const { userId } = req
      await IncidentTableM.create(userId)
      await IncidentTableM.seed(userId)
      return res.json({ success: true, message: 'Incidentes creados' })
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }
}

export default IncidentTable
