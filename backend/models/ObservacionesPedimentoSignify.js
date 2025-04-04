const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ObservacionesPedimento = sequelize.define('ObservacionesPedimento', {
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
  Secuencia_Observacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Observaciones: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.CHAR(1),
    allowNull: false
  }
}, {
  tableName: '516_observaciones_pedimento',
  timestamps: false
});

module.exports = ObservacionesPedimento; 