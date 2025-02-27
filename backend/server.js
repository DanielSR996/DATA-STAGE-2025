const express = require('express');
const multer = require('multer');
const path = require('path');
const AdmZip = require('adm-zip');
const fs = require('fs');
const csvParser = require('csv-parser');
const sequelize = require('./config/database');
const DatosGenerales = require('./models/DatosGenerales');
const TransporteMercancias = require('./models/TransporteMercancias');
const Guias = require('./models/Guias');
const cors = require('cors'); // Importa el paquete cors
const Contenedores = require('./models/Contenedores');
const Facturas = require('./models/Facturas');
const FechasPedimento = require('./models/FechasPedimento');
const CasosPedimento = require('./models/CasosPedimento');
const CuentasAduanerasGarantiaPedimento = require('./models/CuentasAduanerasGarantiaPedimento');
const TasasPedimento = require('./models/TasasPedimento');
const ContribucionesPedimento = require('./models/ContribucionesPedimento');
const ObservacionesPedimento = require('./models/ObservacionesPedimento');
const DescargosMercancias = require('./models/DescargosMercancias');
const DestinatariosMercancia = require('./models/DestinatariosMercancia');
const Partidas = require('./models/Partidas');
const Mercancias = require('./models/Mercancias');
const PermisoPartida = require('./models/PermisoPartida');
const CasosPartida = require('./models/CasosPartida');
const CuentasAduanerasGarantiaPartida = require('./models/CuentasAduanerasGarantiaPartida');
const TasasContribucionesPartida = require('./models/TasasContribucionesPartida');
const ContribucionesPartida = require('./models/ContribucionesPartida');
const ObservacionesPartida = require('./models/ObservacionesPartida');
const Rectificaciones = require('./models/Rectificaciones');
const DiferenciasContribucionesPedimento = require('./models/DiferenciasContribucionesPedimento');
const IncidenciasReconocimientoAduanero = require('./models/IncidenciasReconocimientoAduanero');
const SeleccionAutomatizada = require('./models/SeleccionAutomatizada');
// Importa otros modelos según sea necesario

const app = express();
const PORT = process.env.PORT || 3000;

// Usa el middleware cors
app.use(cors());

// Configuración de Multer para guardar archivos temporalmente
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (path.extname(file.originalname) !== '.zip') {
      return cb(new Error('Solo se permiten archivos ZIP'));
    }
    cb(null, true);
  }
});

