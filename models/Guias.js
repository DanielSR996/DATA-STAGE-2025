const { Model, DataTypes } = require('sequelize');

class Guias extends Model {
  static init(sequelize) {
    return super.init({
      Patente_Aduanal: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      Numero_Pedimento: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      Clave_Sec_Aduanera_Despacho: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      Numero_Guia_Manifiesto: DataTypes.STRING,
      Clave_Tipo_Guia: DataTypes.STRING,
      Fecha_Pago_Real: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'Guias',
      tableName: '503_Guias',
      timestamps: false,
      primaryKey: false
    });
  }
}

module.exports = Guias; 