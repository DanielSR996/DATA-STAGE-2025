const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const Facturas = sequelize.define('Facturas', {
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
  Fecha_Facturacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Numero_Factura: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Clave_Termino_Facturacion: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Moneda_Facturacion: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  Valor_Dolares: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Valor_Moneda_Extranjera: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Pais_Facturacion: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  Clave_Entidad_Federativa_Facturacion: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Identificacion_Fiscal_Proveedor: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  Proveedor_Mercancia: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Calle_Domicilio_Proveedor: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Numero_Interior_Domicilio_Proveedor: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  Numero_Exterior_Domicilio_Proveedor: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  Codigo_Postal_Domicilio_Proveedor: {
    type: DataTypes.CHAR(5),
    allowNull: false
  },
  Municipio_Ciudad_Domicilio_Proveedor: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: '505_facturas',
  timestamps: false
});

module.exports = Facturas; 