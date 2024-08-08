import pool from '../config/dbConfig.js'

class IncidentTable {
  static create = async (userId) => {
    const query = `
      CREATE TABLE IF NOT EXISTS u_${userId}_incident (
        incidentId INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        title VARCHAR(255),
        description VARCHAR(255),
        status VARCHAR(255) DEFAULT 'Abierto',
        priority VARCHAR(255),
        type VARCHAR(255),
        building VARCHAR(255),
        department VARCHAR(255),
        block VARCHAR(255),
        location VARCHAR(255),
        archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES u_${userId}_user(userId) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `
    await pool.execute(query)
  }

  static seed = async (userId) => {
    const insertQuery = `
      INSERT INTO u_${userId}_incident (userId, title, description, status, priority, type, building, department, block, location) VALUES
      (3, 'Fuga de Agua', 'Fuga en el pasillo principal', 'Abierto', 'Alta', 'Fontanería', 'Edificio 3', '201', 'B', 'Pasillo 3'),
      (5, 'Ventana Rota', 'Ventana rota en la Sala 205', 'Cerrado', 'Baja', 'Reparación', 'Edificio 5', '100', 'C', 'Sala 205'),
      (3, 'Malfunción del Elevador', 'Elevador atascado entre pisos', 'En Progreso', 'Alta', 'Mecánico', 'Edificio 3', '201', 'B', 'Elevador 2'),
      (2, 'Alarma de Incendio', 'Alarma falsa activada', 'Cerrado', 'Media', 'Seguridad', 'Edificio 2', '102', 'A', 'Vestíbulo'),
      (2, 'Problema con HVAC', 'Aire acondicionado no funciona', 'Abierto', 'Media', 'Mecánico', 'Edificio 2', '102', 'A', 'Piso 1'),
      (1, 'Respaldo de Fontanería', 'Desbordamiento de inodoro en el baño', 'Abierto', 'Alta', 'Fontanería', 'Edificio 1', '101', 'A', 'Baño 2'),
      (4, 'Incidencia de Seguridad', 'Acceso no autorizado detectado', 'Cerrado', 'Alta', 'Seguridad', 'Edificio 4', '202', 'B', 'Entrada Principal'),
      (4, 'Infestación de Plagas', 'Hormigas en el área de cocina', 'En Progreso', 'Baja', 'Sanidad', 'Edificio 4', '202', 'B', 'Cocina'),
      (4, 'Daño en el Techo', 'Techo filtrándose en lluvia intensa', 'Abierto', 'Alta', 'Estructural', 'Edificio 4', '202', 'B', 'Techo');
    `
    await pool.execute(insertQuery)
  }
}

export default IncidentTable
