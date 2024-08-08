import pool from '../config/dbConfig.js'

class Incident {
  static create = async (userId) => {
    const query = `
      CREATE TABLE IF NOT EXISTS i_${userId}_incident (
        id INT AUTO_INCREMENT PRIMARY KEY,
        userId INT NOT NULL,
        title VARCHAR(255),
        description VARCHAR(255),
        status VARCHAR(255),
        priority VARCHAR(255),
        type VARCHAR(255),
        building VARCHAR(255),
        department VARCHAR(255),
        block VARCHAR(255),
        location VARCHAR(255),
        archived BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (userId) REFERENCES u_${userId}_user(id) ON DELETE RESTRICT ON UPDATE CASCADE
      );
    `
    await pool.execute(query)
  }

  static seed = async (userId) => {
    const insertQuery = `
      INSERT INTO i_${userId}_incident (userId, title, description, status, priority, type, building, department, block, location) VALUES
      (3, 'Fuga de Agua', 'Fuga en el pasillo principal', 'Abierto', 'Alta', 'Fontanería', 'Edificio A', 'Mantenimiento', 'A1', 'Pasillo 3'),
      (5, 'Corte de Energía', 'Fallo de energía en el 3er piso', 'Abierto', 'Media', 'Eléctrico', 'Edificio B', 'Mantenimiento', 'B3', 'Piso 3'),
      (5, 'Ventana Rota', 'Ventana rota en la Sala 205', 'Cerrado', 'Baja', 'Reparación', 'Edificio C', 'Seguridad', 'C2', 'Sala 205'),
      (3, 'Malfunción del Elevador', 'Elevador atascado entre pisos', 'En Progreso', 'Alta', 'Mecánico', 'Edificio D', 'Mantenimiento', 'D1', 'Elevador 2'),
      (2, 'Alarma de Incendio', 'Alarma falsa activada', 'Cerrado', 'Media', 'Seguridad', 'Edificio E', 'Seguridad', 'E1', 'Vestíbulo'),
      (2, 'Problema con HVAC', 'Aire acondicionado no funciona', 'Abierto', 'Media', 'Mecánico', 'Edificio F', 'Mantenimiento', 'F1', 'Piso 1'),
      (1, 'Respaldo de Fontanería', 'Desbordamiento de inodoro en el baño', 'Abierto', 'Alta', 'Fontanería', 'Edificio G', 'Mantenimiento', 'G2', 'Baño 2'),
      (4, 'Incidencia de Seguridad', 'Acceso no autorizado detectado', 'Cerrado', 'Alta', 'Seguridad', 'Edificio H', 'Seguridad', 'H3', 'Entrada Principal'),
      (4, 'Infestación de Plagas', 'Hormigas en el área de cocina', 'En Progreso', 'Baja', 'Sanidad', 'Edificio I', 'Mantenimiento', 'I1', 'Cocina'),
      (4, 'Daño en el Techo', 'Techo filtrándose en lluvia intensa', 'Abierto', 'Alta', 'Estructural', 'Edificio J', 'Mantenimiento', 'J2', 'Techo');
    `
    await pool.execute(insertQuery)
  }
}

export default Incident
