const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class PermisoPartida extends Model {}

PermisoPartida.init({
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
  Clave_Permiso: {
    type: DataTypes.CHAR(2),
    allowNull: true,
  },
  Firma_Descargo: {
    type: DataTypes.CHAR(17),
    allowNull: true,
  },
  Numero_Permiso: {
    type: DataTypes.CHAR(17),
    allowNull: true,
  },
  Valor_Comercial_Dolares: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
  },
  Cantidad_Mercancia_Unidades_Medida_Tarifa: {
    type: DataTypes.DECIMAL(15, 3),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'PermisoPartida',
  tableName: '553_Permiso_partida',
  timestamps: false,
});

module.exports = PermisoPartida; 