const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const DiferenciasContribucionesPedimento = sequelizeSignify.define('DiferenciasContribucionesPedimento', {
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
  Clave_Contribucion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Forma_Pago: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Importe_Pago: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '560_diferencias_contribuciones_pedimento',
  timestamps: false
});

module.exports = DiferenciasContribucionesPedimento; 