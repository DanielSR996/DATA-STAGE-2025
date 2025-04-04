const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const FechasPedimento = sequelize.define('FechasPedimento', {
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
  Clave_Tipo_Fecha: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Fecha_Operacion: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '506_fechas_pedimento',
  timestamps: false
});

module.exports = FechasPedimento; 