const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelizeSignify = new Sequelize(
  process.env.DB_NAME_SIGNIFY || 'lck_signify',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    pool: {
      max: 25,
      min: 0,
      acquire: 60000,
      idle: 30000
    },
    dialectOptions: {
      connectTimeout: 60000,
      options: {
        requestTimeout: 60000
      }
    },
    define: {
      timestamps: false,
      freezeTableName: true
    }
  }
);

// Verificar la conexión
sequelizeSignify.authenticate()
  .then(() => {
    console.log('✅ Conexión establecida correctamente a la base de datos Signify.');
  })
  .catch(err => {
    console.error('❌ Error al conectar a la base de datos Signify:', err);
  });

module.exports = sequelizeSignify; 