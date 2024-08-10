import pool from '../config/dbConfig.js'
import { unlink } from 'fs/promises'

class File {
  static add = async (mainUserId, incidentId, files) => {
    if (!Array.isArray(files) || files.length === 0) {
      throw new Error('No files provided')
    }
    const values = files.map(file => [file.filename, incidentId])
    const query = `
      INSERT INTO u_${mainUserId}_file (filename, incidentId)
      VALUES ?
    `
    await pool.query(query, [values])
  }

  static getByFilename = async (userId, filename) => {
    const query = `
      SELECT * FROM u_${userId}_file
      WHERE filename = ?
    `
    const [rows] = await pool.execute(query, [filename])
    return rows[0]
  }

  static filesPerIncident = async (mainUserId, incidentId) => {
    const query =
      `SELECT * FROM u_${mainUserId}_file WHERE incidentId = ?`
    const [rows] = await pool.execute(query, [incidentId])
    return rows.length
  }

  static delete = async (userId, filename) => {
    const query = `DELETE FROM u_${userId}_file WHERE filename = ?`
    await pool.query(query, [filename])
    await unlink(`./files/${filename}`)
  }
}

export default File
