const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const TransporteMercancias = sequelize.define('TransporteMercancias', {
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
  Clave_Tipo_Transporte: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Transporte: {
    type: DataTypes.CHAR(2),
    allowNull: false
  }
}, {
  tableName: '502_transporte_mercancias',
  timestamps: false
});

module.exports = TransporteMercancias; 