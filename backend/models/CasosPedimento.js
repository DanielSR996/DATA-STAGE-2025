const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CasosPedimento extends Model {}

CasosPedimento.init({
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
  Clave_Caso: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  Identificador_Caso: {
    type: DataTypes.CHAR(20),
    allowNull: true,
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Complemento_Caso: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Fecha_Validacion_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'CasosPedimento',
  tableName: '507_Casos_pedimento',
  timestamps: false,
});

module.exports = CasosPedimento; 