const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const Rectificaciones = sequelizeSignify.define('Rectificaciones', {
  Patente_Aduanal: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  Numero_Pedimento: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  Clave_Sec_Aduanera_Despacho: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true
  },
  Numero_Rectificacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Rectificacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Clave_Tipo_Rectificacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '559_rectificaciones',
  timestamps: false
});

module.exports = Rectificaciones; 