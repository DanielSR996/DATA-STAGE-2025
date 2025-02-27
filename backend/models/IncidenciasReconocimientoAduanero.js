const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class IncidenciasReconocimientoAduanero extends Model {}

IncidenciasReconocimientoAduanero.init({
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
  Fecha_Inicio_Reconocimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Hora_Inicio_Reconocimiento: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Fecha_Fin_Reconocimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Hora_Fin_Reconocimiento: {
    type: DataTypes.CHAR(10),
    allowNull: true,
  },
  Fraccion_Arancelaria: {
    type: DataTypes.CHAR(8),
    allowNull: true,
  },
  Secuencia_Fraccion_Arancelaria: {
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
  Grado_Incidencia: {
    type: DataTypes.CHAR(2),
    allowNull: true,
  },
  Fecha_Seleccion_Automatizada: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'IncidenciasReconocimientoAduanero',
  tableName: 'Incidencias_reconocimiento_aduanero',
  timestamps: false,
});

module.exports = IncidenciasReconocimientoAduanero; 