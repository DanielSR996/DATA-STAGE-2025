const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const ObservacionesPedimento = sequelizeSignify.define('ObservacionesPedimento', {
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
  Secuencia_Observacion: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Observaciones: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  Fecha_Validacion_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '511_observaciones_pedimento',
  timestamps: false
});

module.exports = ObservacionesPedimento; 