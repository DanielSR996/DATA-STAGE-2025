const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const IncidenciasReconocimientoAduanero = sequelizeSignify.define('IncidenciasReconocimientoAduanero', {
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
  Clave_Incidencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Identificador_Incidencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Complemento_Incidencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '561_incidencias_reconocimiento_aduanero',
  timestamps: false
});

module.exports = IncidenciasReconocimientoAduanero; 