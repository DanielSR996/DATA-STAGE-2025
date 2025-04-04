const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const SeleccionAutomatizada = sequelizeSignify.define('SeleccionAutomatizada', {
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
  Clave_Tipo_Pedimento: {
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
  Clave_Seleccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '562_seleccion_automatizada',
  timestamps: false
});

module.exports = SeleccionAutomatizada; 