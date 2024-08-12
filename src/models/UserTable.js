import pool from '../config/dbConfig.js'

class UserTable {
  static create = async (userId) => {
    const query = `
      CREATE TABLE IF NOT EXISTS u_${userId}_user (
        userId INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        lastname VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        phone VARCHAR(255),
        block VARCHAR(3),
        building VARCHAR(255),
        department VARCHAR(255),
        role VARCHAR(255)
      );
    `
    await pool.execute(query)
  }

  static drop = async (userId) => {
    const query = `DROP TABLE IF EXISTS u_${userId}_user;`
    await pool.execute(query)
  }

  static seed = async (userId, user) => {
    const name = user.name ? (`'${user.name}'`) : 'John'
    const lastname = user.lastname ? (`'${user.lastname}'`) : 'Doe'
    const email = user.email ? (`'${user.email}'`) : 'john.doe@example.com'
    const query = `
    INSERT INTO u_${userId}_user (name, lastname, email, password, phone, block, building, department, role) VALUES
    (${name}, ${lastname}, ${email}, 'hashedPassword1', '555-0101', 'A', 'Edificio 1', '101', 'administrador'),
    ('Jane', 'Smith', 'jane.smith@example.com', 'hashedPassword2', '555-0102', 'A', 'Edificio 2', '102', 'mantenimiento'),
    ('Alice', 'Johnson', 'alice.johnson@example.com', 'hashedPassword3', '555-0103', 'B', 'Edificio 3', '201', 'residente'),
    ('Bob', 'Brown', 'bob.brown@example.com', 'hashedPassword4', '555-0104', 'B', 'Edificio 4', '202', 'residente'),
    ('Charls', 'Davis', 'charlie.davis@example.com', 'hashedPassword5', '555-0105', 'C', 'Edificio 5', '203', 'residente');
  `
    await pool.execute(query)
  }
}

export default UserTable