// Mapeo de terminaciones de archivos a tablas y columnas
const fileToTable = {
  '_501.asc': {
    tableName: 'DatosGenerales',
    columns: ['Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho', 'Clave_Tipo_Operacion', 'Clave_Documento', 'Clave_Sec_Aduanera_Entrada', 'CURP_Contribuyente', 'RFC_Contribuyente', 'CURP_Agente_Aduanal', 'Tipo_Cambio', 'Total_Fletes', 'Total_Seguros', 'Total_Embalajes', 'Total_Otros_Incrementables', 'Total_Otros_Deducibles', 'Peso_Bruto_Mercancia', 'Clave_Medio_Transporte_Salida', 'Clave_Medio_Transporte_Arribo', 'Clave_Medio_Transporte_Entrada_Salida', 'Clave_Destino_Mercancia', 'Nombre_Contribuyente', 'Calle_Domicilio_Contribuyente', 'Numero_Interior_Domicilio_Contribuyente', 'Numero_Exterior_Domicilio_Contribuyente', 'Codigo_Postal_Domicilio_Contribuyente', 'Municipio_Ciudad_Domicilio_Contribuyente', 'Clave_Entidad_Federativa_Domicilio_Contribuyente', 'Clave_Pais_Domicilio_Contribuyente', 'Clave_Tipo_Pedimento', 'Fecha_Recepcion', 'Fecha_Pago_Real'],
    dateColumns: ['Fecha_Recepcion', 'Fecha_Pago_Real']
  },
  '_502.asc': {
    tableName: 'TransporteMercancias',
    columns: ['Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho', 'RFC_Transportista', 'CURP_Transportista', 'Nombre_Razon_Social_Transportista', 'Clave_Pais_Transporte', 'Identificador_Transporte', 'Fecha_Pago_Real'],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_503.asc': {
    tableName: 'Guias',
    columns: ['Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho', 'Numero_Guia_Manifiesto', 'Clave_Tipo_Guia', 'Fecha_Pago_Real'],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_504.asc': {
    tableName: 'Contenedores',
    columns: ['Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho', 'Numero_Contenedor', 'Clave_Tipo_Contenedor', 'Fecha_Pago_Real'],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_505.asc': {
    tableName: 'Facturas',
    columns: ['Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho', 'Fecha_Facturacion', 'Numero_Factura', 'Clave_Termino_Facturacion', 'Clave_Moneda_Facturacion', 'Valor_Dolares', 'Valor_Moneda_Extranjera', 'Clave_Pais_Facturacion', 'Clave_Entidad_Federativa_Facturacion', 'Identificacion_Fiscal_Proveedor', 'Proveedor_Mercancia', 'Calle_Domicilio_Proveedor', 'Numero_Interior_Domicilio_Proveedor', 'Numero_Exterior_Domicilio_Proveedor', 'Codigo_Postal_Domicilio_Proveedor', 'Municipio_Ciudad_Domicilio_Proveedor', 'Fecha_Pago_Real'],
    dateColumns: ['Fecha_Facturacion', 'Fecha_Pago_Real']
  },
  '_506.asc': {
    tableName: 'FechasPedimento',
    columns: ['Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho', 'Clave_Tipo_Fecha', 'Fecha_Operacion', 'Fecha_Validacion_Pago_Real'],
    dateColumns: ['Fecha_Operacion', 'Fecha_Validacion_Pago_Real']
  },
  '_507.asc': {
    tableName: 'CasosPedimento',
    columns: ['Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho', 'Clave_Caso', 'Identificador_Caso', 'Clave_Tipo_Pedimento', 'Complemento_Caso', 'Fecha_Validacion_Pago_Real'],
    dateColumns: ['Fecha_Validacion_Caso_Real']
  },
  '_508.asc': {
    tableName: 'CuentasAduanerasGarantiaPedimento',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Clave_Institucion_Emisor', 'Numero_Cuenta', 'Folio_Constancia',
      'Fecha_Constancia', 'Clave_Tipo_Cuenta', 'Clave_Garantia',
      'Valor_Unitario_Titulo', 'Total_Garantia',
      'Cantidad_Unidades_Medida_Precio_Estimado', 'Titulos_Asignados',
      'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Constancia', 'Fecha_Pago_Real']
  },
  '_509.asc': {
    tableName: 'TasasPedimento',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Clave_Contribucion', 'Tasa_Contribucion', 'Clave_Tipo_Tasa',
      'Clave_Tipo_Pedimento', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_510.asc': {
    tableName: 'ContribucionesPedimento',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Clave_Contribucion', 'Clave_Forma_Pago', 'Importe_Pago',
      'Clave_Tipo_Pedimento', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_511.asc': {
    tableName: 'ObservacionesPedimento',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Secuencia_Observacion', 'Observaciones', 'Clave_Tipo_Pedimento',
      'Fecha_Validacion_Pago_Real'
    ],
    dateColumns: ['Fecha_Validacion_Pago_Real']
  },
  '_512.asc': {
    tableName: 'DescargosMercancias',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Patente_Aduanal_Original', 'Numero_Pedimento_Original',
      'Clave_Sec_Aduanera_Despacho_Original', 'Clave_Documento_Original',
      'Fecha_Operacion_Original', 'Fraccion_Arancelaria_Original', '	Clave_Unidad_Medida_Original',
      'Cantidad_Mercancia_Descargada', 'Clave_Tipo_Pedimento', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Operacion_Original', 'Fecha_Pago_Real']
  },
  '_520.asc': {
    tableName: 'DestinatariosMercancia',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Identificacion_Fiscal_Destinatario', 'Nombre_Destinatario', 'Calle_Domicilio_Destinatario',
      'Numero_Interior_Domicilio_Destinatario', 'Numero_Exterior_Domicilio_Destinatario',
      'Codigo_Postal_Domicilio_Destinatario', 'Municipio_Ciudad_Domicilio_Destinatario',
      'Clave_Pais_Domicilio_Destinatario', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_551.asc': {
    tableName: 'Partidas',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Subdivision_Fraccion_Arancelaria',
      'Descripcion_Mercancia', 'Precio_Unitario', 'Valor_Aduana', 'Valor_Comercial',
      'Valor_Dolares', 'Cantidad_Mercancias_Unidad_Medida_Comercial', 'Clave_Unidad_Medida_Comercial',
      'Cantidad_Mercancia_Unidad_Medida_Tarifa', 'Clave_Unidad_Medida_Tarifa', 'Valor_Agregado',
      'Clave_Vinculacion', 'Clave_Metodo_Valorizacion', 'Codigo_Mercancia_Producto',
      'Marca_Mercancia_Producto', 'Modelo_Mercancia_Producto', 'Clave_Pais_Origen_Destino',
      'Clave_Pais_Comprador_Vendedor', 'Clave_Entidad_Federativa_Origen', 'Clave_Entidad_Federativa_Destino',
      'Clave_Entidad_Federativa_Comprador', 'Clave_Entidad_Federativa_Vendedor', 'Clave_Tipo_Operacion',
      'Clave_Documento', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_552.asc': {
    tableName: 'Mercancias',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'VIN_Numero_Serie',
      'Kilometraje_Vehiculo', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_553.asc': {
    tableName: 'PermisoPartida',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Clave_Permiso',
      'Firma_Descargo', 'Numero_Permiso', 'Valor_Comercial_Dolares',
      'Cantidad_Mercancia_Unidades_Medida_Tarifa', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_554.asc': {
    tableName: 'CasosPartida',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Clave_Caso',
      'Identificador_Caso', 'Complemento_Caso', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_555.asc': {
    tableName: 'CuentasAduanerasGarantiaPartida',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Clave_Institucion_Emisor',
      'Numero_Cuenta', 'Folio_Constancia', 'Fecha_Constancia', 'Clave_Garantia',
      'Valor_Unitario_Titulo', 'Total_Garantia', 'Cantidad_Unidades_Medida_Precio_Estimado',
      'Titulos_Asignados', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Constancia', 'Fecha_Pago_Real']
  },
  '_556.asc': {
    tableName: 'TasasContribucionesPartida',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Clave_Contribucion',
      'Tasa_Contribucion', 'Clave_Tipo_Tasa', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_557.asc': {
    tableName: 'ContribucionesPartida',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Clave_Contribucion',
      'Clave_Forma_Pago', 'Importe_Pago', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_558.asc': {
    tableName: 'ObservacionesPartida',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Secuencia_Observacion',
      'Observaciones', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_701.asc': {
    tableName: 'Rectificaciones',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Clave_Documento', 'Fecha_Pago', 'Numero_Pedimento_Anterior',
      'Patente_Aduanal_Anterior', 'Clave_Sec_Aduanera_Despacho_Anterior',
      'Clave_Documento_Anterior', 'Fecha_Operacion_Anterior', 'Numero_Pedimento_Original',
      'Patente_Aduanal_Original', 'Clave_Sec_Aduanera_Despacho_Original', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago', 'Fecha_Operacion_Anterior', 'Fecha_Pago_Real']
  },
  '_702.asc': {
    tableName: 'DiferenciasContribucionesPedimento',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Clave_Contribucion', 'Clave_Forma_Pago', 'Importe_Pago',
      'Clave_Tipo_Pedimento', 'Fecha_Pago_Real'
    ],
    dateColumns: ['Fecha_Pago_Real']
  },
  '_Inci.asc': {
    tableName: 'IncidenciasReconocimientoAduanero',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Consecutivo_Remesa', 'Numero_Seleccion_Automatizada', 'Fecha_Inicio_Reconocimiento',
      'Hora_Inicio_Reconocimiento', 'Fecha_Fin_Reconocimiento', 'Hora_Fin_Reconocimiento',
      'Fraccion_Arancelaria', 'Secuencia_Fraccion_Arancelaria', 'Clave_Documento',
      'Clave_Tipo_Operacion', 'Grado_Incidencia', 'Fecha_Seleccion_Automatizada'
    ],
    dateColumns: ['Fecha_Inicio_Reconocimiento', 'Fecha_Fin_Reconocimiento', 'Fecha_Seleccion_Automatizada']
  },
  '_Sel.asc': {
    tableName: 'SeleccionAutomatizada',
    columns: [
      'Patente_Aduanal', 'Numero_Pedimento', 'Clave_Sec_Aduanera_Despacho',
      'Consecutivo_Remesa', 'Numero_Seleccion_Automatizada', 'Fecha_Seleccion_Automatizada',
      'Hora_Seleccion_Automatizada', 'Semaforo_Fiscal', 'Clave_Documento',
      'Clave_Tipo_Operacion'
    ],
    dateColumns: ['Fecha_Seleccion_Automatizada']
  },
};

