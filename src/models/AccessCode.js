import pool from '../config/dbConfig.js'

class AccessCode {
  static allowedAccounts = async (code) => {
    const query = 'SELECT * FROM accessCode WHERE code = ?'
    const [rows] = await pool.execute(query, [code])
    return rows[0].allowed
  }
}

export default AccessCode
