const { Model, DataTypes } = require('sequelize');

class DatosGenerales extends Model {
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
      Clave_Tipo_Operacion: DataTypes.STRING,
      Clave_Documento: DataTypes.STRING,
      Clave_Sec_Aduanera_Entrada: DataTypes.STRING,
      CURP_Contribuyente: DataTypes.STRING,
      RFC_Contribuyente: DataTypes.STRING,
      CURP_Agente_Aduanal: DataTypes.STRING,
      Tipo_Cambio: DataTypes.FLOAT,
      Total_Fletes: DataTypes.FLOAT,
      Total_Seguros: DataTypes.FLOAT,
      Total_Embalajes: DataTypes.FLOAT,
      Total_Otros_Incrementables: DataTypes.FLOAT,
      Total_Otros_Deducibles: DataTypes.FLOAT,
      Peso_Bruto_Mercancia: DataTypes.FLOAT,
      Clave_Medio_Transporte_Salida: DataTypes.STRING,
      Clave_Medio_Transporte_Arribo: DataTypes.STRING,
      Clave_Medio_Transporte_Entrada_Salida: DataTypes.STRING,
      Clave_Destino_Mercancia: DataTypes.STRING,
      Nombre_Contribuyente: DataTypes.STRING,
      Calle_Domicilio_Contribuyente: DataTypes.STRING,
      Numero_Interior_Domicilio_Contribuyente: DataTypes.STRING,
      Numero_Exterior_Domicilio_Contribuyente: DataTypes.STRING,
      Codigo_Postal_Domicilio_Contribuyente: DataTypes.STRING,
      Municipio_Ciudad_Domicilio_Contribuyente: DataTypes.STRING,
      Clave_Entidad_Federativa_Domicilio_Contribuyente: DataTypes.STRING,
      Clave_Pais_Domicilio_Contribuyente: DataTypes.STRING,
      Clave_Tipo_Pedimento: DataTypes.STRING,
      Fecha_Recepcion: DataTypes.DATE,
      Fecha_Pago_Real: DataTypes.DATE,
    }, {
      sequelize,
      modelName: 'DatosGenerales',
      tableName: '501_Datos_generales',
      timestamps: false,
      primaryKey: false
    });
  }
}

module.exports = DatosGenerales; 