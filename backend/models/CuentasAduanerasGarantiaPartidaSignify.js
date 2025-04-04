const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const CuentasAduanerasGarantiaPartida = sequelizeSignify.define('CuentasAduanerasGarantiaPartida', {
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
  Clave_Institucion_Emisor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Numero_Cuenta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Folio_Constancia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Constancia: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Clave_Tipo_Cuenta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Garantia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Valor_Unitario_Titulo: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Total_Garantia: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Cantidad_Unidades_Medida_Precio_Estimado: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Titulos_Asignados: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '555_cuentas_aduaneras_garantia_partida',
  timestamps: false
});

module.exports = CuentasAduanerasGarantiaPartida;