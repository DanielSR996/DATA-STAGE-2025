const express = require('express');
const multer = require('multer');
const path = require('path');
const AdmZip = require('adm-zip');
const fs = require('fs');
const csvParser = require('csv-parser');
const { Sequelize, Op } = require('sequelize');
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
const Resumen = require('./models/Resumen');
const xlsx = require('xlsx');
const UniversoImmex = require('./models/UniversoImmex');
const compression = require('compression');
// Importa otros modelos según sea necesario

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS
app.use(cors({
  origin: '*', // Permite conexiones desde cualquier origen
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Agregar estos middleware ANTES de las rutas
app.use(express.json({ limit: '10gb' }));
app.use(express.urlencoded({ extended: true, limit: '10gb' }));
app.use(compression());

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
  limits: {
    fileSize: 10 * 1024 * 1024 * 1024 // 10GB
  },
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
  '_Resumen.asc': {
    tableName: 'Resumen',
    columns: [
      'Folio', 'RFCoPatenteAduanal', 'Fecha_Inicial', 'Fecha_Final',
      'Fecha_Ejecucion', 'Total_Fracciones', 'Total_Contribuciones'
    ],
    dateColumns: ['Fecha_Inicial', 'Fecha_Final', 'Fecha_Ejecucion']
  },
};

// Asegúrate de que los modelos están inicializados con Sequelize
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos establecida con éxito.');

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ alter: false }); // Evitar alteraciones automáticas
    console.log('Modelos sincronizados con la base de datos.');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
})();

