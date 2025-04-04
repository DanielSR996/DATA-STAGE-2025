const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const Partidas = sequelizeSignify.define('Partidas', {
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
  Subdivision_Fraccion_Arancelaria: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Descripcion_Mercancia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Precio_Unitario: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Valor_Aduana: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Valor_Comercial: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Valor_Dolares: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Cantidad_Mercancias_Unidad_Medida_Comercial: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Unidad_Medida_Comercial: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cantidad_Mercancia_Unidad_Medida_Tarifa: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Unidad_Medida_Tarifa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Valor_Agregado: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Vinculacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Metodo_Valorizacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Codigo_Mercancia_Producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Marca_Mercancia_Producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Modelo_Mercancia_Producto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Pais_Origen_Destino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Pais_Comprador_Vendedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Entidad_Federativa_Origen: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Entidad_Federativa_Destino: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Entidad_Federativa_Comprador: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Entidad_Federativa_Vendedor: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Tipo_Operacion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Documento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '551_partidas',
  timestamps: false
});

module.exports = Partidas; 