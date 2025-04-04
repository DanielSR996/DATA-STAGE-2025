const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const ObservacionesPartida = sequelizeSignify.define('ObservacionesPartida', {
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
  Fraccion_Arancelaria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Secuencia_Fraccion_Arancelaria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Secuencia_Observacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Observaciones: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '558_observaciones_partida',
  timestamps: false
});

module.exports = ObservacionesPartida; 