const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PagosPedimento = sequelize.define('PagosPedimento', {
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
  Clave_Forma_Pago: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Importe_Pago: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.CHAR(1),
    allowNull: false
  }
}, {
  tableName: '511_pagos_pedimento',
  timestamps: false
});

module.exports = PagosPedimento; 