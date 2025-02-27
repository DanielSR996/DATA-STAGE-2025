const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ContribucionesPartida extends Model {}

ContribucionesPartida.init({
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
  Fraccion_Arancelaria: {
    type: DataTypes.CHAR(8),
    allowNull: false,
    primaryKey: true
  },
  Secuencia_Fraccion_Arancelaria: {
    type: DataTypes.INTEGER,
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
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ContribucionesPartida',
  tableName: '557_Contribuciones_partida',
  timestamps: false,
});

module.exports = ContribucionesPartida; 