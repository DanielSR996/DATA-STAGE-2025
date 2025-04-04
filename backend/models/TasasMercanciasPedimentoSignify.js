const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TasasMercanciasPedimento = sequelize.define('TasasMercanciasPedimento', {
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
  Clave_Contribucion: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Tasa_Contribucion: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false
  },
  Clave_Tipo_Tasa: {
    type: DataTypes.CHAR(2),
    allowNull: false
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.CHAR(1),
    allowNull: false
  }
}, {
  tableName: '515_tasas_mercancias_pedimento',
  timestamps: false
});

module.exports = TasasMercanciasPedimento; 