// Asegúrate de que los modelos están inicializados con Sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    DatosGenerales.init(sequelize);
    TransporteMercancias.init(sequelize);
    Guias.init(sequelize);
    Contenedores.init(sequelize);
    Facturas.init(sequelize);
    FechasPedimento.init(sequelize);
    CasosPedimento.init(sequelize);
    CuentasAduanerasGarantiaPedimento.init(sequelize);
    TasasPedimento.init(sequelize);
    ContribucionesPedimento.init(sequelize);
    ObservacionesPedimento.init(sequelize);
    DescargosMercancias.init(sequelize);
    DestinatariosMercancia.init(sequelize);
    Partidas.init(sequelize);
    Mercancias.init(sequelize);
    PermisoPartida.init(sequelize);
    CasosPartida.init(sequelize);
    CuentasAduanerasGarantiaPartida.init(sequelize);
    TasasContribucionesPartida.init(sequelize);
    ContribucionesPartida.init(sequelize);
    ObservacionesPartida.init(sequelize);
    Rectificaciones.init(sequelize);
    DiferenciasContribucionesPedimento.init(sequelize);
    IncidenciasReconocimientoAduanero.init(sequelize);
    SeleccionAutomatizada.init(sequelize);

    // Sincroniza los modelos con la base de datos
    await sequelize.sync();
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

