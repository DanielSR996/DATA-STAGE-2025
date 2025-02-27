const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class CuentasAduanerasGarantiaPartida extends Model {}

CuentasAduanerasGarantiaPartida.init({
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
  Clave_Institucion_Emisor: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Numero_Cuenta: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
  Folio_Constancia: {
    type: DataTypes.CHAR(17),
    allowNull: true,
  },
  Fecha_Constancia: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Clave_Garantia: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Valor_Unitario_Titulo: {
    type: DataTypes.DECIMAL(14, 4),
    allowNull: true,
  },
  Total_Garantia: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
  },
  Cantidad_Unidades_Medida_Precio_Estimado: {
    type: DataTypes.DECIMAL(14, 4),
    allowNull: true,
  },
  Titulos_Asignados: {
    type: DataTypes.DECIMAL(11, 4),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'CuentasAduanerasGarantiaPartida',
  tableName: '555_Cuentas_aduaneras_garantia_partida',
  timestamps: false,
});

module.exports = CuentasAduanerasGarantiaPartida; 