import pool from '../config/dbConfig.js'

class Incident {
  static create = async (mainUserId, rawIncident) => {
    const incident = {
      userId: rawIncident.userId,
      title: rawIncident.title,
      description: rawIncident?.description || null,
      status: rawIncident?.status,
      priority: rawIncident?.priority || null,
      type: rawIncident?.type || null,
      building: rawIncident?.building || null,
      department: rawIncident?.department || null,
      block: rawIncident?.block || null,
      location: rawIncident?.location || null
    }
    const query = `INSERT INTO u_${mainUserId}_incident SET ?`
    await pool.query(query, [incident])
  }

  static get = async (userId) => {
    const query = `
      SELECT * FROM u_${userId}_incident
      WHERE archived = FALSE
      ORDER BY created_at DESC;
    `
    const [rows] = await pool.execute(query)
    return rows
  }

  static getById = async (userId, incidentId) => {
    const query = `
      SELECT * FROM u_${userId}_incident
      WHERE incidentId = ?
    `
    const [rows] = await pool.execute(query, [incidentId])
    return rows[0]
  }

  static archive = async (userId, incidentId, archived) => {
    const query = `
    UPDATE u_${userId}_incident
    SET archived = ?
    WHERE incidentId = ?
  `
    await pool.execute(query, [Number(archived), incidentId])
  }

  static update = async (mainUserId, incidentId, setClause, values) => {
    const query = `
     UPDATE u_${mainUserId}_incident
      SET ${setClause}
      WHERE incidentId = ?
    `
    await pool.execute(query, [...values, incidentId])
  }

  static isIncidentOwner = async (mainUserId, userId, incidentId) => {
    const query = `
      SELECT * FROM u_${mainUserId}_incident
      WHERE incidentId = ? AND userId = ?
    `
    const [rows] = await pool.execute(query, [incidentId, userId])
    return rows.length > 0
  }

  static delete = async (userId, incidentId) => {
    const query = `
      DELETE FROM u_${userId}_incident
      WHERE incidentId = ?
    `
    await pool.execute(query, [incidentId])
  }
}

export default Incident
