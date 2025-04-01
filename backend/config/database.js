const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'lck',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false, // Desactivar el logging para reducir ruido
    pool: {
      max: 25,
      min: 0,
      acquire: 60000,  // 1 minuto
      idle: 30000      // 30 segundos
    },
    dialectOptions: {
      connectTimeout: 60000, // 1 minuto
      options: {
        requestTimeout: 60000
      }
    },
    define: {
      timestamps: false,
      freezeTableName: true // Evitar que Sequelize modifique los nombres de las tablas
    }
  }
);

// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión establecida correctamente.');
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

module.exports = sequelize; 