// Endpoint para manejar la subida de archivos
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No se ha subido ningún archivo.');
    }

    const zip = new AdmZip(req.file.path);
    const zipEntries = zip.getEntries();

    zipEntries.forEach((zipEntry) => {
      const fileName = zipEntry.entryName;
      const fileConfig = Object.entries(fileToTable).find(([key]) => fileName.endsWith(key));

      if (!fileConfig) {
        console.error(`No se encontró configuración para el archivo: ${fileName}`);
        return;
      }

      const { tableName, columns, dateColumns } = fileConfig[1];
      const filePath = `uploads/${zipEntry.entryName}`;
      zip.extractEntryTo(zipEntry, 'uploads', false, true);

      let esPrimeraLinea = true;

      fs.createReadStream(filePath)
        .pipe(csvParser({ separator: '|', headers: columns }))
        .on('data', async (row) => {
          if (esPrimeraLinea) {
            esPrimeraLinea = false; // Ignorar la primera línea
            return;
          }
          dateColumns.forEach((col) => {
            if (row[col]) {
              const date = new Date(row[col]);
              if (!isNaN(date.getTime())) {
                row[col] = date;
              } else {
                console.error(`Fecha inválida para la columna ${col}:`, row[col]);
                row[col] = null; // O maneja el error de otra manera
              }
            }
          });

          console.log(`Intentando insertar en la tabla ${tableName}:`, row); // Log de los datos a insertar

          try {
            // Inserta el registro en la tabla correspondiente
            await sequelize.models[tableName].create(row);
            console.log(`Registro insertado en la tabla ${tableName}:`, row);
          } catch (err) {
            console.error(`Error al insertar en la tabla ${tableName}:`, err);
            if (err.name === 'SequelizeUniqueConstraintError') {
              console.log(`Registro duplicado ignorado en la tabla ${tableName}:`, row);
            } else {
              console.error(`Error al insertar en la tabla ${tableName}:`, err);
            }
          }
        })
        .on('end', () => {
          console.log(`Archivo ${zipEntry.entryName} procesado completamente.`);
          fs.unlinkSync(filePath);
        })
        .on('error', (err) => {
          console.error(`Error al procesar el archivo ${zipEntry.entryName}:`, err);
        });
    });

    res.status(200).send('Archivo subido y procesado con éxito.');
  } catch (error) {
    console.error('Error al procesar el archivo:', error);
    res.status(500).send('Error al subir y procesar el archivo.');
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).send('Error de Multer al subir el archivo.');
  } else if (err) {
    return res.status(500).send(err.message);
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
}); 