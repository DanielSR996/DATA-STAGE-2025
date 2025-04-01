const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DatosGenerales extends Model {}

DatosGenerales.init({
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
  Clave_Tipo_Operacion: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Documento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Sec_Aduanera_Entrada: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CURP_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  RFC_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  CURP_Agente_Aduanal: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Tipo_Cambio: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Total_Fletes: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Total_Seguros: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Total_Embalajes: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Total_Otros_Incrementables: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Total_Otros_Deducibles: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Peso_Bruto_Mercancia: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  Clave_Medio_Transporte_Salida: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Medio_Transporte_Arribo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Medio_Transporte_Entrada_Salida: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Destino_Mercancia: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Nombre_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Calle_Domicilio_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Numero_Interior_Domicilio_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Numero_Exterior_Domicilio_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Codigo_Postal_Domicilio_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Municipio_Ciudad_Domicilio_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Entidad_Federativa_Domicilio_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Pais_Domicilio_Contribuyente: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  Fecha_Recepcion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize: sequelize,
  modelName: 'DatosGenerales',
  tableName: '501_datos_generales',
  timestamps: false,
});

module.exports = DatosGenerales;