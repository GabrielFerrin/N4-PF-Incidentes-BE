import express from 'express'
import morgan from 'morgan'
import MainUser from './helpers/startDb.js'
import MainUserR from './routes/mainUser.routes.js'
import { cors } from './middlewares/cors.js'
import notImplemented from './middlewares/notImplemented.js'
import error from './middlewares/error.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

// cors
app.use(cors)

MainUser.startMainUser()

app.use('/api/mainUser', MainUserR)

// errors
app.use(notImplemented)
app.use(error)

export default app
