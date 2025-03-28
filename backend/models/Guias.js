const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Guias extends Model {}

Guias.init({
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
  Numero_Guia_Manifiesto: {
    type: DataTypes.CHAR(20),
    allowNull: true,
  },
  Clave_Tipo_Guia: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Guias',
  tableName: '503_Guias',
  timestamps: false,
});

module.exports = Guias;