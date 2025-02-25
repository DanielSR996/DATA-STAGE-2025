const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class FechasPedimento extends Model {}

FechasPedimento.init({
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
  Clave_Tipo_Fecha: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Fecha_Operacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Fecha_Validacion_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'FechasPedimento',
  tableName: '506_Fechas_pedimento',
  timestamps: false,
});

module.exports = FechasPedimento; 