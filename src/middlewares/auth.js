import jwt from 'jsonwebtoken'
import { SECRET } from '../config/config.js'

const auth = (req, res, next) => {
  const token = req.headers.authorization
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

export default auth
