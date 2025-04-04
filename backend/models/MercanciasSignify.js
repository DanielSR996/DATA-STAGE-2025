const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const Mercancias = sequelizeSignify.define('Mercancias', {
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
  VIN_Numero_Serie: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Kilometraje_Vehiculo: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '552_mercancias',
  timestamps: false
});

module.exports = Mercancias; 