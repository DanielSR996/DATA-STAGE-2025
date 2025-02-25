const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Contenedores extends Model {}

Contenedores.init({
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
  Numero_Contenedor: {
    type: DataTypes.CHAR(12),
    allowNull: true,
  },
  Clave_Tipo_Contenedor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Contenedores',
  tableName: '504_Contenedores',
  timestamps: false,
});

module.exports = Contenedores; 