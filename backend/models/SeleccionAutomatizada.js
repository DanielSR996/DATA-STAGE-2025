const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class SeleccionAutomatizada extends Model {}

SeleccionAutomatizada.init({
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
  Consecutivo_Remesa: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Numero_Seleccion_Automatizada: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Fecha_Seleccion_Automatizada: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Hora_Seleccion_Automatizada: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Semaforo_Fiscal: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  Clave_Documento: {
    type: DataTypes.CHAR(3),
    allowNull: true,
  },
  Clave_Tipo_Operacion: {
    type: DataTypes.CHAR(1),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'SeleccionAutomatizada',
  tableName: 'Seleccion_automatizada',
  timestamps: false,
});

module.exports = SeleccionAutomatizada; 