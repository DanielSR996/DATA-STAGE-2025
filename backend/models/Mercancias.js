const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Mercancias extends Model {}

Mercancias.init({
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
  Fraccion_Arancelaria: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true
  },
  Secuencia_Fraccion_Arancelaria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  VIN_Numero_Serie: {
    type: DataTypes.CHAR(17),
    allowNull: true,
  },
  Kilometraje_Vehiculo: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Mercancias',
  tableName: '552_Mercancias',
  timestamps: false,
});

module.exports = Mercancias; 