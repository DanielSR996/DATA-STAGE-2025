const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Rectificaciones extends Model {}

Rectificaciones.init({
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
  Clave_Documento: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Fecha_Pago: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Numero_Pedimento_Anterior: {
    type: DataTypes.CHAR(7),
    allowNull: true,
  },
  Patente_Aduanal_Anterior: {
    type: DataTypes.CHAR(4),
    allowNull: true,
  },
  Clave_Sec_Aduanera_Despacho_Anterior: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Documento_Anterior: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Fecha_Operacion_Anterior: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Numero_Pedimento_Original: {
    type: DataTypes.CHAR(7),
    allowNull: true,
  },
  Patente_Aduanal_Original: {
    type: DataTypes.CHAR(4),
    allowNull: true,
  },
  Clave_Sec_Aduanera_Despacho_Original: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Rectificaciones',
  tableName: '701_Rectificaciones',
  timestamps: false,
});

module.exports = Rectificaciones; 