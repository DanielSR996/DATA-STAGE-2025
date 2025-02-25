const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TransporteMercancias extends Model {}

TransporteMercancias.init({
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
  RFC_Transportista: {
    type: DataTypes.CHAR(13),
    allowNull: true,
  },
  CURP_Transportista: {
    type: DataTypes.CHAR(18),
    allowNull: true,
  },
  Nombre_Razon_Social_Transportista: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Pais_Transporte: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Identificador_Transporte: {
    type: DataTypes.CHAR(17),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'TransporteMercancias',
  tableName: '502_Transporte_mercancias',
  timestamps: false,
});

module.exports = TransporteMercancias; 