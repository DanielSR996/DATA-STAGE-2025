const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MercanciasPedimento = sequelize.define('MercanciasPedimento', {
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
  Descripcion_Producto: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  Cantidad_Unidad_Medida_Comercial: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Unidad_Medida_Comercial: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  Valor_Dolares: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Pais_Origen: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  Clave_Pais_Procedencia: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.CHAR(1),
    allowNull: false
  }
}, {
  tableName: '512_mercancias_pedimento',
  timestamps: false
});

module.exports = MercanciasPedimento; 