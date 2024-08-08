import MainUserM from '../models/MainUser.js'

class MainUser {
  static register = async (req, res) => {
    let message = 'El correo ya existe'
    const errorList = []
    validateData(req.body, errorList)
    if (errorList.length > 0) {
      return res.status(400).json({ success: false, message: errorList })
    }
    try {
      const userExists = await MainUserM.findByEmail(req.body.email)
      if (userExists) {
        message = 'El correo ya existe'
        return res.status(400).json({ success: false, message })
      } else {
        const newUser = await MainUserM.register(req.body)
        res.status(201).json({ success: true, newUser })
      }
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
