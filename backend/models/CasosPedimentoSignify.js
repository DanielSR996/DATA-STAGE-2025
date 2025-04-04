const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CasosPedimento = sequelize.define('CasosPedimento', {
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
  Clave_Caso: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Identificador_Caso: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  Complemento_Caso: {
    type: DataTypes.STRING(20),
    allowNull: false
  }
}, {
  tableName: '507_casos_pedimento',
  timestamps: false
});

module.exports = CasosPedimento; 