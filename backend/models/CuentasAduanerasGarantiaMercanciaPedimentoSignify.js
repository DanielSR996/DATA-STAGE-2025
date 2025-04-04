const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CuentasAduanerasGarantiaMercanciaPedimento = sequelize.define('CuentasAduanerasGarantiaMercanciaPedimento', {
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
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true
  },
  Clave_Producto: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  Clave_Institucion_Emisor: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Numero_Cuenta: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Folio_Constancia: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Fecha_Constancia: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Clave_Tipo_Cuenta: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Garantia: {
    type: DataTypes.CHAR(2),
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
  Clave_Tipo_Pedimento: {
    type: DataTypes.CHAR(1),
    allowNull: false
  }
}, {
  tableName: '514_cuentas_aduaneras_garantia_mercancia_pedimento',
  timestamps: false
});

module.exports = CuentasAduanerasGarantiaMercanciaPedimento; 