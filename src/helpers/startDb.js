import pool from '../config/dbConfig.js'

class MainUser {
  // Create table
  static startMainUser = async () => {
    try {
      const query = `
        CREATE TABLE IF NOT EXISTS mainUser (
          userId INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255),
          lastname VARCHAR(255),
          company VARCHAR(255),
          email VARCHAR(255) UNIQUE,
          password VARCHAR(255),
          details VARCHAR(255),
          code VARCHAR(6),
          image VARCHAR(255)
        );
      `
      const [rows] = await pool.execute(query)
      if (rows.length === 0) console.log('no existe')
      else console.log('Tabla de usuarios principales disponibles')
    } catch (error) {
      console.log(error)
    }
  }

  // Trucate table
  static truncateMainUser = async () => {
    try {
      const query = 'TRUNCATE TABLE mainUser'
      await pool.execute(query)
      console.log('Usuarios principales eliminados')
    } catch (error) {
      console.log(error)
    }
  }

  // Drop table
  static dropMainUser = async () => {
    try {
      const query = 'DROP TABLE mainUser'
      await pool.execute(query)
      console.log('Tabla de usuarios principales eliminados')
    } catch (error) {
      console.log(error)
    }
  }
}

export default MainUser
