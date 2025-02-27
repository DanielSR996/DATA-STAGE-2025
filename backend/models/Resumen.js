const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Resumen extends Model {}

Resumen.init({
  Folio: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  RFCoPatenteAduanal: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  Fecha_Inicial: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Fecha_Final: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Fecha_Ejecucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Total_Fracciones: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Total_Contribuciones: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Resumen',
  tableName: 'Resumen',
  timestamps: false,
});

module.exports = Resumen; 