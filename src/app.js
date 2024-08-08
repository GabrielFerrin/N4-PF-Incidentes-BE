import express from 'express'
import morgan from 'morgan'
import MainUser from './helpers/startDb.js'
import cors from './middlewares/cors.js'
import notImplemented from './middlewares/notImplemented.js'
import error from './middlewares/error.js'
import MainUserR from './routes/mainUser.routes.js'
import UserTableR from './routes/userTable.routes.js'
import IncidentTableR from './routes/incidentTable.routes.js'
import IncidentR from './routes/incident.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

// cors
app.use(cors)

MainUser.startMainUser()

app.use('/api/mainUser', MainUserR)
app.use('/api/userTable', UserTableR)
app.use('/api/incidentTable', IncidentTableR)
app.use('/api/incident', IncidentR)

// errors
app.use(notImplemented)
app.use(error)

export default app
