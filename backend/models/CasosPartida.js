const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CasosPartida extends Model {}

CasosPartida.init({
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
  Clave_Caso: {
    type: DataTypes.CHAR(2),
    allowNull: true,
  },
  Identificador_Caso: {
    type: DataTypes.CHAR(20),
    allowNull: true,
  },
  Complemento_Caso: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'CasosPartida',
  tableName: '554_Casos_partida',
  timestamps: false,
});

module.exports = CasosPartida; 