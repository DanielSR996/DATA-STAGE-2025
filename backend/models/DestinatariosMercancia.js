const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DestinatariosMercancia extends Model {}

DestinatariosMercancia.init({
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
  Identificacion_Fiscal_Destinatario: {
    type: DataTypes.CHAR(17),
    allowNull: true,
  },
  Nombre_Destinatario: {
    type: DataTypes.STRING(120),
    allowNull: true,
  },
  Calle_Domicilio_Destinatario: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  Numero_Interior_Domicilio_Destinatario: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Numero_Exterior_Domicilio_Destinatario: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Codigo_Postal_Domicilio_Destinatario: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Municipio_Ciudad_Domicilio_Destinatario: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  Clave_Pais_Domicilio_Destinatario: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'DestinatariosMercancia',
  tableName: '520_Destinatarios_mercancia',
  timestamps: false,
});

module.exports = DestinatariosMercancia; 