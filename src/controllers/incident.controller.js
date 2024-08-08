import IncidentM from '../models/Incident.js'
import UserM from '../models/User.js'

class Incident {
  static create = async (req, res) => {
    try {
      const { userId } = req
      const errorList = []
      await validate(userId, req.body, errorList)
      if (errorList.length > 0) {
        return res.status(400).json({ success: false, message: errorList })
      }
      await IncidentM.create(userId, req.body)
      return res.json({ success: true })
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }

  static get = async (req, res) => {
    try {
      const { userId } = req
      const { incidentId } = req.query
      if (incidentId) {
        const incident = await IncidentM.getById(userId, incidentId)
        return res.json({ success: true, incident })
      } else {
        const incidents = await IncidentM.get(userId)
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
      const { archived } = req.body
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
      await IncidentM.archive(userId, incidentId, archived)
      return res.json({ success: true, message: 'Incidente archivado' })
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }

  static update = async (req, res) => {
    try {
      const { userId: mainUserId } = req
      const { incidentId } = req.query
      const { userId } = req.body
      if (!incidentId) {
        return res.status(400).json({
          success: false, message: 'incidentId es requerido'
        })
      }
      const isOwner = await IncidentM
        .isIncidentOwner(mainUserId, userId, incidentId)
      if (!isOwner) {
        return res.status(401).json({
          success: false, message: 'Usuario no es propietario del incidente'
        })
      }
      const validFields = [
        'title', 'description', 'status', 'priority',
        'type', 'building', 'department', 'block',
        'location'
      ]
      const fields = Object.keys(req.body)
        .filter(field => validFields.includes(field))
      const values = fields.map(field => req.body[field])
      if (fields.length === 0) {
        return res.status(400)
          .json({ success: false, message: 'No valid fields to update.' })
      }
      const setClause = fields.map((field) => `${field} = ?`).join(', ')
      await IncidentM.update(mainUserId, incidentId, setClause, values)
      return res.json({ success: true, message: 'Incidente actualizado' })
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }

  static delete = async (req, res) => {
    try {
      const { userId } = req
      const { incidentId } = req.query
      if (!incidentId) {
        return res.status(400).json({
          success: false, message: 'incidentId es requerido'
        })
      }
      const isAdmin = await UserM.validateAdmin(userId)
      if (!isAdmin) {
        return res.status(401).json({
          success: false, message: 'No autorizado'
        })
      }
      await IncidentM.delete(userId, incidentId)
      return res.json({ success: true, message: 'Incidente eliminado' })
    } catch (error) {
      return res.status(500).json({
        success: false, message: error.message
      })
    }
  }
}

export default Incident

const validate = async (mainUserId, incident, errorList) => {
  if (!incident.userId)
    errorList.push('userId es requerido')
  else
    !await UserM.userExists(mainUserId, incident.userId) &&
      errorList.push('Usuario no existe')
  if (!incident.title)
    errorList.push('El título del incidente es requerido')
}
