import mysql2 from 'mysql2/promise'
import {
  DB_HOST, DB_USER, DB_NAME, DB_PASS, DB_PORT
} from './config.js'

const pool = mysql2.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  port: DB_PORT,
  dateStrings: true
})

export default pool
