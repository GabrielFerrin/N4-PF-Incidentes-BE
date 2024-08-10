import FileM from '../models/File.js'
import UserM from '../models/User.js'
import IncidentM from '../models/Incident.js'

class File {
  static add = async (req, res) => {
    try {
      const { userId } = req
      const { incidentId } = req.body
      console.log(incidentId)
      const errorList = []
      await validate(req.body, errorList)
      if (errorList.length > 0) {
        return res.status(400)
          .json({ success: false, message: errorList })
      }
      await FileM.add(userId, incidentId, req.files)
      const message = 'Registro agregado'
      return res.json({ success: true, message })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

  static delete = async (req, res) => {
    try {
      const { userId: mainUserId } = req
      const { filename, userId } = req.body
      const errorList = []
      await validateDelete(filename, userId, mainUserId, errorList)
      if (errorList.length > 0) {
        return res.status(400)
          .json({ success: false, message: errorList })
      }
      await FileM.delete(mainUserId, filename)
      const message = 'Registro eliminado'
      return res.json({ success: true, message })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default File

const validate = async (file, errorList) => {
  if (!file.incidentId)
    errorList.push('incidentId es requerido')
}

const validateDelete = async (filename, userId, mainUserId, errorList) => {
  if (!filename)
    errorList.push('Se requiere el nombre del archivo')
  if (!userId)
    errorList.push('Se requiere el id del usuario')
  if (filename && userId) {
    const user = await UserM.get(mainUserId, userId)
    if (!user)
      errorList.push('Usuario no existe')
  }
  const file = await FileM.getByFilename(mainUserId, filename)
  if (!file)
    errorList.push('El archivo no existe')
  else
    if (!await IncidentM
      .isIncidentOwner(mainUserId, userId, file.incidentId)) {
      errorList.push('El usuario no es el dueño del incidente')
    }
}
