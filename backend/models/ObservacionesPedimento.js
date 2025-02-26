const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class ObservacionesPedimento extends Model {}

ObservacionesPedimento.init({
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
  Secuencia_Observacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Observaciones: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Fecha_Validacion_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'ObservacionesPedimento',
  tableName: '511_Observaciones_pedimento',
  timestamps: false,
});

module.exports = ObservacionesPedimento; 