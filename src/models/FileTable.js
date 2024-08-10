import pool from '../config/dbConfig.js'

class FileTable {
  static create = async (userId) => {
    const query = `
      CREATE TABLE IF NOT EXISTS u_${userId}_file (
        fileId INT AUTO_INCREMENT PRIMARY KEY,
        filename VARCHAR(255),
        incidentId INT,
        FOREIGN KEY (incidentId) REFERENCES u_${userId}_incident(incidentId) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `
    pool.execute(query)
  }
}

export default FileTable
