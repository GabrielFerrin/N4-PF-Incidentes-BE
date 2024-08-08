import pool from '../config/dbConfig.js'

class User {
  static validateMaintenance = async (userId) => {
    const query = `SELECT role FROM u_${userId}_user WHERE userId = ?`
    const [rows] = await pool.execute(query, [userId])
    const auth = rows[0].role === 'administrador' ||
      rows[0].role === 'mantenimiento'
    return auth
  }
}

export default User
