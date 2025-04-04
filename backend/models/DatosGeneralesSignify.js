const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DatosGeneralesSignify = sequelize.define('DatosGeneralesSignify', {
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
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  Clave_Documento: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Sec_Aduanera_Entrada: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  CURP_Contribuyente: {
    type: DataTypes.CHAR(18),
    allowNull: true
  },
  RFC_Contribuyente: {
    type: DataTypes.CHAR(13),
    allowNull: false
  },
  CURP_Agente_Aduanal: {
    type: DataTypes.CHAR(18),
    allowNull: false
  },
  Tipo_Cambio: {
    type: DataTypes.DECIMAL(10, 5),
    allowNull: false
  },
  Total_Fletes: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Total_Seguros: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Total_Embalajes: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Total_Otros_Incrementables: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Total_Otros_Deducibles: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Peso_Bruto_Mercancia: {
    type: DataTypes.DECIMAL(15, 3),
    allowNull: false
  },
  Clave_Medio_Transporte_Salida: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Medio_Transporte_Arribo: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Medio_Transporte_Entrada_Salida: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Destino_Mercancia: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  Nombre_Contribuyente: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Calle_Domicilio_Contribuyente: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Numero_Interior_Domicilio_Contribuyente: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  Numero_Exterior_Domicilio_Contribuyente: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  Codigo_Postal_Domicilio_Contribuyente: {
    type: DataTypes.CHAR(5),
    allowNull: false
  },
  Municipio_Ciudad_Domicilio_Contribuyente: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Clave_Entidad_Federativa_Domicilio_Contribuyente: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Pais_Domicilio_Contribuyente: {
    type: DataTypes.CHAR(3),
    allowNull: false
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.CHAR(1),
    allowNull: false
  },
  Fecha_Recepcion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true
  }
}, {
  tableName: '501_datos_generales',
  timestamps: false
});

module.exports = DatosGeneralesSignify; 