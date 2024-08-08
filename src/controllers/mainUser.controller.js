import jwt from 'jsonwebtoken'
import { SECRET, CODE } from '../config/config.js'
import MainUserM from '../models/MainUser.js'
import AccessCodeM from '../models/AccessCode.js'
import { compare } from 'bcrypt'

class MainUser {
  static register = async (req, res) => {
    let message = 'El correo ya existe'
    const errorList = []
    validateData(req.body, errorList)
    if (errorList.length > 0) {
      return res.status(400).json({ success: false, message: errorList })
    }
    try {
      const codeInstances = await MainUserM.codeInstances(req.body.code)
      const allowedAccounts =
        await AccessCodeM.allowedAccounts(req.body.code)
      message = 'Ya alcanzó el número de cuentas permitidas. ' +
        'Por favor, contacte con el desarrollador para habilitar ' +
        'más cuentas.'
      if (codeInstances === allowedAccounts)
        return res.status(400).json({ success: false, message })
      const userExists = await MainUserM.findByEmail(req.body.email)
      if (userExists) {
        message = 'El correo ya existe'
        return res.status(400).json({ success: false, message })
      } else {
        const newUser = await MainUserM.register(req.body)
        const token = jwt.sign({ userId: newUser.userId }, SECRET, {
          expiresIn: '1h'
        })
        newUser.token = token
        res.status(201).json({ success: true, newUser })
      }
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }

  static login = async (req, res) => {
    let message = 'Faltan datos'
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ success: false, message })
    }
    try {
      message = 'Credenciales incorrectas'
      const user = await MainUserM.getByEmail(req.body.email)
      if (!user)
        return res.status(401).json({ success: false, message })
      const match = await compare(req.body.password, user.password)
      if (!match)
        return res.status(401).json({ success: false, message })
      const token = jwt.sign({ userId: user.userId }, SECRET, {
        expiresIn: '1h'
      })
      user.token = token
      delete user.password
      res.json({ success: true, user })
    } catch (error) {
      res.status(500).json({ success: false, message: error.message })
    }
  }
}

const validateData = (user, errorList) => {
  if (user.email)
    !validEmail(user.email) &&
      errorList.push('Correo no válido')
  else errorList.push('Se requiere un correo')
  if (user.password)
    !validPassword(user.password) &&
      errorList.push('Contraseña no válida')
  else errorList.push('Se requiere una contraseña')
  if (user.code) user.code !== CODE &&
    errorList.push('Código incorrecto')
  else errorList.push('Se requiere un código de autorización')
}

const validEmail = (email) => {
  const evaluate = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return evaluate.test(String(email).toLowerCase())
}

const validPassword = (password) => {
  const evaluate = /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/
  return evaluate.test(password)
}

export default MainUser
