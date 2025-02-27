const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class DescargosMercancias extends Model {}

DescargosMercancias.init({
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
  Patente_Aduanal_Original: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Numero_Pedimento_Original: {
    type: DataTypes.CHAR(7),
    allowNull: true,
  },
  Clave_Sec_Aduanera_Despacho_Original: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Documento_Original: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Fecha_Operacion_Original: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Fraccion_Arancelaria_Original: {
    type: DataTypes.CHAR(8),
    allowNull: true,
  },
  Clave_Unidad_Medida_Original: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Cantidad_Mercancia_Descargada: {
    type: DataTypes.DECIMAL(14, 3),
    allowNull: true,
  },
  Clave_Tipo_Pedimento: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Fecha_Pago_Real: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'DescargosMercancias',
  tableName: '512_Descargos_mercancias',
  timestamps: false,
});

module.exports = DescargosMercancias; 