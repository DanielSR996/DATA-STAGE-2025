const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Contenedores = sequelize.define('Contenedores', {
  Patente_Aduanal: {
    type: DataTypes.CHAR(4),
    allowNull: false,
    primaryKey: true
  },
  Numero_Pedimento: {
    type: DataTypes.CHAR(7),
    allowNull: false,
    primaryKey: true
  },
  Clave_Sec_Aduanera_Despacho: {
    type: DataTypes.CHAR(3),
    allowNull: false,
    primaryKey: true
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true
  },
  Numero_Contenedor: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  Clave_Tipo_Contenedor: {
    type: DataTypes.CHAR(2),
    allowNull: false
  }
}, {
  tableName: '504_contenedores',
  timestamps: false
});

module.exports = Contenedores; 