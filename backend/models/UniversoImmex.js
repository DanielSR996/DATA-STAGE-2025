const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class UniversoImmex extends Model {}

UniversoImmex.init({
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
  Subdivision_Fraccion_Arancelaria: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Descripcion_Mercancia: {
    type: DataTypes.STRING(250),
    allowNull: true,
  },
  Precio_Unitario: {
    type: DataTypes.DECIMAL(15, 5),
    allowNull: true,
  },
  Valor_Aduana: {
    type: DataTypes.DECIMAL(12, 0),
    allowNull: true,
  },
  Valor_Comercial: {
    type: DataTypes.DECIMAL(12, 0),
    allowNull: true,
  },
  Valor_Dolares: {
    type: DataTypes.DECIMAL(14, 2),
    allowNull: true,
  },
  Cantidad_Mercancias_Unidad_Medida_Comercial: {
    type: DataTypes.DECIMAL(15, 3),
    allowNull: true,
  },
  Clave_Unidad_Medida_Comercial: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Cantidad_Mercancia_Unidad_Medida_Tarifa: {
    type: DataTypes.DECIMAL(15, 3),
    allowNull: true,
  },
  Clave_Unidad_Medida_Tarifa: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Valor_Agregado: {
    type: DataTypes.DECIMAL(12, 0),
    allowNull: true,
  },
  Clave_Vinculacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Clave_Metodo_Valorizacion: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Codigo_Mercancia_Producto: {
    type: DataTypes.CHAR(20),
    allowNull: true,
  },
  Marca_Mercancia_Producto: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  Modelo_Mercancia_Producto: {
    type: DataTypes.STRING(80),
    allowNull: true,
  },
  Clave_Pais_Origen_Destino: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Pais_Comprador_Vendedor: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Entidad_Federativa_Origen: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Entidad_Federativa_Destino: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Entidad_Federativa_Comprador: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Entidad_Federativa_Vendedor: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Tipo_Operacion: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
  Clave_Documento: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'UniversoImmex',
  tableName: 'universo_immex',
  timestamps: false,
});

module.exports = UniversoImmex; 