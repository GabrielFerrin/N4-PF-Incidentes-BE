import pool from '../config/dbConfig.js'

class User {
  static get = async (mainUserId, userId) => {
    const query = `SELECT * FROM u_${mainUserId}_user WHERE userId = ?`
    const [rows] = await pool.execute(query, [userId])
    return rows[0]
  }

  static validateMaintenance = async (userId) => {
    const query = `SELECT role FROM u_${userId}_user WHERE userId = ?`
    const [rows] = await pool.execute(query, [userId])
    const auth = rows[0].role === 'administrador' ||
      rows[0].role === 'mantenimiento'
    return auth
  }

  static validateAdmin = async (userId) => {
    const query = `SELECT role FROM u_${userId}_user WHERE userId = ?`
    const [rows] = await pool.execute(query, [userId])
    const auth = rows[0].role === 'administrador'
    return auth
  }

  static userExists = async (mainUserId, userId) => {
    const query = 'SELECT * FROM u_' + mainUserId +
      '_user WHERE userId = ?'
    const [rows] = await pool.execute(query, [userId])
    return rows.length > 0
  }
}

export default User
