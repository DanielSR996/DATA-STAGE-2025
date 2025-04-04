const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TasasPedimento extends Model {}

TasasPedimento.init({
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
  Clave_Contribucion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Tasa_Contribucion: {
    type: DataTypes.DECIMAL(10, 5),
    allowNull: true,
  },
  Clave_Tipo_Tasa: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'TasasPedimento',
  tableName: '509_Tasas_pedimento',
  timestamps: false,
});

module.exports = TasasPedimento; 