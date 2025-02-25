const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Facturas extends Model {}

Facturas.init({
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
  Fecha_Facturacion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Numero_Factura: {
    type: DataTypes.CHAR(15),
    allowNull: true,
  },
  Clave_Termino_Facturacion: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Moneda_Facturacion: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Valor_Dolares: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
  },
  Valor_Moneda_Extranjera: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
  },
  Clave_Pais_Facturacion: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Entidad_Federativa_Facturacion: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Identificacion_Fiscal_Proveedor: {
    type: DataTypes.CHAR(17),
    allowNull: true,
  },
  Proveedor_Mercancia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Calle_Domicilio_Proveedor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Numero_Interior_Domicilio_Proveedor: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Numero_Exterior_Domicilio_Proveedor: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Codigo_Postal_Domicilio_Proveedor: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Municipio_Ciudad_Domicilio_Proveedor: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Facturas',
  tableName: '505_Facturas',
  timestamps: false,
});

module.exports = Facturas; 