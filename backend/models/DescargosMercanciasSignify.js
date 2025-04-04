const { DataTypes } = require('sequelize');
const sequelizeSignify = require('../config/database_signify');

const DescargosMercancias = sequelizeSignify.define('DescargosMercancias', {
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
  Patente_Aduanal_Original: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Numero_Pedimento_Original: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Sec_Aduanera_Despacho_Original: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Documento_Original: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Operacion_Original: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Fraccion_Arancelaria_Original: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Clave_Unidad_Medida_Original: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Cantidad_Mercancia_Descargada: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: '512_descargos_mercancias',
  timestamps: false
});

module.exports = DescargosMercancias; 