// Función para verificar la coincidencia de Total_Fracciones
async function verificarTotalFracciones(folio, totalFraccionesDeclarado) {
  try {
    // Calcula el total de fracciones en la tabla 551_Partidas para el folio dado
    const totalFraccionesCalculado = await sequelize.models.Partidas.count({
      where: { 
        Patente_Aduanal: folio.substring(0, 4),
        Numero_Pedimento: folio.substring(4, 11),
        Clave_Sec_Aduanera_Despacho: folio.substring(11, 14)
      }
    });

    if (totalFraccionesCalculado !== totalFraccionesDeclarado) {
      console.warn(`Alerta: El Total_Fracciones declarado (${totalFraccionesDeclarado}) no coincide con el calculado (${totalFraccionesCalculado}) para el folio ${folio}.`);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error al verificar Total_Fracciones:', error);
    return false;
  }
}

// Función para verificar si las fechas ya existen en la base de datos
async function verificarFechasUnicas(tableName, row, dateColumns) {
  try {
    const whereClause = {};
    dateColumns.forEach((col) => {
      if (row[col]) {
        whereClause[col] = row[col];
      }
    });

    const existingRecord = await sequelize.models[tableName].findOne({ where: whereClause });
    return existingRecord ? false : true;
  } catch (error) {
    console.error('Error al verificar fechas únicas:', error);
    return false;
  }
}

// Función para verificar si existe el registro en datos generales
async function verificarDatosGenerales(patente, numeroPedimento, claveSec) {
  try {
    const existe = await DatosGenerales.findOne({
      where: {
        Patente_Aduanal: patente,
        Numero_Pedimento: numeroPedimento,
        Clave_Sec_Aduanera_Despacho: claveSec
      }
    });
    return existe !== null;
  } catch (error) {
    console.error('Error al verificar datos generales:', error);
    return false;
  }
}

// Función para procesar datos en lotes
async function procesarLote(modelo, datos, tamanoLote = 100, duplicados) {
  try {
    console.log(`\n📦 Iniciando procesamiento de ${datos.length} registros para ${modelo.name}`);
    console.log(`⚙️ Tamaño de lote: ${tamanoLote}`);

    const lotes = [];
    for (let i = 0; i < datos.length; i += tamanoLote) {
      lotes.push(datos.slice(i, i + tamanoLote));
    }

    console.log(`📑 Total de lotes a procesar: ${lotes.length}`);
    let totalRegistrosProcesados = 0;

    for (let i = 0; i < lotes.length; i++) {
      const lote = lotes[i];
      console.log(`\n🔄 Procesando lote ${i + 1}/${lotes.length} para ${modelo.name}`);
      console.log(`📊 Registros en este lote: ${lote.length}`);

      const inicio = Date.now();

      // Insertar todos los registros sin verificar duplicados
      const resultado = await modelo.bulkCreate(lote, {
        ignoreDuplicates: false,
        validate: false,
        hooks: false,
        individualHooks: false,
        returning: false
      });
      
      totalRegistrosProcesados += resultado.length;
      
      const fin = Date.now();
      const porcentaje = ((i + 1) / lotes.length * 100).toFixed(2);
      console.log(`\n✅ Lote ${i + 1} completado en ${(fin - inicio) / 1000} segundos`);
      console.log(`📈 Progreso: ${porcentaje}%`);
      console.log(`📊 Resumen del lote:`);
      console.log(`   - Total: ${lote.length}`);
      console.log(`   - Procesados: ${resultado.length}`);
    }

    console.log(`\n🎉 Procesamiento completado para ${modelo.name}`);
    console.log(`📊 Resumen final:`);
    console.log(`   - Total de registros procesados: ${totalRegistrosProcesados}`);

    return { success: true, totalRegistrosProcesados, totalRegistrosIgnorados: 0 };
  } catch (error) {
    console.error(`\n❌ Error al procesar lote para ${modelo.name}:`, error);
    return { success: false, error };
  }
}

// Función para procesar datos en ambas tablas
async function procesarPartidasEnAmbasTablas(datos, tamanoLote = 100, duplicados) {
  try {
    console.log('\n🔄 Iniciando procesamiento simultáneo en ambas tablas');
    
    // Procesar en 551_Partidas
    const resultadoPartidas = await procesarLote(Partidas, datos, tamanoLote, duplicados);
    
    // Procesar en universo_immex
    const resultadoImmex = await procesarLote(UniversoImmex, datos, tamanoLote, duplicados);
    
    if (!resultadoPartidas.success || !resultadoImmex.success) {
      throw new Error('Error al procesar en alguna de las tablas');
    }
    
    return {
      success: true,
      totalRegistrosProcesados: resultadoPartidas.totalRegistrosProcesados,
      totalRegistrosIgnorados: 0
    };
  } catch (error) {
    console.error('\n❌ Error al procesar en ambas tablas:', error);
    return { success: false, error };
  }
}

// Modificar el endpoint de subida
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log('\n🚀 Iniciando proceso de carga de archivo');
    
    if (!req.file) {
      console.error('❌ No se ha subido ningún archivo');
      return res.status(400).send('No se ha subido ningún archivo.');
    }

    console.log('📁 Archivo recibido:', req.file.originalname);
    
    const zip = new AdmZip(req.file.path);
    const zipEntries = zip.getEntries();
    console.log(`📚 Número de archivos en el ZIP: ${zipEntries.length}`);

    const errores = [];
    const datosAInsertar = new Map();
    const duplicados = new Map();
    let totalRegistrosProcesados = 0;
    let totalRegistrosIgnorados = 0;

    // Primero recolectar todos los datos
    for (const zipEntry of zipEntries) {
      const fileName = zipEntry.entryName;
      const fileConfig = Object.entries(fileToTable).find(([key]) => fileName.endsWith(key));

      if (!fileConfig) {
        console.error(`No se encontró configuración para el archivo: ${fileName}`);
        continue;
      }

      const { tableName, columns } = fileConfig[1];
      const filePath = `uploads/${zipEntry.entryName}`;
      zip.extractEntryTo(zipEntry, 'uploads', false, true);

      const datos = [];
      await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(csvParser({ 
            separator: '|', 
            headers: columns,
            skipLines: 1
          }))
          .on('data', (row) => datos.push(row))
          .on('end', () => {
            fs.unlinkSync(filePath);
            resolve();
          })
          .on('error', reject);
      });

      datosAInsertar.set(tableName, datos);
    }

    // Procesar datos generales primero
    if (datosAInsertar.has('DatosGenerales')) {
      const resultado = await procesarLote(DatosGenerales, datosAInsertar.get('DatosGenerales'), 100, duplicados);
      if (!resultado.success) {
        errores.push('Error al procesar datos generales');
      } else {
        totalRegistrosProcesados += resultado.totalRegistrosProcesados;
        totalRegistrosIgnorados += resultado.totalRegistrosIgnorados;
      }
    }

    // Procesar el resto de las tablas
    for (const [tableName, datos] of datosAInsertar) {
      if (tableName === 'DatosGenerales') continue;

      if (tableName === 'Partidas') {
        // Procesar en ambas tablas
        const resultado = await procesarPartidasEnAmbasTablas(datos, 100, duplicados);
        if (!resultado.success) {
          errores.push('Error al procesar partidas');
        } else {
          totalRegistrosProcesados += resultado.totalRegistrosProcesados;
          totalRegistrosIgnorados += resultado.totalRegistrosIgnorados;
        }
      } else {
        const modelo = sequelize.models[tableName];
        if (!modelo) {
          errores.push(`Modelo no encontrado para ${tableName}`);
          continue;
        }

        const resultado = await procesarLote(modelo, datos, 100, duplicados);
        if (!resultado.success) {
          errores.push(`Error al procesar ${tableName}`);
        } else {
          totalRegistrosProcesados += resultado.totalRegistrosProcesados;
          totalRegistrosIgnorados += resultado.totalRegistrosIgnorados;
        }
      }
    }

    // Verificar Total_Fracciones
    const resumen = datosAInsertar.get('Resumen');
    if (resumen && resumen.length > 0) {
      const totalFraccionesCoincide = await verificarTotalFracciones(
        resumen[0].Folio,
        parseInt(resumen[0].Total_Fracciones)
      );
      
      if (!totalFraccionesCoincide) {
        errores.push('El Total_Fracciones no coincide con los datos procesados');
      }
    }

    res.status(200).json({
      mensaje: errores.length === 0 ? 'Archivo procesado con éxito' : 'Archivo procesado con advertencias',
      errores: errores,
      duplicados: Object.fromEntries(duplicados),
      duplicated: duplicados.size > 0,
      duplicatedFiles: Array.from(duplicados.entries()).map(([tabla, registros]) => ({
        tabla,
        registros: registros.map(registro => ({
          Patente_Aduanal: registro.Patente_Aduanal,
          Numero_Pedimento: registro.Numero_Pedimento,
          Clave_Sec_Aduanera_Despacho: registro.Clave_Sec_Aduanera_Despacho
        }))
      })),
      totalRegistros: Array.from(datosAInsertar.values()).reduce((acc, datos) => acc + datos.length, 0),
      registrosProcesados: totalRegistrosProcesados,
      registrosIgnorados: totalRegistrosIgnorados
    });
  } catch (error) {
    console.error('❌ Error al procesar el archivo:', error);
    res.status(500).json({
      error: 'Error al procesar el archivo',
      detalles: error.message
    });
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

app.get('/api/vista-general', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 50;
    const offset = (page - 1) * limit;

    // Obtener el total de registros
    const [totalResult] = await sequelize.query(
      'SELECT COUNT(*) as total FROM 501_datos_generales'
    );
    const total = totalResult[0].total;

    const [datosGenerales] = await sequelize.query(
      `SELECT * FROM 501_datos_generales LIMIT ${limit} OFFSET ${offset}`
    );
    
    const [transporteMercancias] = await sequelize.query(
      `SELECT * FROM 502_transporte_mercancias LIMIT ${limit} OFFSET ${offset}`
    );

    const [guias] = await sequelize.query(
      `SELECT * FROM 503_guias LIMIT ${limit} OFFSET ${offset}`
    );

    const [contenedores] = await sequelize.query(
      `SELECT * FROM 504_contenedores LIMIT ${limit} OFFSET ${offset}`
    );

    const [facturas] = await sequelize.query(
      `SELECT * FROM 505_facturas LIMIT ${limit} OFFSET ${offset}`
    );

    const [fechasPedimento] = await sequelize.query(
      `SELECT * FROM 506_fechas_pedimento LIMIT ${limit} OFFSET ${offset}`
    );

    const [casosPedimento] = await sequelize.query(
      `SELECT * FROM 507_casos_pedimento LIMIT ${limit} OFFSET ${offset}`
    );

    const [cuentasAduanerasGarantiaPedimento] = await sequelize.query(
      `SELECT * FROM 508_cuentas_aduaneras_garantia_pedimento LIMIT ${limit} OFFSET ${offset}`
    );

    const [tasasPedimento] = await sequelize.query(
      `SELECT * FROM 509_tasas_pedimento LIMIT ${limit} OFFSET ${offset}`
    );

    const [contribucionesPedimento] = await sequelize.query(
      `SELECT * FROM 510_contribuciones_pedimento LIMIT ${limit} OFFSET ${offset}`
    );

    const [observacionesPedimento] = await sequelize.query(
      `SELECT * FROM 511_observaciones_pedimento LIMIT ${limit} OFFSET ${offset}`
    );

    const [descargosMercancias] = await sequelize.query(
      `SELECT * FROM 512_descargos_mercancias LIMIT ${limit} OFFSET ${offset}`
    );

    const [destinatariosMercancia] = await sequelize.query(
      `SELECT * FROM 520_destinatarios_mercancia LIMIT ${limit} OFFSET ${offset}`
    );

    const [partidas] = await sequelize.query(
      `SELECT * FROM 551_partidas LIMIT ${limit} OFFSET ${offset}`
    );

    const [mercancias] = await sequelize.query(
      `SELECT * FROM 552_mercancias LIMIT ${limit} OFFSET ${offset}`
    );

    const [permisosPartida] = await sequelize.query(
      `SELECT * FROM 553_permiso_partida LIMIT ${limit} OFFSET ${offset}`
    );

    const [casosPartida] = await sequelize.query(
      `SELECT * FROM 554_casos_partida LIMIT ${limit} OFFSET ${offset}`
    );

    const [cuentasAduanerasGarantiaPartida] = await sequelize.query(
      `SELECT * FROM 555_cuentas_aduaneras_garantia_partida LIMIT ${limit} OFFSET ${offset}`
    );

    const [tasasContribucionesPartida] = await sequelize.query(
      `SELECT * FROM 556_tasas_contribuciones_partida LIMIT ${limit} OFFSET ${offset}`
    );

    const [contribucionesPartida] = await sequelize.query(
      `SELECT * FROM 557_contribuciones_partida LIMIT ${limit} OFFSET ${offset}`
    );

    const [observacionesPartida] = await sequelize.query(
      `SELECT * FROM 558_observaciones_partida LIMIT ${limit} OFFSET ${offset}`
    );

    const [rectificaciones] = await sequelize.query(
      `SELECT * FROM 701_rectificaciones LIMIT ${limit} OFFSET ${offset}`
    );

    const [diferenciasContribucionesPedimento] = await sequelize.query(
      `SELECT * FROM 702_diferencias_contribuciones_pedimento LIMIT ${limit} OFFSET ${offset}`
    );

    const [incidenciasReconocimientoAduanero] = await sequelize.query(
      `SELECT * FROM incidencias_reconocimiento_aduanero LIMIT ${limit} OFFSET ${offset}`
    );

    const [seleccionAutomatizada] = await sequelize.query(
      `SELECT * FROM seleccion_automatizada LIMIT ${limit} OFFSET ${offset}`
    );

    const [resumen] = await sequelize.query(
      `SELECT * FROM resumen LIMIT ${limit} OFFSET ${offset}`
    );

    const [universoImmex] = await sequelize.query(
      `SELECT * FROM universo_immex LIMIT ${limit} OFFSET ${offset}`
    );

    res.json({
      datosGenerales,
      transporteMercancias,
      guias,
      contenedores,
      facturas,
      fechasPedimento,
      casosPedimento,
      cuentasAduanerasGarantiaPedimento,
      tasasPedimento,
      contribucionesPedimento,
      observacionesPedimento,
      descargosMercancias,
      destinatariosMercancia,
      partidas,
      mercancias,
      permisosPartida,
      casosPartida,
      cuentasAduanerasGarantiaPartida,
      tasasContribucionesPartida,
      contribucionesPartida,
      observacionesPartida,
      rectificaciones,
      diferenciasContribucionesPedimento,
      incidenciasReconocimientoAduanero,
      seleccionAutomatizada,
      resumen,
      universoImmex,
      pagination: {
        page,
        limit,
        total
      }
    });
  } catch (error) {
    console.error('Error detallado:', error);
    res.status(500).json({ 
      error: 'Error al obtener datos', 
      message: error.message,
      details: error.stack 
    });
  }
});

