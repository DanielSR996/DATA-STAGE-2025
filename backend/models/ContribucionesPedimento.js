const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ContribucionesPedimento extends Model {}

ContribucionesPedimento.init({
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
  Clave_Forma_Pago: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Importe_Pago: {
    type: DataTypes.DECIMAL(12, 0),
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
  modelName: 'ContribucionesPedimento',
  tableName: '510_Contribuciones_pedimento',
  timestamps: false,
});

module.exports = ContribucionesPedimento; 