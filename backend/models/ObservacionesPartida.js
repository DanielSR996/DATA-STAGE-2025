const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ObservacionesPartida extends Model {}

ObservacionesPartida.init({
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
  Secuencia_Observacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Observaciones: {
    type: DataTypes.STRING(120),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ObservacionesPartida',
  tableName: '558_Observaciones_partida',
  timestamps: false,
});

module.exports = ObservacionesPartida; 