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
import FileTableR from './routes/fileTable.routes.js'
import FileR from './routes/file.routes.js'

const app = express()

app.use(express.json())
app.use(morgan('dev'))

// cors
app.use(cors)

MainUser.startMainUser()

// tables routes
app.use('/api/userTable', UserTableR)
app.use('/api/incidentTable', IncidentTableR)
app.use('/api/fileTable', FileTableR)

// buisness routes
app.use('/api/mainUser', MainUserR)
app.use('/api/incident', IncidentR)
app.use('/api/file', FileR)

// errors
app.use(notImplemented)
app.use(error)

export default app
