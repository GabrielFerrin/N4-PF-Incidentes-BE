import multer from 'multer'
import path from 'path'
import fs from 'fs'
import FileM from '../models/File.js'

// multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'files')
  },
  filename: function (req, file, cb) {
    const randomCode = Math.floor(100 + Math.random() * 900)
    const filename = `${Date.now()}-${randomCode}${path.extname(file.originalname)}`
    req.body.data = filename
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif',
    'video/mp4', 'video/avi', 'video/mkv']
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Solo se admiten archivos de imagen o video'))
  }
}

const limits = {
  fileSize: 1024 * 1024 * 50,
  files: 5
}

const upload = multer({ storage, fileFilter, limits }).array('files', 5)

// Validate files per incident
const validateFileCount = async (req, res, next) => {
  try {
    const { userId } = req
    const { incidentId } = req.body
    if (!incidentId) {
      return res.status(400).json({
        success: false,
        message: 'incidentId es requerido'
      })
    }
    const filesPerIncident =
      await FileM.filesPerIncident(userId, incidentId)
    const filesToUpload = req.files?.length || 0
    if (filesPerIncident + filesToUpload > 5) {
      // delete files
      req.files.forEach(file => {
        fs.unlink(file.path, err => {
          if (err) console
            .error(`Error al eliminar el archivo ${file.filename}:`, err)
        })
      })
      return res.status(400).json({
        success: false,
        message: 'Se supera el límite de 5 archivos por actividad'
      })
    }
    next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const files = [upload, validateFileCount]
