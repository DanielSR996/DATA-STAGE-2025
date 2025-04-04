const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const DestinatariosMercancia = sequelizeSignify.define('DestinatariosMercancia', {
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
  Identificacion_Fiscal_Destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Nombre_Destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Calle_Domicilio_Destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Numero_Interior_Domicilio_Destinatario: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Numero_Exterior_Domicilio_Destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Codigo_Postal_Domicilio_Destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Municipio_Ciudad_Domicilio_Destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Pais_Domicilio_Destinatario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '520_destinatarios_mercancia',
  timestamps: false
});

module.exports = DestinatariosMercancia; 