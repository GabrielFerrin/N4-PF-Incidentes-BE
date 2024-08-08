import pool from '../config/dbConfig.js'

class Incident {
  static get = async (userId) => {
    console.log('ejecutada get all')
    const query = `
      SELECT * FROM i_${userId}_incident
      WHERE archived = FALSE
      ORDER BY created_at DESC;
    `
    const [rows] = await pool.execute(query)
    return rows
  }

  static getById = async (userId, incidentId) => {
    console.log('ejecutada get by id', incidentId)
    const query = `
      SELECT * FROM i_${userId}_incident
      WHERE incidentId = ?
    `
    const [rows] = await pool.execute(query, [incidentId])
    return rows[0]
  }

  static archive = async (userId, incidentId) => {
    const query = `
      UPDATE i_${userId}_incident
      SET archived = TRUE
      WHERE incidentId = ?
    `
    await pool.execute(query, [incidentId])
  }
}

export default Incident