app.post('/api/exportar-excel', async (req, res) => {
    try {
        const { fechaInicio, fechaFin, tablas } = req.body;

        if (!fechaInicio || !fechaFin || !tablas || !Array.isArray(tablas)) {
            return res.status(400).json({ error: 'Fechas y tablas son requeridas' });
        }

        const workbook = xlsx.utils.book_new();

        // Mapeo de nombres de tablas a nombres de hojas (más cortos)
        const nombreHojas = {
            '501_datos_generales': '501 - Datos Gen',
            '502_transporte_mercancias': '502 - Transp Merc',
            '503_guias': '503 - Guías',
            '504_contenedores': '504 - Contenedores',
            '505_facturas': '505 - Facturas',
            '506_fechas_pedimento': '506 - Fechas Ped',
            '507_casos_pedimento': '507 - Casos Ped',
            '508_cuentas_aduaneras_garantia_pedimento': '508 - Cuentas Adu',
            '509_tasas_pedimento': '509 - Tasas Ped',
            '510_contribuciones_pedimento': '510 - Contrib Ped',
            '511_observaciones_pedimento': '511 - Obs Ped',
            '512_descargos_mercancias': '512 - Descargos',
            '520_destinatarios_mercancia': '520 - Destinatarios',
            '551_partidas': '551 - Partidas',
            '552_mercancias': '552 - Mercancías',
            '553_permiso_partida': '553 - Permiso Part',
            '554_casos_partida': '554 - Casos Part',
            '555_cuentas_aduaneras_garantia_partida': '555 - Cuentas Part',
            '556_tasas_contribuciones_partida': '556 - Tasas Part',
            '557_contribuciones_partida': '557 - Contrib Part',
            '558_observaciones_partida': '558 - Obs Part',
            '701_rectificaciones': '701 - Rectificaciones',
            '702_diferencias_contribuciones_pedimento': '702 - Dif Contrib',
            'incidencias_reconocimiento_aduanero': 'Incidencias',
            'seleccion_automatizada': 'Selección Auto',
            'resumen': 'Resumen'
        };

        // Lista de todas las tablas disponibles en la base de datos
        const todasLasTablas = [
            '501_datos_generales',
            '502_transporte_mercancias',
            '503_guias',
            '504_contenedores',
            '505_facturas',
            '506_fechas_pedimento',
            '507_casos_pedimento',
            '508_cuentas_aduaneras_garantia_pedimento',
            '509_tasas_pedimento',
            '510_contribuciones_pedimento',
            '511_observaciones_pedimento',
            '512_descargos_mercancias',
            '520_destinatarios_mercancia',
            '551_partidas',
            '552_mercancias',
            '553_permiso_partida',
            '554_casos_partida',
            '555_cuentas_aduaneras_garantia_partida',
            '556_tasas_contribuciones_partida',
            '557_contribuciones_partida',
            '558_observaciones_partida',
            '701_rectificaciones',
            '702_diferencias_contribuciones_pedimento',
            'incidencias_reconocimiento_aduanero',
            'seleccion_automatizada',
            'resumen'
        ];

        // Verificar la conexión a la base de datos
        try {
            await sequelize.authenticate();
            console.log('✅ Conexión a la base de datos verificada');
        } catch (error) {
            console.error('❌ Error al conectar con la base de datos:', error);
            return res.status(500).json({ error: 'Error al conectar con la base de datos' });
        }

        // Procesar todas las tablas disponibles
        for (const tabla of todasLasTablas) {
            try {
                if (!nombreHojas[tabla]) {
                    console.warn(`Tabla ${tabla} no encontrada en la configuración`);
                    continue;
                }

                // Verificar si la tabla existe
                const [tableExists] = await sequelize.query(
                    `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = '${sequelize.config.database}' AND table_name = '${tabla}'`
                );

                if (tableExists[0].count === 0) {
                    console.warn(`❌ La tabla ${tabla} no existe en la base de datos`);
                    continue;
                }

                // Consulta para obtener todos los datos de la tabla
                const query = `SELECT * FROM ${tabla}`;

                console.log(`\n🔍 Consultando tabla ${tabla}`);
                console.log(`📝 Query: ${query}`);

                const [rows] = await sequelize.query(query);
                
                // Asegurarse de que rows sea un array
                const data = Array.isArray(rows) ? rows : [];

                // Crear una hoja de Excel
                const worksheet = xlsx.utils.json_to_sheet(data);
                xlsx.utils.book_append_sheet(workbook, worksheet, nombreHojas[tabla]);

                if (data.length > 0) {
                    console.log(`✅ Encontrados ${data.length} registros en ${tabla}`);
                    // Mostrar un ejemplo de los datos
                    console.log(`📊 Ejemplo de datos:`, JSON.stringify(data[0], null, 2));
                } else {
                    console.log(`⚠️ No se encontraron registros en ${tabla}`);
                }
            } catch (error) {
                console.error(`❌ Error al procesar tabla ${tabla}:`, error);
                // Crear una hoja vacía en caso de error
                const worksheet = xlsx.utils.json_to_sheet([]);
                xlsx.utils.book_append_sheet(workbook, worksheet, nombreHojas[tabla]);
            }
        }

        // Generar el archivo Excel
        const buffer = xlsx.write(workbook, { 
            type: 'buffer', 
            bookType: 'xlsx',
            compression: true
        });

        // Configurar los headers para la descarga
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename=reporte_completo.xlsx`);

        // Enviar el archivo
        res.send(buffer);
    } catch (error) {
        console.error('❌ Error al exportar a Excel:', error);
        res.status(500).json({ 
            error: 'Error al generar el archivo Excel',
            message: error.message,
            details: error.stack
        });
    }
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
}); 