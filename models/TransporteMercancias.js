const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class TransporteMercancias extends Model {
  static init(sequelize) {
    return super.init({
      Patente_Aduanal: {
        type: DataTypes.CHAR(4),
        primaryKey: true
      },
      Numero_Pedimento: {
        type: DataTypes.CHAR(7),
        primaryKey: true
      },
      Clave_Sec_Aduanera_Despacho: {
        type: DataTypes.CHAR(3),
        primaryKey: true
      },
      RFC_Transportista: DataTypes.CHAR(13),
      CURP_Transportista: DataTypes.CHAR(18),
      Nombre_Razon_Social_Transportista: DataTypes.STRING(120),
      Clave_Pais_Transporte: DataTypes.CHAR(3),
      Identificador_Transporte: DataTypes.CHAR(17),
      Fecha_Pago_Real: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'TransporteMercancias',
      tableName: '502_Transporte_mercancias',
      timestamps: false,
      primaryKey: false
    });
  }
}

module.exports = TransporteMercancias; 