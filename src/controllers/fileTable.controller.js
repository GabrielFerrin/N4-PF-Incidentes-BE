import FileTableM from '../models/FileTable.js'

class FileTable {
  static add = async (req, res) => {
    try {
      const { userId } = req
      await FileTableM.create(userId)
      const message = 'Tabla de archivos creada'
      return res.json({ success: true, message })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default FileTable
