import pool from '../config/dbConfig.js'

class MainUser {
  static async register(rawUser) {
    const user = {
      names: rawUser.names || '',
      company: rawUser.company || '',
      email: rawUser.email,
      password: rawUser.password,
      details: rawUser.details || ''
    }
    const query = 'INSERT INTO mainUser SET ?'
    await pool.query(query, [user])
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM mainUser WHERE email = ?'
    const [rows] = await pool.execute(query, [email])
    console.log(rows)
    return rows.length > 0
  }
}

export default MainUser
