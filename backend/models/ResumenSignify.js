const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const Resumen = sequelizeSignify.define('Resumen', {
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
  Total_Fracciones: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Total_Partidas: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Total_Contribuciones: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Total_Garantias: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '563_resumen',
  timestamps: false
});

module.exports = Resumen;