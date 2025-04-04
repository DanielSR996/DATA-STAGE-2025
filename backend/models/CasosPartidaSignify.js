const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const CasosPartida = sequelizeSignify.define('CasosPartida', {
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
  Clave_Caso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Identificador_Caso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Complemento_Caso: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '554_casos_partida',
  timestamps: false
});

module.exports = CasosPartida; 