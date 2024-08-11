import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config.js'
import MainUserM from '../models/MainUser.js'

const auth = (req, res, next) => {
  const token = req.headers.authorization
  console.log(req.headers.authorization)
  const message = 'Token no válido'
  if (token) {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message })
      } else {
        req.userId = decoded.userId
        const token = jwt.sign({ userId: decoded.userId }, SECRET, {
          expiresIn: '1h'
        })
        res.token = token
        next()
      }
    })
  } else {
    return res.status(401).json({ success: false, message })
  }
}

const verify = async (req, res) => {
  const token = req.headers.authorization
  let message = 'Token no válido'
  if (token) {
    jwt.verify(token, SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ success: false, message })
      } else {
        req.userId = decoded.userId
        const token = jwt.sign({ userId: decoded.userId }, SECRET, {
          expiresIn: '1h'
        })
        const user = await MainUserM.getById(decoded.userId)
        if (!user) {
          message = 'El usuario no existe'
          return res.status(401).json({ success: false, message })
        }
        user.token = token
        delete user.password
        res.json({ success: true, user })
      }
    })
  } else {
    return res.status(401).json({ success: false, message })
  }
}

export default { auth, verify }
