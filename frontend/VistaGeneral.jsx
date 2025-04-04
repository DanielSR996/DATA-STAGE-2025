    import React, { useState, useEffect, useMemo } from 'react';
    import { useTable } from 'react-table';
    import { FaSearch } from 'react-icons/fa';
    import { 
        Table, 
        TableBody, 
        TableCell, 
        TableContainer, 
        TableHead, 
        TableRow, 
        Paper,
        Tooltip,
        Box,
        Container,
        Typography,
        AppBar,
        Toolbar,
        Dialog,
        DialogTitle,
        DialogContent,
        DialogActions,
        List,
        ListItem,
        ListItemButton,
        ListItemIcon,
        ListItemText,
        Button,
        IconButton,
        Backdrop,
        CircularProgress
    } from '@mui/material';
    import CloseIcon from '@mui/icons-material/Close';
    import Checkbox from '@mui/material/Checkbox';
    import FileDownloadIcon from '@mui/icons-material/FileDownload';

    function VistaGeneral() {
        const [datosGenerales, setDatosGenerales] = useState([]);
        const [transporteMercancias, setTransporteMercancias] = useState([]);
        const [guias, setGuias] = useState([]);
        const [contenedores, setContenedores] = useState([]);
        const [facturas, setFacturas] = useState([]);
        const [fechasPedimento, setFechasPedimento] = useState([]);
        const [casosPedimento, setCasosPedimento] = useState([]);
        const [cuentasAduanerasGarantiaPedimento, setCuentasAduanerasGarantiaPedimento] = useState([]);
        const [tasasPedimento, setTasasPedimento] = useState([]);
        const [contribucionesPedimento, setContribucionesPedimento] = useState([]);
        const [observacionesPedimento, setObservacionesPedimento] = useState([]);
        const [descargosMercancias, setDescargosMercancias] = useState([]);
        const [destinatariosMercancia, setDestinatariosMercancia] = useState([]);
        const [partidas, setPartidas] = useState([]);
        const [mercancias, setMercancias] = useState([]);
        const [permisosPartida, setPermisosPartida] = useState([]);
        const [casosPartida, setCasosPartida] = useState([]);
        const [cuentasAduanerasGarantiaPartida, setCuentasAduanerasGarantiaPartida] = useState([]);
        const [tasasContribucionesPartida, setTasasContribucionesPartida] = useState([]);
        const [contribucionesPartida, setContribucionesPartida] = useState([]);
        const [observacionesPartida, setObservacionesPartida] = useState([]);
        const [rectificaciones, setRectificaciones] = useState([]);
        const [diferenciasContribucionesPedimento, setDiferenciasContribucionesPedimento] = useState([]);
        const [incidenciasReconocimientoAduanero, setIncidenciasReconocimientoAduanero] = useState([]);
        const [seleccionAutomatizada, setSeleccionAutomatizada] = useState([]);
        const [resumen, setResumen] = useState([]);
        const [activeTab, setActiveTab] = useState('datosGenerales');
        const [busqueda, setBusqueda] = useState('');
        const [columnOrder, setColumnOrder] = useState([]);
        const [showFloatingHeader, setShowFloatingHeader] = useState(false);
        const [fechaInicio, setFechaInicio] = useState('');
        const [fechaFin, setFechaFin] = useState('');
        const [identificadoresPedimento, setIdentificadoresPedimento] = useState([]);
        const [selectedFields, setSelectedFields] = useState({});
        const [showFieldSelector, setShowFieldSelector] = useState(false);
        const [universoImmex, setUniversoImmex] = useState([]);
        const [sortConfig, setSortConfig] = useState({
            key: null,
            direction: 'asc'
        });
        const [page, setPage] = useState(1);
        const [hasMore, setHasMore] = useState(true);
        const [isLoading, setIsLoading] = useState(false);
        const [totalRecords, setTotalRecords] = useState(0);
        const [cargandoExcel, setCargandoExcel] = useState(false);

        const [tablasSeleccionadas, setTablasSeleccionadas] = useState([
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
        ]);

        const [dialogoExportarAbierto, setDialogoExportarAbierto] = useState(false);

        const handleToggleTabla = (tabla) => {
            setTablasSeleccionadas(prev => 
                prev.includes(tabla) 
                    ? prev.filter(t => t !== tabla)
                    : [...prev, tabla]
            );
        };

        const handleToggleTodasTablas = () => {
            setTablasSeleccionadas(prev => 
                prev.length === 26 
                    ? [] 
                    : [
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
                    ]
            );
        };

        const exportarAExcel = async () => {
            if (!fechaInicio || !fechaFin) {
                alert('Por favor seleccione un rango de fechas');
                return;
            }

            if (tablasSeleccionadas.length === 0) {
                alert('Por favor seleccione al menos una tabla para exportar');
                return;
            }

            setCargandoExcel(true);

            try {
                const response = await fetch('http://localhost:3000/api/exportar-excel', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fechaInicio,
                        fechaFin,
                        tablas: tablasSeleccionadas
                    })
                });

                if (!response.ok) {
                    throw new Error('Error al exportar a Excel');
                }

                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `reporte_${fechaInicio}_${fechaFin}.xlsx`;
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
            } catch (error) {
                console.error('Error:', error);
                alert('Error al exportar a Excel: ' + error.message);
            } finally {
                setCargandoExcel(false);
                setDialogoExportarAbierto(false);
            }
        };

        // Definir las columnas a nivel de componente
        const datosGeneralesColumns = [
            { 
                Header: 'Patente Aduanal', 
                accessor: 'Patente_Aduanal',
                width: 100
            },
            { 
                Header: 'Número Pedimento', 
                accessor: 'Numero_Pedimento',
                width: 120
            },
            { 
                Header: 'Clave Sec Aduanera Despacho', 
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 150
            },
            { 
                Header: 'Clave Tipo Operación', 
                accessor: 'Clave_Tipo_Operacion',
                width: 80
            },
            { 
                Header: 'Clave Documento', 
                accessor: 'Clave_Documento',
                width: 80
            },
            { Header: 'Clave Sec Aduanera Entrada', accessor: 'Clave_Sec_Aduanera_Entrada' },
            { Header: 'CURP Contribuyente', accessor: 'CURP_Contribuyente' },
            { Header: 'RFC Contribuyente', accessor: 'RFC_Contribuyente' },
            { Header: 'CURP Agente Aduanal', accessor: 'CURP_Agente_Aduanal' },
            { Header: 'Tipo Cambio', accessor: 'Tipo_Cambio' },
            { Header: 'Total Fletes', accessor: 'Total_Fletes' },
            { Header: 'Total Seguros', accessor: 'Total_Seguros' },
            { Header: 'Total Embalajes', accessor: 'Total_Embalajes' },
            { Header: 'Total Otros Incrementables', accessor: 'Total_Otros_Incrementables' },
            { Header: 'Total Otros Deducibles', accessor: 'Total_Otros_Deducibles' },
            { Header: 'Peso Bruto Mercancía', accessor: 'Peso_Bruto_Mercancia' },
            { Header: 'Clave Medio Transporte Salida', accessor: 'Clave_Medio_Transporte_Salida' },
            { Header: 'Clave Medio Transporte Arribo', accessor: 'Clave_Medio_Transporte_Arribo' },
            { Header: 'Clave Medio Transporte Entrada Salida', accessor: 'Clave_Medio_Transporte_Entrada_Salida' },
            { Header: 'Clave Destino Mercancía', accessor: 'Clave_Destino_Mercancia' },
            { Header: 'Nombre Contribuyente', accessor: 'Nombre_Contribuyente' },
            { Header: 'Calle Domicilio Contribuyente', accessor: 'Calle_Domicilio_Contribuyente' },
            { Header: 'Número Interior Domicilio Contribuyente', accessor: 'Numero_Interior_Domicilio_Contribuyente' },
            { Header: 'Número Exterior Domicilio Contribuyente', accessor: 'Numero_Exterior_Domicilio_Contribuyente' },
            { Header: 'Código Postal Domicilio Contribuyente', accessor: 'Codigo_Postal_Domicilio_Contribuyente' },
            { Header: 'Municipio Ciudad Domicilio Contribuyente', accessor: 'Municipio_Ciudad_Domicilio_Contribuyente' },
            { Header: 'Clave Entidad Federativa Domicilio Contribuyente', accessor: 'Clave_Entidad_Federativa_Domicilio_Contribuyente' },
            { Header: 'Clave País Domicilio Contribuyente', accessor: 'Clave_Pais_Domicilio_Contribuyente' },
            { Header: 'Clave Tipo Pedimento', accessor: 'Clave_Tipo_Pedimento' },
            { Header: 'Fecha Recepción', accessor: 'Fecha_Recepcion' },
            { Header: 'Fecha Pago Real', accessor: 'Fecha_Pago_Real' }
        ];

        const transporteColumns = [
            { Header: 'Patente Aduanal', accessor: 'Patente_Aduanal' },
            { Header: 'Número Pedimento', accessor: 'Numero_Pedimento' },
            { Header: 'Clave Sec Aduanera Despacho', accessor: 'Clave_Sec_Aduanera_Despacho' },
            { Header: 'RFC Transportista', accessor: 'RFC_Transportista' },
            { Header: 'CURP Transportista', accessor: 'CURP_Transportista' },
            { Header: 'Nombre Razón Social Transportista', accessor: 'Nombre_Razon_Social_Transportista' },
            { Header: 'Clave País Transporte', accessor: 'Clave_Pais_Transporte' },
            { Header: 'Identificador Transporte', accessor: 'Identificador_Transporte' },
            { Header: 'Fecha Pago Real', accessor: 'Fecha_Pago_Real' }
        ];

        const contenedoresColumns = [
            { 
                Header: 'Patente Aduanal', 
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento', 
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho', 
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Número Contenedor', 
                accessor: 'Numero_Contenedor',
                width: 150
            },
            { 
                Header: 'Clave Tipo Contenedor', 
                accessor: 'Clave_Tipo_Contenedor',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real', 
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 150
            }
        ];

        const facturasColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fecha Facturación',
                accessor: 'Fecha_Facturacion',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 150
            },
            { 
                Header: 'Número Factura',
                accessor: 'Numero_Factura',
                width: 150
            },
            { 
                Header: 'Clave Término Facturación',
                accessor: 'Clave_Termino_Facturacion',
                width: 150
            },
            { 
                Header: 'Clave Moneda Facturación',
                accessor: 'Clave_Moneda_Facturacion',
                width: 150
            },
            { 
                Header: 'Valor Dólares',
                accessor: 'Valor_Dolares',
                width: 120
            },
            { 
                Header: 'Valor Moneda Extranjera',
                accessor: 'Valor_Moneda_Extranjera',
                width: 150
            },
            { 
                Header: 'País Facturación',
                accessor: 'Clave_Pais_Facturacion',
                width: 120
            },
            { 
                Header: 'Entidad Federativa Facturación',
                accessor: 'Clave_Entidad_Federativa_Facturacion',
                width: 200
            },
            { 
                Header: 'ID Fiscal Proveedor',
                accessor: 'Identificacion_Fiscal_Proveedor',
                width: 150
            },
            { 
                Header: 'Proveedor Mercancía',
                accessor: 'Proveedor_Mercancia',
                width: 200
            },
            { 
                Header: 'Calle Proveedor',
                accessor: 'Calle_Domicilio_Proveedor',
                width: 200
            },
            { 
                Header: 'Número Interior Proveedor',
                accessor: 'Numero_Interior_Domicilio_Proveedor',
                width: 150
            },
            { 
                Header: 'Número Exterior Proveedor',
                accessor: 'Numero_Exterior_Domicilio_Proveedor',
                width: 150
            },
            { 
                Header: 'CP Proveedor',
                accessor: 'Codigo_Postal_Domicilio_Proveedor',
                width: 120
            },
            { 
                Header: 'Municipio/Ciudad Proveedor',
                accessor: 'Municipio_Ciudad_Domicilio_Proveedor',
                width: 200
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 150
            }
        ];

        const fechasPedimentoColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Clave Tipo Fecha',
                accessor: 'Clave_Tipo_Fecha',
                width: 150
            },
            { 
                Header: 'Fecha Operación',
                accessor: 'Fecha_Operacion',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            },
            { 
                Header: 'Fecha Validación/Pago Real',
                accessor: 'Fecha_Validacion_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const casosPedimentoColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Clave Caso',
                accessor: 'Clave_Caso',
                width: 120
            },
            { 
                Header: 'Identificador Caso',
                accessor: 'Identificador_Caso',
                width: 150
            },
            { 
                Header: 'Clave Tipo Pedimento',
                accessor: 'Clave_Tipo_Pedimento',
                width: 150
            },
            { 
                Header: 'Complemento Caso',
                accessor: 'Complemento_Caso',
                width: 150
            },
            { 
                Header: 'Fecha Validación/Pago Real',
                accessor: 'Fecha_Validacion_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const cuentasAduanerasGarantiaPedimentoColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Clave Institución Emisor',
                accessor: 'Clave_Institucion_Emisor',
                width: 150
            },
            { 
                Header: 'Número Cuenta',
                accessor: 'Numero_Cuenta',
                width: 150
            },
            { 
                Header: 'Folio Constancia',
                accessor: 'Folio_Constancia',
                width: 150
            },
            { 
                Header: 'Fecha Constancia',
                accessor: 'Fecha_Constancia',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            },
            { 
                Header: 'Clave Tipo Cuenta',
                accessor: 'Clave_Tipo_Cuenta',
                width: 150
            },
            { 
                Header: 'Clave Garantía',
                accessor: 'Clave_Garantia',
                width: 150
            },
            { 
                Header: 'Valor Unitario Título',
                accessor: 'Valor_Unitario_Titulo',
                width: 150
            },
            { 
                Header: 'Total Garantía',
                accessor: 'Total_Garantia',
                width: 150
            },
            { 
                Header: 'Cantidad Unidades Medida Precio Estimado',
                accessor: 'Cantidad_Unidades_Medida_Precio_Estimado',
                width: 250
            },
            { 
                Header: 'Títulos Asignados',
                accessor: 'Titulos_Asignados',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const tasasPedimentoColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Clave Contribución',
                accessor: 'Clave_Contribucion',
                width: 150
            },
            { 
                Header: 'Tasa Contribución',
                accessor: 'Tasa_Contribucion',
                width: 150
            },
            { 
                Header: 'Clave Tipo Tasa',
                accessor: 'Clave_Tipo_Tasa',
                width: 150
            },
            { 
                Header: 'Clave Tipo Pedimento',
                accessor: 'Clave_Tipo_Pedimento',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const contribucionesPedimentoColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Clave Contribución',
                accessor: 'Clave_Contribucion',
                width: 150
            },
            { 
                Header: 'Clave Forma Pago',
                accessor: 'Clave_Forma_Pago',
                width: 120
            },
            { 
                Header: 'Importe Pago',
                accessor: 'Importe_Pago',
                width: 150
            },
            { 
                Header: 'Clave Tipo Pedimento',
                accessor: 'Clave_Tipo_Pedimento',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const observacionesPedimentoColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Secuencia Observación',
                accessor: 'Secuencia_Observacion',
                width: 150
            },
            { 
                Header: 'Observaciones',
                accessor: 'Observaciones',
                width: 500,
                Cell: ({ value }) => (
                    <div style={{ 
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        minWidth: '500px',
                        maxWidth: '500px'
                    }}>
                        {value}
                    </div>
                )
            },
            { 
                Header: 'Fecha Validación/Pago Real',
                accessor: 'Fecha_Validacion_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const descargosMercanciasColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Patente Aduanal Original',
                accessor: 'Patente_Aduanal_Original',
                width: 150
            },
            { 
                Header: 'Número Pedimento Original',
                accessor: 'Numero_Pedimento_Original',
                width: 180
            },
            { 
                Header: 'Clave Sec Aduanera Despacho Original',
                accessor: 'Clave_Sec_Aduanera_Despacho_Original',
                width: 250
            },
            { 
                Header: 'Clave Documento Original',
                accessor: 'Clave_Documento_Original',
                width: 180
            },
            { 
                Header: 'Fecha Operación Original',
                accessor: 'Fecha_Operacion_Original',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            },
            { 
                Header: 'Fracción Arancelaria Original',
                accessor: 'Fraccion_Arancelaria_Original',
                width: 200
            },
            { 
                Header: 'Clave Unidad Medida Original',
                accessor: 'Clave_Unidad_Medida_Original',
                width: 200
            },
            { 
                Header: 'Cantidad Mercancía Descargada',
                accessor: 'Cantidad_Mercancia_Descargada',
                width: 200
            },
            { 
                Header: 'Clave Tipo Pedimento',
                accessor: 'Clave_Tipo_Pedimento',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const destinatariosMercanciaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'ID Fiscal Destinatario',
                accessor: 'Identificacion_Fiscal_Destinatario',
                width: 150
            },
            { 
                Header: 'Nombre Destinatario',
                accessor: 'Nombre_Destinatario',
                width: 300,
                Cell: ({ value }) => (
                    <div style={{ 
                        whiteSpace: 'normal',
                        wordBreak: 'break-word'
                    }}>
                        {value}
                    </div>
                )
            },
            { 
                Header: 'Calle Domicilio',
                accessor: 'Calle_Domicilio_Destinatario',
                width: 250
            },
            { 
                Header: 'Número Interior',
                accessor: 'Numero_Interior_Domicilio_Destinatario',
                width: 120
            },
            { 
                Header: 'Número Exterior',
                accessor: 'Numero_Exterior_Domicilio_Destinatario',
                width: 120
            },
            { 
                Header: 'Código Postal',
                accessor: 'Codigo_Postal_Domicilio_Destinatario',
                width: 120
            },
            { 
                Header: 'Municipio/Ciudad',
                accessor: 'Municipio_Ciudad_Domicilio_Destinatario',
                width: 200
            },
            { 
                Header: 'País',
                accessor: 'Clave_Pais_Domicilio_Destinatario',
                width: 120
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const partidasColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Subdivisión Fracción',
                accessor: 'Subdivision_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Descripción Mercancía',
                accessor: 'Descripcion_Mercancia',
                width: 300,
                Cell: ({ value }) => (
                    <div style={{ 
                        whiteSpace: 'normal',
                        wordBreak: 'break-word'
                    }}>
                        {value}
                    </div>
                )
            },
            { 
                Header: 'Precio Unitario',
                accessor: 'Precio_Unitario',
                width: 120
            },
            { 
                Header: 'Valor Aduana',
                accessor: 'Valor_Aduana',
                width: 120
            },
            { 
                Header: 'Valor Comercial',
                accessor: 'Valor_Comercial',
                width: 120
            },
            { 
                Header: 'Valor Dólares',
                accessor: 'Valor_Dolares',
                width: 120
            },
            { 
                Header: 'Cantidad Mercancías',
                accessor: 'Cantidad_Mercancias_Unidad_Medida_Comercial',
                width: 150
            },
            { 
                Header: 'Unidad Medida Comercial',
                accessor: 'Clave_Unidad_Medida_Comercial',
                width: 180
            },
            { 
                Header: 'Cantidad Mercancía Tarifa',
                accessor: 'Cantidad_Mercancia_Unidad_Medida_Tarifa',
                width: 180
            },
            { 
                Header: 'Unidad Medida Tarifa',
                accessor: 'Clave_Unidad_Medida_Tarifa',
                width: 150
            },
            { 
                Header: 'Valor Agregado',
                accessor: 'Valor_Agregado',
                width: 120
            },
            { 
                Header: 'Vinculación',
                accessor: 'Clave_Vinculacion',
                width: 120
            },
            { 
                Header: 'Método Valorización',
                accessor: 'Clave_Metodo_Valorizacion',
                width: 150
            },
            { 
                Header: 'Código Producto',
                accessor: 'Codigo_Mercancia_Producto',
                width: 150
            },
            { 
                Header: 'Marca',
                accessor: 'Marca_Mercancia_Producto',
                width: 150
            },
            { 
                Header: 'Modelo',
                accessor: 'Modelo_Mercancia_Producto',
                width: 150
            },
            { 
                Header: 'País Origen/Destino',
                accessor: 'Clave_Pais_Origen_Destino',
                width: 150
            },
            { 
                Header: 'País Comprador/Vendedor',
                accessor: 'Clave_Pais_Comprador_Vendedor',
                width: 180
            },
            { 
                Header: 'Entidad Fed. Origen',
                accessor: 'Clave_Entidad_Federativa_Origen',
                width: 150
            },
            { 
                Header: 'Entidad Fed. Destino',
                accessor: 'Clave_Entidad_Federativa_Destino',
                width: 150
            },
            { 
                Header: 'Entidad Fed. Comprador',
                accessor: 'Clave_Entidad_Federativa_Comprador',
                width: 180
            },
            { 
                Header: 'Entidad Fed. Vendedor',
                accessor: 'Clave_Entidad_Federativa_Vendedor',
                width: 180
            },
            { 
                Header: 'Tipo Operación',
                accessor: 'Clave_Tipo_Operacion',
                width: 120
            },
            { 
                Header: 'Documento',
                accessor: 'Clave_Documento',
                width: 120
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const mercanciasColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'VIN/Número Serie',
                accessor: 'VIN_Numero_Serie',
                width: 180
            },
            { 
                Header: 'Kilometraje Vehículo',
                accessor: 'Kilometraje_Vehiculo',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const permisosPartidaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Clave Permiso',
                accessor: 'Clave_Permiso',
                width: 120
            },
            { 
                Header: 'Número Permiso',
                accessor: 'Numero_Permiso',
                width: 150
            },
            { 
                Header: 'Firma Descargo',
                accessor: 'Firma_Descargo',
                width: 150
            },
            { 
                Header: 'Valor Comercial Dólares',
                accessor: 'Valor_Comercial_Dolares',
                width: 150
            },
            { 
                Header: 'Cantidad Unidad Medida Tarifa',
                accessor: 'Cantidad_Mercancia_Unidades_Medida_Tarifa',
                width: 200
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const casosPartidaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Clave Caso',
                accessor: 'Clave_Caso',
                width: 120
            },
            { 
                Header: 'Identificador Caso',
                accessor: 'Identificador_Caso',
                width: 150
            },
            { 
                Header: 'Complemento Caso',
                accessor: 'Complemento_Caso',
                width: 200
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const cuentasAduanerasGarantiaPartidaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Clave Institución Emisor',
                accessor: 'Clave_Institucion_Emisor',
                width: 180
            },
            { 
                Header: 'Número Cuenta',
                accessor: 'Numero_Cuenta',
                width: 150
            },
            { 
                Header: 'Folio Constancia',
                accessor: 'Folio_Constancia',
                width: 150
            },
            { 
                Header: 'Fecha Constancia',
                accessor: 'Fecha_Constancia',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 150
            },
            { 
                Header: 'Clave Garantía',
                accessor: 'Clave_Garantia',
                width: 120
            },
            { 
                Header: 'Valor Unitario Título',
                accessor: 'Valor_Unitario_Titulo',
                width: 150
            },
            { 
                Header: 'Total Garantía',
                accessor: 'Total_Garantia',
                width: 150
            },
            { 
                Header: 'Cantidad Unidades Precio Estimado',
                accessor: 'Cantidad_Unidades_Medida_Precio_Estimado',
                width: 250
            },
            { 
                Header: 'Títulos Asignados',
                accessor: 'Titulos_Asignados',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const tasasContribucionesPartidaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Clave Contribución',
                accessor: 'Clave_Contribucion',
                width: 150
            },
            { 
                Header: 'Tasa Contribución',
                accessor: 'Tasa_Contribucion',
                width: 150
            },
            { 
                Header: 'Clave Tipo Tasa',
                accessor: 'Clave_Tipo_Tasa',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const contribucionesPartidaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Clave Contribución',
                accessor: 'Clave_Contribucion',
                width: 150
            },
            { 
                Header: 'Clave Forma Pago',
                accessor: 'Clave_Forma_Pago',
                width: 150
            },
            { 
                Header: 'Importe Pago',
                accessor: 'Importe_Pago',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const observacionesPartidaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Observación',
                accessor: 'Secuencia_Observacion',
                width: 150
            },
            { 
                Header: 'Observaciones',
                accessor: 'Observaciones',
                width: 500,
                Cell: ({ value }) => (
                    <div style={{ 
                        whiteSpace: 'normal',
                        wordBreak: 'break-word'
                    }}>
                        {value}
                    </div>
                )
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const rectificacionesColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Clave Documento',
                accessor: 'Clave_Documento',
                width: 150
            },
            { 
                Header: 'Fecha Pago',
                accessor: 'Fecha_Pago',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 150
            },
            { 
                Header: 'Número Pedimento Anterior',
                accessor: 'Numero_Pedimento_Anterior',
                width: 180
            },
            { 
                Header: 'Patente Aduanal Anterior',
                accessor: 'Patente_Aduanal_Anterior',
                width: 180
            },
            { 
                Header: 'Clave Sec Aduanera Anterior',
                accessor: 'Clave_Sec_Aduanera_Despacho_Anterior',
                width: 200
            },
            { 
                Header: 'Clave Documento Anterior',
                accessor: 'Clave_Documento_Anterior',
                width: 180
            },
            { 
                Header: 'Fecha Operación Anterior',
                accessor: 'Fecha_Operacion_Anterior',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 180
            },
            { 
                Header: 'Número Pedimento Original',
                accessor: 'Numero_Pedimento_Original',
                width: 180
            },
            { 
                Header: 'Patente Aduanal Original',
                accessor: 'Patente_Aduanal_Original',
                width: 180
            },
            { 
                Header: 'Clave Sec Aduanera Original',
                accessor: 'Clave_Sec_Aduanera_Despacho_Original',
                width: 200
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const diferenciasContribucionesPedimentoColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Clave Contribución',
                accessor: 'Clave_Contribucion',
                width: 150
            },
            { 
                Header: 'Clave Forma Pago',
                accessor: 'Clave_Forma_Pago',
                width: 150
            },
            { 
                Header: 'Importe Pago',
                accessor: 'Importe_Pago',
                width: 150
            },
            { 
                Header: 'Clave Tipo Pedimento',
                accessor: 'Clave_Tipo_Pedimento',
                width: 150
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        const incidenciasReconocimientoAduaneroColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Consecutivo Remesa',
                accessor: 'Consecutivo_Remesa',
                width: 150
            },
            { 
                Header: 'Número Selección Automatizada',
                accessor: 'Numero_Seleccion_Automatizada',
                width: 200
            },
            { 
                Header: 'Fecha Inicio Reconocimiento',
                accessor: 'Fecha_Inicio_Reconocimiento',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 180
            },
            { 
                Header: 'Hora Inicio Reconocimiento',
                accessor: 'Hora_Inicio_Reconocimiento',
                width: 180
            },
            { 
                Header: 'Fecha Fin Reconocimiento',
                accessor: 'Fecha_Fin_Reconocimiento',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 180
            },
            { 
                Header: 'Hora Fin Reconocimiento',
                accessor: 'Hora_Fin_Reconocimiento',
                width: 180
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Clave Documento',
                accessor: 'Clave_Documento',
                width: 150
            },
            { 
                Header: 'Clave Tipo Operación',
                accessor: 'Clave_Tipo_Operacion',
                width: 150
            },
            { 
                Header: 'Grado Incidencia',
                accessor: 'Grado_Incidencia',
                width: 150
            },
            { 
                Header: 'Fecha Selección Automatizada',
                accessor: 'Fecha_Seleccion_Automatizada',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 200
            }
        ];

        const resumenColumns = [
            { 
                Header: 'Folio',
                accessor: 'Folio_Primaria',
                width: 120
            },
            { 
                Header: 'RFC/Patente Aduanal',
                accessor: 'RFCoPatenteAduanal',
                width: 150
            },
            { 
                Header: 'Fecha Inicial',
                accessor: 'Fecha_Inicial',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 150
            },
            { 
                Header: 'Fecha Final',
                accessor: 'Fecha_Final',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 150
            },
            { 
                Header: 'Fecha Ejecución',
                accessor: 'Fecha_Ejecucion',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 150
            },
            { 
                Header: 'Total Fracciones',
                accessor: 'Total_Fracciones',
                width: 150
            },
            { 
                Header: 'Total Contribuciones',
                accessor: 'Total_Contribuciones',
                width: 150
            }
        ];

        const seleccionAutomatizadaColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Consecutivo Remesa',
                accessor: 'Consecutivo_Remesa',
                width: 150
            },
            { 
                Header: 'Número Selección Automatizada',
                accessor: 'Numero_Seleccion_Automatizada',
                width: 200
            },
            { 
                Header: 'Fecha Selección Automatizada',
                accessor: 'Fecha_Seleccion_Automatizada',
                Cell: ({ value }) => value ? new Date(value).toLocaleDateString() : '-',
                width: 200
            },
            { 
                Header: 'Hora Selección Automatizada',
                accessor: 'Hora_Seleccion_Automatizada',
                width: 200
            },
            { 
                Header: 'Semáforo Fiscal',
                accessor: 'Semaforo_Fiscal',
                width: 150
            },
            { 
                Header: 'Clave Documento',
                accessor: 'Clave_Documento',
                width: 150
            },
            { 
                Header: 'Clave Tipo Operación',
                accessor: 'Clave_Tipo_Operacion',
                width: 150
            }
        ];

        const universoImmexColumns = [
            { 
                Header: 'Patente Aduanal',
                accessor: 'Patente_Aduanal',
                width: 120
            },
            { 
                Header: 'Número Pedimento',
                accessor: 'Numero_Pedimento',
                width: 150
            },
            { 
                Header: 'Clave Sec Aduanera Despacho',
                accessor: 'Clave_Sec_Aduanera_Despacho',
                width: 200
            },
            { 
                Header: 'Fracción Arancelaria',
                accessor: 'Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Secuencia Fracción',
                accessor: 'Secuencia_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Subdivisión Fracción',
                accessor: 'Subdivision_Fraccion_Arancelaria',
                width: 150
            },
            { 
                Header: 'Descripción Mercancía',
                accessor: 'Descripcion_Mercancia',
                width: 300,
                Cell: ({ value }) => (
                    <div style={{ 
                        whiteSpace: 'normal',
                        wordBreak: 'break-word'
                    }}>
                        {value}
                    </div>
                )
            },
            { 
                Header: 'Precio Unitario',
                accessor: 'Precio_Unitario',
                width: 120
            },
            { 
                Header: 'Valor Aduana',
                accessor: 'Valor_Aduana',
                width: 120
            },
            { 
                Header: 'Valor Comercial',
                accessor: 'Valor_Comercial',
                width: 120
            },
            { 
                Header: 'Valor Dólares',
                accessor: 'Valor_Dolares',
                width: 120
            },
            { 
                Header: 'Cantidad Mercancías',
                accessor: 'Cantidad_Mercancias_Unidad_Medida_Comercial',
                width: 150
            },
            { 
                Header: 'Unidad Medida Comercial',
                accessor: 'Clave_Unidad_Medida_Comercial',
                width: 180
            },
            { 
                Header: 'Cantidad Mercancía Tarifa',
                accessor: 'Cantidad_Mercancia_Unidad_Medida_Tarifa',
                width: 180
            },
            { 
                Header: 'Unidad Medida Tarifa',
                accessor: 'Clave_Unidad_Medida_Tarifa',
                width: 150
            },
            { 
                Header: 'Valor Agregado',
                accessor: 'Valor_Agregado',
                width: 120
            },
            { 
                Header: 'Vinculación',
                accessor: 'Clave_Vinculacion',
                width: 120
            },
            { 
                Header: 'Método Valorización',
                accessor: 'Clave_Metodo_Valorizacion',
                width: 150
            },
            { 
                Header: 'Código Producto',
                accessor: 'Codigo_Mercancia_Producto',
                width: 150
            },
            { 
                Header: 'Marca',
                accessor: 'Marca_Mercancia_Producto',
                width: 150
            },
            { 
                Header: 'Modelo',
                accessor: 'Modelo_Mercancia_Producto',
                width: 150
            },
            { 
                Header: 'País Origen/Destino',
                accessor: 'Clave_Pais_Origen_Destino',
                width: 150
            },
            { 
                Header: 'País Comprador/Vendedor',
                accessor: 'Clave_Pais_Comprador_Vendedor',
                width: 180
            },
            { 
                Header: 'Entidad Fed. Origen',
                accessor: 'Clave_Entidad_Federativa_Origen',
                width: 150
            },
            { 
                Header: 'Entidad Fed. Destino',
                accessor: 'Clave_Entidad_Federativa_Destino',
                width: 150
            },
            { 
                Header: 'Entidad Fed. Comprador',
                accessor: 'Clave_Entidad_Federativa_Comprador',
                width: 180
            },
            { 
                Header: 'Entidad Fed. Vendedor',
                accessor: 'Clave_Entidad_Federativa_Vendedor',
                width: 180
            },
            { 
                Header: 'Tipo Operación',
                accessor: 'Clave_Tipo_Operacion',
                width: 120
            },
            { 
                Header: 'Documento',
                accessor: 'Clave_Documento',
                width: 120
            },
            { 
                Header: 'Fecha Pago Real',
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 180
            }
        ];

        // Modificar el useMemo para usar las columnas definidas
        const columns = useMemo(() => {
            switch (activeTab) {
                case 'datosGenerales':
                    return datosGeneralesColumns;
                case 'transporteMercancias':
                    return transporteColumns;
                case 'guias':
                    return guiasColumns;
                case 'contenedores':
                    return contenedoresColumns;
                case 'facturas':
                    return facturasColumns;
                case 'fechasPedimento':
                    return fechasPedimentoColumns;
                case 'casosPedimento':
                    return casosPedimentoColumns;
                case 'cuentasAduanerasGarantiaPedimento':
                    return cuentasAduanerasGarantiaPedimentoColumns;
                case 'tasasPedimento':
                    return tasasPedimentoColumns;
                case 'contribucionesPedimento':
                    return contribucionesPedimentoColumns;
                case 'observacionesPedimento':
                    return observacionesPedimentoColumns;
                case 'descargosMercancias':
                    return descargosMercanciasColumns;
                case 'destinatariosMercancia':
                    return destinatariosMercanciaColumns;
                case 'partidas':
                    return partidasColumns;
                case 'mercancias':
                    return mercanciasColumns;
                case 'permisosPartida':
                    return permisosPartidaColumns;
                case 'casosPartida':
                    return casosPartidaColumns;
                case 'cuentasAduanerasGarantiaPartida':
                    return cuentasAduanerasGarantiaPartidaColumns;
                case 'tasasContribucionesPartida':
                    return tasasContribucionesPartidaColumns;
                case 'contribucionesPartida':
                    return contribucionesPartidaColumns;
                case 'observacionesPartida':
                    return observacionesPartidaColumns;
                case 'rectificaciones':
                    return rectificacionesColumns;
                case 'diferenciasContribucionesPedimento':
                    return diferenciasContribucionesPedimentoColumns;
                case 'incidenciasReconocimientoAduanero':
                    return incidenciasReconocimientoAduaneroColumns;
                case 'resumen':
                    return resumenColumns;
                case 'seleccionAutomatizada':
                    return seleccionAutomatizadaColumns;
                case 'universoImmex':
                    return universoImmexColumns;
                default:
                    return datosGeneralesColumns;
            }
        }, [activeTab]);

        const tableData = useMemo(() => {
            let data;
            switch (activeTab) {
                case 'datosGenerales':
                    data = datosGenerales;
                    break;
                case 'transporteMercancias':
                    data = transporteMercancias;
                    break;
                case 'guias':
                    data = guias;
                    break;
                case 'contenedores':
                    data = contenedores;
                    break;
                case 'facturas':
                    data = facturas;
                    break;
                case 'fechasPedimento':
                    data = fechasPedimento;
                    break;
                case 'casosPedimento':
                    data = casosPedimento;
                    break;
                case 'cuentasAduanerasGarantiaPedimento':
                    data = cuentasAduanerasGarantiaPedimento;
                    break;
                case 'tasasPedimento':
                    data = tasasPedimento;
                    break;
                case 'contribucionesPedimento':
                    data = contribucionesPedimento;
                    break;
                case 'observacionesPedimento':
                    data = observacionesPedimento;
                    break;
                case 'descargosMercancias':
                    data = descargosMercancias;
                    break;
                case 'destinatariosMercancia':
                    data = destinatariosMercancia;
                    break;
                case 'partidas':
                    data = partidas;
                    break;
                case 'mercancias':
                    data = mercancias;
                    break;
                case 'permisosPartida':
                    data = permisosPartida;
                    break;
                case 'casosPartida':
                    data = casosPartida;
                    break;
                case 'cuentasAduanerasGarantiaPartida':
                    data = cuentasAduanerasGarantiaPartida;
                    break;
                case 'tasasContribucionesPartida':
                    data = tasasContribucionesPartida;
                    break;
                case 'contribucionesPartida':
                    data = contribucionesPartida;
                    break;
                case 'observacionesPartida':
                    data = observacionesPartida;
                    break;
                case 'rectificaciones':
                    data = rectificaciones;
                    break;
                case 'diferenciasContribucionesPedimento':
                    data = diferenciasContribucionesPedimento;
                    break;
                case 'incidenciasReconocimientoAduanero':
                    data = incidenciasReconocimientoAduanero;
                    break;
                case 'resumen':
                    data = resumen;
                    break;
                case 'seleccionAutomatizada':
                    data = seleccionAutomatizada;
                    break;
                case 'universoImmex':
                    data = universoImmex;
                    break;
                default:
                    data = datosGenerales;
            }

            // Aplicar el filtro de búsqueda
            if (busqueda && data) {
                return data.filter(row => 
                    Object.values(row).some(value => 
                        value && 
                        value.toString().toLowerCase().includes(busqueda.toLowerCase())
                    )
                );
            }

            return data || [];
        }, [
            activeTab,
            busqueda,
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
            resumen,
            seleccionAutomatizada,
            universoImmex
        ]);

        const filteredData = useMemo(() => {
            if (!busqueda) return tableData;
            
            return tableData.filter(row =>
                Object.values(row).some(value =>
                    String(value).toLowerCase().includes(busqueda.toLowerCase())
                )
            );
        }, [tableData, busqueda]);

        // Función para ordenar los datos
        const sortedData = useMemo(() => {
            if (!sortConfig.key) return tableData;

            return [...tableData].sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];

                // Manejar valores nulos
                if (aValue === null) return 1;
                if (bValue === null) return -1;

                // Detectar si los valores son números
                const aNum = Number(aValue);
                const bNum = Number(bValue);
                
                if (!isNaN(aNum) && !isNaN(bNum)) {
                    return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
                }

                // Ordenar como strings si no son números
                const aStr = String(aValue).toLowerCase();
                const bStr = String(bValue).toLowerCase();
                
                if (sortConfig.direction === 'asc') {
                    return aStr.localeCompare(bStr);
                }
                return bStr.localeCompare(aStr);
            });
        }, [tableData, sortConfig]);

        // Modificar la configuración de useTable para usar los datos ordenados
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({
            columns,
            data: sortedData,
            initialState: {
                columnOrder: columnOrder
            },
            manualColumnOrder: true,
        });

        const toggleColumn = (columnId) => {
            // Si se mantiene presionada la tecla Alt, mover la columna
            if (window.event && window.event.altKey) {
                setColumnOrder(prevOrder => {
                    if (!prevOrder.includes(columnId)) {
                        return [...prevOrder, columnId];
                    }
                    return prevOrder.filter(id => id !== columnId);
                });
                } else {
                // Si no se presiona Alt, ordenar la columna
                setSortConfig(prevConfig => {
                    if (prevConfig.key === columnId) {
                        // Cambiar dirección si es la misma columna
                        return {
                            key: columnId,
                            direction: prevConfig.direction === 'asc' ? 'desc' : 'asc'
                        };
                    }
                    // Nueva columna, comenzar con ascendente
                    return {
                        key: columnId,
                        direction: 'asc'
                    };
                });
            }
        };

        console.log('Número de filas:', rows.length);

        // Función para obtener los campos disponibles por tabla
        const getAvailableFields = () => {
            const fieldsByTable = {};
            const allColumns = {
                datosGenerales: datosGeneralesColumns,
                transporteMercancias: transporteColumns,
                guias: guiasColumns,
                contenedores: contenedoresColumns,
                facturas: facturasColumns,
                fechasPedimento: fechasPedimentoColumns,
                casosPedimento: casosPedimentoColumns,
                cuentasAduanerasGarantiaPedimento: cuentasAduanerasGarantiaPedimentoColumns,
                tasasPedimento: tasasPedimentoColumns,
                contribucionesPedimento: contribucionesPedimentoColumns,
                observacionesPedimento: observacionesPedimentoColumns,
                descargosMercancias: descargosMercanciasColumns,
                destinatariosMercancia: destinatariosMercanciaColumns,
                partidas: partidasColumns,
                mercancias: mercanciasColumns,
                permisosPartida: permisosPartidaColumns,
                casosPartida: casosPartidaColumns,
                cuentasAduanerasGarantiaPartida: cuentasAduanerasGarantiaPartidaColumns,
                tasasContribucionesPartida: tasasContribucionesPartidaColumns,
                contribucionesPartida: contribucionesPartidaColumns,
                observacionesPartida: observacionesPartidaColumns,
                rectificaciones: rectificacionesColumns,
                diferenciasContribucionesPedimento: diferenciasContribucionesPedimentoColumns,
                incidenciasReconocimientoAduanero: incidenciasReconocimientoAduaneroColumns,
                seleccionAutomatizada: seleccionAutomatizadaColumns,
                resumen: resumenColumns,
                universoImmex: universoImmexColumns
            };

            Object.entries(allColumns).forEach(([table, columns]) => {
                if (columns && Array.isArray(columns)) {
                    fieldsByTable[table] = columns.map(col => ({
                        id: col.accessor,
                        label: col.Header,
                        selected: selectedFields[table]?.includes(col.accessor) || false
                    }));
                }
            });

            return fieldsByTable;
        };

        // Función para manejar la selección de campos
        const handleFieldSelection = (table, fieldId) => {
            setSelectedFields(prev => {
                const currentFields = prev[table] || [];
                const newFields = currentFields.includes(fieldId)
                    ? currentFields.filter(id => id !== fieldId)
                    : [...currentFields, fieldId];
                
                return {
                    ...prev,
                    [table]: newFields
                };
            });
        };

        // Función para seleccionar/deseleccionar todos los campos de una tabla
        const toggleAllFields = (table, fields) => {
            const allSelected = fields.every(field => selectedFields[table]?.includes(field.id));
            
            setSelectedFields(prev => ({
                ...prev,
                [table]: allSelected ? [] : fields.map(field => field.id)
            }));
        };

        const loadMoreData = async () => {
            if (isLoading || !hasMore) return;
            
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:3000/api/vista-general?page=${page}&limit=50`);
                const data = await response.json();
                
                if (data.datosGenerales.length === 0) {
                    setHasMore(false);
                    return;
                }

                setDatosGenerales(prev => [...prev, ...data.datosGenerales]);
                setTransporteMercancias(prev => [...prev, ...data.transporteMercancias]);
                setGuias(prev => [...prev, ...data.guias]);
                setContenedores(prev => [...prev, ...data.contenedores]);
                setFacturas(prev => [...prev, ...data.facturas]);
                setFechasPedimento(prev => [...prev, ...data.fechasPedimento]);
                setCasosPedimento(prev => [...prev, ...data.casosPedimento]);
                setCuentasAduanerasGarantiaPedimento(prev => [...prev, ...data.cuentasAduanerasGarantiaPedimento]);
                setTasasPedimento(prev => [...prev, ...data.tasasPedimento]);
                setContribucionesPedimento(prev => [...prev, ...data.contribucionesPedimento]);
                setObservacionesPedimento(prev => [...prev, ...data.observacionesPedimento]);
                setDescargosMercancias(prev => [...prev, ...data.descargosMercancias]);
                setDestinatariosMercancia(prev => [...prev, ...data.destinatariosMercancia]);
                setPartidas(prev => [...prev, ...data.partidas]);
                setMercancias(prev => [...prev, ...data.mercancias]);
                setPermisosPartida(prev => [...prev, ...data.permisosPartida]);
                setCasosPartida(prev => [...prev, ...data.casosPartida]);
                setCuentasAduanerasGarantiaPartida(prev => [...prev, ...data.cuentasAduanerasGarantiaPartida]);
                setTasasContribucionesPartida(prev => [...prev, ...data.tasasContribucionesPartida]);
                setContribucionesPartida(prev => [...prev, ...data.contribucionesPartida]);
                setObservacionesPartida(prev => [...prev, ...data.observacionesPartida]);
                setRectificaciones(prev => [...prev, ...data.rectificaciones]);
                setDiferenciasContribucionesPedimento(prev => [...prev, ...data.diferenciasContribucionesPedimento]);
                setIncidenciasReconocimientoAduanero(prev => [...prev, ...data.incidenciasReconocimientoAduanero]);
                setSeleccionAutomatizada(prev => [...prev, ...data.seleccionAutomatizada]);
                setResumen(prev => [...prev, ...data.resumen]);
                setUniversoImmex(prev => [...prev, ...data.universoImmex]);
                
                setTotalRecords(data.pagination.total);
                setPage(prev => prev + 1);
            } catch (error) {
                console.error('Error al cargar más datos:', error);
            } finally {
                setIsLoading(false);
            }
        };

        useEffect(() => {
            loadMoreData();
        }, []);

        const handleScroll = (e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            if (scrollHeight - scrollTop <= clientHeight + 100 && !isLoading && hasMore) {
                loadMoreData();
            }
        };

        // Agregar el diálogo antes del return principal
        const DialogoExportarExcel = () => (
            <Dialog 
                open={dialogoExportarAbierto} 
                onClose={() => setDialogoExportarAbierto(false)}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle sx={{ 
                    bgcolor: 'primary.main', 
                    color: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    Seleccionar Tablas para Exportar
                    <IconButton 
                        onClick={() => setDialogoExportarAbierto(false)}
                        sx={{ color: 'white' }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ mt: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="subtitle1">
                            Seleccione las tablas a exportar
                        </Typography>
                        <Button 
                            onClick={handleToggleTodasTablas}
                            variant="outlined"
                            size="small"
                        >
                            {tablasSeleccionadas.length === 26 ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
                        </Button>
                    </Box>
                    <List sx={{ 
                        width: '100%', 
                        maxHeight: 400, 
                        overflow: 'auto',
                        '& .MuiListItem-root': {
                            py: 0.5
                        }
                    }}>
                        {[
                            { id: '501_datos_generales', nombre: 'Datos Generales' },
                            { id: '502_transporte_mercancias', nombre: 'Transporte Mercancías' },
                            { id: '503_guias', nombre: 'Guías' },
                            { id: '504_contenedores', nombre: 'Contenedores' },
                            { id: '505_facturas', nombre: 'Facturas' },
                            { id: '506_fechas_pedimento', nombre: 'Fechas Pedimento' },
                            { id: '507_casos_pedimento', nombre: 'Casos Pedimento' },
                            { id: '508_cuentas_aduaneras_garantia_pedimento', nombre: 'Cuentas Aduaneras Garantía Pedimento' },
                            { id: '509_tasas_pedimento', nombre: 'Tasas Pedimento' },
                            { id: '510_contribuciones_pedimento', nombre: 'Contribuciones Pedimento' },
                            { id: '511_observaciones_pedimento', nombre: 'Observaciones Pedimento' },
                            { id: '512_descargos_mercancias', nombre: 'Descargos Mercancías' },
                            { id: '520_destinatarios_mercancia', nombre: 'Destinatarios Mercancía' },
                            { id: '551_partidas', nombre: 'Partidas' },
                            { id: '552_mercancias', nombre: 'Mercancías' },
                            { id: '553_permiso_partida', nombre: 'Permiso Partida' },
                            { id: '554_casos_partida', nombre: 'Casos Partida' },
                            { id: '555_cuentas_aduaneras_garantia_partida', nombre: 'Cuentas Aduaneras Garantía Partida' },
                            { id: '556_tasas_contribuciones_partida', nombre: 'Tasas Contribuciones Partida' },
                            { id: '557_contribuciones_partida', nombre: 'Contribuciones Partida' },
                            { id: '558_observaciones_partida', nombre: 'Observaciones Partida' },
                            { id: '701_rectificaciones', nombre: 'Rectificaciones' },
                            { id: '702_diferencias_contribuciones_pedimento', nombre: 'Diferencias Contribuciones Pedimento' },
                            { id: 'incidencias_reconocimiento_aduanero', nombre: 'Incidencias Reconocimiento Aduanero' },
                            { id: 'seleccion_automatizada', nombre: 'Selección Automatizada' },
                            { id: 'resumen', nombre: 'Resumen' }
                        ].map((tabla) => (
                            <ListItem key={tabla.id} disablePadding>
                                <ListItemButton 
                                    onClick={() => handleToggleTabla(tabla.id)}
                                    dense
                                >
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={tablasSeleccionadas.includes(tabla.id)}
                                            tabIndex={-1}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={tabla.nombre} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button 
                        onClick={() => setDialogoExportarAbierto(false)}
                        variant="outlined"
                    >
                        Cancelar
                    </Button>
                    <Button 
                        onClick={exportarAExcel}
                        variant="contained"
                        disabled={tablasSeleccionadas.length === 0}
                    >
                        Exportar
                    </Button>
                </DialogActions>
            </Dialog>
        );

        return (
            <>
                {/* Modal de selección de campos */}
                {showFieldSelector && (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 1000
                    }}>
                        <div style={{
                            backgroundColor: 'white',
                            padding: '20px',
                            borderRadius: '8px',
                            maxWidth: '80%',
                            maxHeight: '80%',
                            overflow: 'auto'
                        }}>
                            <h2>Seleccione los campos a exportar</h2>
                            {Object.entries(getAvailableFields()).map(([table, fields]) => (
                                <div key={table} style={{ marginBottom: '20px' }}>
                                    <h3>{table}</h3>
                                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                                        <input
                                            type="checkbox"
                                            checked={fields.every(field => selectedFields[table]?.includes(field.id))}
                                            onChange={() => toggleAllFields(table, fields)}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <span>Seleccionar todos</span>
                                    </div>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '10px' }}>
                                        {fields.map(field => (
                                            <div key={field.id} style={{ display: 'flex', alignItems: 'center' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedFields[table]?.includes(field.id) || false}
                                                    onChange={() => handleFieldSelection(table, field.id)}
                                                    style={{ marginRight: '10px' }}
                                                />
                                                <span>{field.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                                <button
                                    onClick={() => setShowFieldSelector(false)}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#f44336',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmExport}
                                    style={{
                                        padding: '8px 16px',
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '4px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Exportar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Resto del JSX existente */}
                <Box sx={{ 
                    flexGrow: 1,
                    mt: '64px', // Espacio para el navbar
                    p: 3,
                        backgroundColor: '#f5f5f5',
                    minHeight: 'calc(100vh - 64px)'
                }}>
                    <Container maxWidth={false}>
                        <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                            <Typography variant="h5" component="h1" gutterBottom sx={{ 
                                color: '#1976d2',
                                fontWeight: 'bold',
                                mb: 3
                            }}>
                                Vista General de Pedimentos
                            </Typography>

                            {/* Panel de Filtros y Exportación */}
                            <Paper 
                                elevation={2} 
                                sx={{ 
                                    p: 2, 
                                    mb: 3, 
                                    display: 'flex', 
                                    gap: 2,
                                    alignItems: 'center',
                                    backgroundColor: '#fff'
                                }}
                            >
                                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Fecha Inicio
                                        </Typography>
                            <input
                                type="date"
                                value={fechaInicio}
                                onChange={(e) => setFechaInicio(e.target.value)}
                                style={{
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            />
                                    </Box>
                                    <Box>
                                        <Typography variant="subtitle2" gutterBottom>
                                            Fecha Fin
                                        </Typography>
                            <input
                                type="date"
                                value={fechaFin}
                                onChange={(e) => setFechaFin(e.target.value)}
                                style={{
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd'
                                }}
                            />
                                    </Box>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={() => setDialogoExportarAbierto(true)}
                            startIcon={<FileDownloadIcon />}
                        >
                            Exportar a Excel
                        </Button>
                                </Box>

                                {/* Buscador */}
                                <Box sx={{ 
                            position: 'relative',
                                    ml: 'auto',
                                    width: '300px'
                            }}>
                                <input
                                    type="text"
                                    value={busqueda}
                                    onChange={e => setBusqueda(e.target.value)}
                                    placeholder="Buscar..."
                                    style={{ 
                                        width: '100%',
                                        padding: '12px 40px 12px 16px',
                                        fontSize: '14px',
                                            border: '1px solid #e0e0e0',
                                        borderRadius: '25px',
                                        outline: 'none',
                                            backgroundColor: '#f8f9fa'
                                    }}
                                />
                                <FaSearch style={{
                                    position: 'absolute',
                                    right: '16px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#666'
                                    }} />
                                </Box>
                            </Paper>

                            {/* Tabs de navegación */}
                            <Box sx={{ 
                                mb: 3,
                                display: 'flex',
                                gap: 1,
                                overflowX: 'auto',
                                pb: 1,
                                '&::-webkit-scrollbar': {
                                    height: '8px'
                                },
                                '&::-webkit-scrollbar-track': {
                                    backgroundColor: '#f5f5f5',
                                    borderRadius: '4px'
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#888',
                                    borderRadius: '4px',
                                    '&:hover': {
                                        backgroundColor: '#666'
                                    }
                                }
                            }}>
                                {[
                                    { id: 'datosGenerales', label: 'Datos Generales' },
                                    { id: 'transporteMercancias', label: 'Transporte Mercancías' },
                                    { id: 'guias', label: 'Guías' },
                                    { id: 'contenedores', label: 'Contenedores' },
                                    { id: 'facturas', label: 'Facturas' },
                                    { id: 'fechasPedimento', label: 'Fechas Pedimento' },
                                    { id: 'casosPedimento', label: 'Casos Pedimento' },
                                    { id: 'cuentasAduanerasGarantiaPedimento', label: 'Cuentas Aduaneras Garantía' },
                                    { id: 'tasasPedimento', label: 'Tasas Pedimento' },
                                    { id: 'contribucionesPedimento', label: 'Contribuciones Pedimento' },
                                    { id: 'observacionesPedimento', label: 'Observaciones Pedimento' },
                                    { id: 'descargosMercancias', label: 'Descargos Mercancías' },
                                    { id: 'destinatariosMercancia', label: 'Destinatarios Mercancía' },
                                    { id: 'partidas', label: 'Partidas' },
                                    { id: 'mercancias', label: 'Mercancías' },
                                    { id: 'permisosPartida', label: 'Permisos Partida' },
                                    { id: 'casosPartida', label: 'Casos Partida' },
                                    { id: 'cuentasAduanerasGarantiaPartida', label: 'Cuentas Aduaneras Garantía Partida' },
                                    { id: 'tasasContribucionesPartida', label: 'Tasas Contribuciones Partida' },
                                    { id: 'contribucionesPartida', label: 'Contribuciones Partida' },
                                    { id: 'observacionesPartida', label: 'Observaciones Partida' },
                                    { id: 'rectificaciones', label: 'Rectificaciones' },
                                    { id: 'diferenciasContribucionesPedimento', label: 'Diferencias Contribuciones' },
                                    { id: 'incidenciasReconocimientoAduanero', label: 'Incidencias Reconocimiento' },
                                    { id: 'resumen', label: 'Resumen' },
                                    { id: 'seleccionAutomatizada', label: 'Selección Automatizada' },
                                    { id: 'universoImmex', label: 'Universo IMMEX' }
                                ].map(tab => (
                                    <button 
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                    style={{ 
                                        backgroundColor: activeTab === tab.id ? '#1976d2' : '#fff',
                                        color: activeTab === tab.id ? '#fff' : '#333',
                                        padding: '10px 20px',
                                        border: '1px solid #ddd',
                        borderRadius: '4px',
                                        cursor: 'pointer',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.3s ease',
                                        fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                                        minWidth: 'fit-content',
                                        fontSize: '0.875rem',
                                        boxShadow: activeTab === tab.id ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
                                        '&:hover': {
                                            backgroundColor: activeTab === tab.id ? '#1565c0' : '#f5f5f5',
                                            transform: 'translateY(-1px)'
                                        }
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                            </Box>

                            {/* Tabla */}
                            <TableContainer 
                                component={Paper} 
                                sx={{ 
                                    maxHeight: 'calc(100vh - 350px)',
                                    borderRadius: 2,
                                    overflow: 'auto',
                                    '& .MuiTableCell-root': {
                                        fontSize: '0.875rem'
                                    },
                                    '& .MuiTableHead-root': {
                                        backgroundColor: '#f5f5f5'
                                    },
                                    '& .MuiTableRow-root:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    },
                                    '& .MuiTable-root': {
                                        borderCollapse: 'separate'
                                    },
                                    position: 'relative'
                                }}
                                onScroll={handleScroll}
                            >
                                <Table stickyHeader>
                                    <TableHead>
                                        {headerGroups.map(headerGroup => (
                                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                                {headerGroup.headers
                                                    .sort((a, b) => {
                                                        const aIndex = columnOrder.indexOf(a.id);
                                                        const bIndex = columnOrder.indexOf(b.id);
                                                        if (aIndex === -1 && bIndex === -1) return 0;
                                                        if (aIndex === -1) return -1;
                                                        if (bIndex === -1) return 1;
                                                        return aIndex - bIndex;
                                                    })
                                                    .map((column, index) => (
                                                        <TableCell
                                                            {...column.getHeaderProps()}
                                                            onClick={() => toggleColumn(column.id)}
                                                            sx={{
                                                                backgroundColor: '#f5f5f5 !important',
                                                                cursor: 'pointer',
                                                                fontWeight: 'bold',
                                                                whiteSpace: 'nowrap',
                                                                padding: '16px',
                                                                position: 'sticky', // Todos los headers son sticky
                                                                top: 0, // Todos los headers se mantienen en la parte superior
                                                                zIndex: index === 0 ? 3 : 2, // Mayor z-index para la primera columna
                                                                left: index === 0 ? 0 : 'auto', // Solo la primera columna tiene left: 0
                                                                borderBottom: '1px solid rgba(224, 224, 224, 1)',
                                                                '&:hover': {
                                                                    backgroundColor: '#e0e0e0 !important'
                                                                },
                                                                ...(index === 0 && {
                                                                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                                                                    '&::after': {
                                                                        content: '""',
                                                                        position: 'absolute',
                                                                        right: 0,
                                                                        top: 0,
                                                                        bottom: 0,
                                                                        width: '4px',
                                                                        boxShadow: '4px 0 4px rgba(0,0,0,0.1)',
                                                                        pointerEvents: 'none'
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            {column.render('Header')}
                                                            {sortConfig.key === column.id && (
                                                                <span style={{ marginLeft: '8px' }}>
                                                                    {sortConfig.direction === 'asc' ? '↑' : '↓'}
                                                                </span>
                                                            )}
                                                        </TableCell>
                                                    ))}
                                            </TableRow>
                                        ))}
                                    </TableHead>
                                    <TableBody>
                                        {rows.map(row => {
                                            prepareRow(row);
                                            return (
                                                <TableRow 
                                                    {...row.getRowProps()}
                                                    sx={{
                                                        '&:nth-of-type(odd)': {
                                                            backgroundColor: 'rgba(0, 0, 0, 0.02)'
                                                        }
                                                    }}
                                                >
                                                    {row.cells.map((cell, index) => (
                                                        <TableCell
                                                            {...cell.getCellProps()}
                                                            sx={{
                                                                ...cell.getCellProps().style,
                                                                ...(index === 0 && {
                                                                    borderRight: '1px solid rgba(224, 224, 224, 1)',
                                                                    '&::after': {
                                                                        content: '""',
                                                                        position: 'absolute',
                                                                        right: 0,
                                                                        top: 0,
                                                                        bottom: 0,
                                                                        width: '4px',
                                                                        boxShadow: '4px 0 4px rgba(0,0,0,0.1)',
                                                                        pointerEvents: 'none'
                                                                    }
                                                                })
                                                            }}
                                                        >
                                                            {cell.render('Cell')}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            );
                                        })}
                                        {isLoading && (
                                            <TableRow>
                                                <TableCell colSpan={100} align="center">
                                                    <Typography variant="body2" color="text.secondary">
                                                        Cargando más registros...
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {!hasMore && rows.length > 0 && (
                                            <TableRow>
                                                <TableCell colSpan={100} align="center">
                                                    <Typography variant="body2" color="text.secondary">
                                                        No hay más registros para mostrar
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </Container>
                </Box>
                <DialogoExportarExcel />
                
                <Backdrop
                    sx={{ 
                        color: '#fff', 
                        zIndex: 1400,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                    open={cargandoExcel}
                >
                    <CircularProgress color="inherit" size={60} />
                    <Typography variant="h6" component="div">
                        Exportando datos a Excel...
                    </Typography>
                </Backdrop>
            </>
        );
    }

    export default VistaGeneral; 