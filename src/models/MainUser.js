import pool from '../config/dbConfig.js'
import { hash } from 'bcrypt'

class MainUser {
  static register = async (rawUser) => {
    const newUser = {
      name: rawUser.name || '',
      lastname: rawUser.lastname || '',
      company: rawUser.company || '',
      email: rawUser.email,
      password: await hash(rawUser.password, 11),
      details: rawUser.details || '',
      code: rawUser.code
    }
    let query = 'INSERT INTO mainUser SET ?'
    const [result] = await pool.query(query, [newUser])
    query = 'SELECT * FROM mainUser WHERE userId = ?'
    const [rows] = await pool.query(query, [result.insertId])
    const user = rows[0]
    delete user.password
    return user
  }

  static findByEmail = async (email) => {
    const query = 'SELECT * FROM mainUser WHERE email = ?'
    const [rows] = await pool.execute(query, [email])
    return rows.length > 0
  }

  static getByEmail = async (email) => {
    const query = 'SELECT * FROM mainUser WHERE email = ?'
    const [rows] = await pool.execute(query, [email])
    return rows[0]
  }

  static getById = async (userId) => {
    const query = 'SELECT * FROM mainUser WHERE userId = ?'
    const [rows] = await pool.execute(query, [userId])
    return rows[0]
  }

  static codeInstances = async (code) => {
    const query = 'SELECT * FROM mainUser WHERE code = ?'
    const [rows] = await pool.execute(query, [code])
    return rows.length
  }
}

export default MainUser
