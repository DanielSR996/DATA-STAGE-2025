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
    Tooltip
} from '@mui/material';

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
    const [resumen, setResumen] = useState([]);
    const [seleccionAutomatizada, setSeleccionAutomatizada] = useState([]);
    const [activeTab, setActiveTab] = useState('datosGenerales');
    const [busqueda, setBusqueda] = useState('');
    const [hiddenColumns, setHiddenColumns] = useState(new Set());
    const [showFloatingHeader, setShowFloatingHeader] = useState(false);

    useEffect(() => {
        fetch('http://localhost:3000/api/vista-general')
            .then(response => response.json())
            .then(data => {
                console.log('Respuesta completa:', data);
                console.log('Guías en la respuesta:', data.guias);
                setDatosGenerales(data.datosGenerales || []);
                setTransporteMercancias(data.transporteMercancias || []);
                setGuias(data.guias || []);
                setContenedores(data.contenedores || []);
                setFacturas(data.facturas || []);
                setFechasPedimento(data.fechasPedimento || []);
                setCasosPedimento(data.casosPedimento || []);
                setCuentasAduanerasGarantiaPedimento(data.cuentasAduanerasGarantiaPedimento || []);
                setTasasPedimento(data.tasasPedimento || []);
                setContribucionesPedimento(data.contribucionesPedimento || []);
                setObservacionesPedimento(data.observacionesPedimento || []);
                setDescargosMercancias(data.descargosMercancias || []);
                setDestinatariosMercancia(data.destinatariosMercancia || []);
                setPartidas(data.partidas || []);
                setMercancias(data.mercancias || []);
                setPermisosPartida(data.permisosPartida || []);
                setCasosPartida(data.casosPartida || []);
                setCuentasAduanerasGarantiaPartida(data.cuentasAduanerasGarantiaPartida || []);
                setTasasContribucionesPartida(data.tasasContribucionesPartida || []);
                setContribucionesPartida(data.contribucionesPartida || []);
                setObservacionesPartida(data.observacionesPartida || []);
                setRectificaciones(data.rectificaciones || []);
                setDiferenciasContribucionesPedimento(data.diferenciasContribucionesPedimento || []);
                setIncidenciasReconocimientoAduanero(data.incidenciasReconocimientoAduanero || []);
                setResumen(data.resumen || []);
                setSeleccionAutomatizada(data.seleccionAutomatizada || []);
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }, []);

    useEffect(() => {
        const handleScroll = (e) => {
            const scrollTop = e.target.scrollTop;
            setShowFloatingHeader(scrollTop > 50);
        };

        const tableContainer = document.querySelector('.table-container');
        if (tableContainer) {
            tableContainer.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (tableContainer) {
                tableContainer.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);

    const columns = useMemo(() => {
        const guiasColumns = [
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
                Header: 'Número Guía/Manifiesto', 
                accessor: 'Numero_Guia_Manifiesto',
                width: 180
            },
            { 
                Header: 'Clave Tipo Guía', 
                accessor: 'Clave_Tipo_Guia',
                width: 120
            },
            { 
                Header: 'Fecha Pago Real', 
                accessor: 'Fecha_Pago_Real',
                Cell: ({ value }) => value ? new Date(value).toLocaleString() : '-',
                width: 150
            }
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

        switch (activeTab) {
            case 'guias':
                return guiasColumns;
            case 'transporteMercancias':
                return transporteColumns;
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
            case 'datosGenerales':
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
                console.log('Tab de guías seleccionado');
                console.log('Datos de guías disponibles:', guias);
                data = guias;
                break;
            case 'contenedores':
                console.log('Tab de contenedores seleccionado');
                console.log('Datos de contenedores disponibles:', contenedores);
                data = contenedores;
                break;
            case 'facturas':
                console.log('Tab de facturas seleccionado');
                console.log('Datos de facturas disponibles:', facturas);
                data = facturas;
                break;
            case 'fechasPedimento':
                console.log('Tab de fechas pedimento seleccionado');
                console.log('Datos de fechas pedimento disponibles:', fechasPedimento);
                data = fechasPedimento;
                break;
            case 'casosPedimento':
                console.log('Tab de casos pedimento seleccionado');
                console.log('Datos de casos pedimento disponibles:', casosPedimento);
                data = casosPedimento;
                break;
            case 'cuentasAduanerasGarantiaPedimento':
                console.log('Tab de cuentas aduaneras garantía pedimento seleccionado');
                data = cuentasAduanerasGarantiaPedimento;
                break;
            case 'tasasPedimento':
                console.log('Tab de tasas pedimento seleccionado');
                data = tasasPedimento;
                break;
            case 'contribucionesPedimento':
                console.log('Tab de contribuciones pedimento seleccionado');
                data = contribucionesPedimento;
                break;
            case 'observacionesPedimento':
                console.log('Tab de observaciones pedimento seleccionado');
                data = observacionesPedimento;
                break;
            case 'descargosMercancias':
                console.log('Tab de descargos mercancías seleccionado');
                data = descargosMercancias;
                break;
            case 'destinatariosMercancia':
                console.log('Tab de destinatarios mercancía seleccionado');
                data = destinatariosMercancia;
                break;
            case 'partidas':
                console.log('Tab de partidas seleccionado');
                data = partidas;
                break;
            case 'mercancias':
                console.log('Tab de mercancías seleccionado');
                data = mercancias;
                break;
            case 'permisosPartida':
                console.log('Tab de permisos partida seleccionado');
                data = permisosPartida;
                break;
            case 'casosPartida':
                console.log('Tab de casos partida seleccionado');
                data = casosPartida;
                break;
            case 'cuentasAduanerasGarantiaPartida':
                console.log('Tab de cuentas aduaneras garantía partida seleccionado');
                data = cuentasAduanerasGarantiaPartida;
                break;
            case 'tasasContribucionesPartida':
                console.log('Tab de tasas contribuciones partida seleccionado');
                data = tasasContribucionesPartida;
                break;
            case 'contribucionesPartida':
                console.log('Tab de contribuciones partida seleccionado');
                data = contribucionesPartida;
                break;
            case 'observacionesPartida':
                console.log('Tab de observaciones partida seleccionado');
                data = observacionesPartida;
                break;
            case 'rectificaciones':
                console.log('Tab de rectificaciones seleccionado');
                data = rectificaciones;
                break;
            case 'diferenciasContribucionesPedimento':
                console.log('Tab de diferencias contribuciones pedimento seleccionado');
                data = diferenciasContribucionesPedimento;
                break;
            case 'incidenciasReconocimientoAduanero':
                console.log('Tab de incidencias reconocimiento aduanero seleccionado');
                data = incidenciasReconocimientoAduanero;
                break;
            case 'resumen':
                console.log('Tab de resumen seleccionado');
                data = resumen;
                break;
            case 'seleccionAutomatizada':
                console.log('Tab de selección automatizada seleccionado');
                data = seleccionAutomatizada;
                break;
            default:
                data = datosGenerales;
        }
        console.log(`Datos para la tabla (${activeTab}):`, data);
        return Array.isArray(data) ? data : [];
    }, [activeTab, datosGenerales, transporteMercancias, guias, contenedores, facturas, fechasPedimento, casosPedimento, cuentasAduanerasGarantiaPedimento, tasasPedimento, contribucionesPedimento, observacionesPedimento, descargosMercancias, destinatariosMercancia, partidas, mercancias, permisosPartida, casosPartida, cuentasAduanerasGarantiaPartida, tasasContribucionesPartida, contribucionesPartida, observacionesPartida, rectificaciones, diferenciasContribucionesPedimento, incidenciasReconocimientoAduanero, resumen, seleccionAutomatizada]);

    const filteredData = useMemo(() => {
        if (!busqueda) return tableData;
        
        return tableData.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(busqueda.toLowerCase())
            )
        );
    }, [tableData, busqueda]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: tableData
    });

    const toggleColumn = (columnId) => {
        setHiddenColumns(prev => {
            const next = new Set(prev);
            if (next.has(columnId)) {
                next.delete(columnId);
            } else {
                next.add(columnId);
            }
            return next;
        });
    };

    console.log('Número de filas:', rows.length);

    return (
        <div style={{ 
            padding: '20px', 
            marginTop: '80px',
            height: 'calc(100vh - 100px)',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ 
                marginBottom: '20px', 
                display: 'flex',
                gap: '10px',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%'
            }}>
                <div style={{ 
                    display: 'flex', 
                    gap: '10px',
                    overflowX: 'auto',
                    paddingBottom: '10px',
                    maxWidth: 'calc(100% - 320px)',
                    WebkitOverflowScrolling: 'touch',
                    // Estilos modernos para el scrollbar
                    '&::-webkit-scrollbar': {
                        height: '8px',
                        backgroundColor: '#f5f5f5'
                    },
                    '&::-webkit-scrollbar-track': {
                        borderRadius: '4px',
                        backgroundColor: '#f5f5f5'
                    },
                    '&::-webkit-scrollbar-thumb': {
                        borderRadius: '4px',
                        backgroundColor: '#888',
                        '&:hover': {
                            backgroundColor: '#666'
                        }
                    }
                }}>
                    <button 
                        onClick={() => setActiveTab('datosGenerales')}
                        style={{ 
                            backgroundColor: activeTab === 'datosGenerales' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Datos Generales
                    </button>
                    <button 
                        onClick={() => setActiveTab('transporteMercancias')}
                        style={{ 
                            backgroundColor: activeTab === 'transporteMercancias' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Transporte Mercancías
                    </button>
                    <button 
                        onClick={() => setActiveTab('guias')}
                        style={{ 
                            backgroundColor: activeTab === 'guias' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Guías
                    </button>
                    <button 
                        onClick={() => setActiveTab('contenedores')}
                        style={{ 
                            backgroundColor: activeTab === 'contenedores' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Contenedores
                    </button>
                    <button 
                        onClick={() => setActiveTab('facturas')}
                        style={{ 
                            backgroundColor: activeTab === 'facturas' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Facturas
                    </button>
                    <button 
                        onClick={() => setActiveTab('fechasPedimento')}
                        style={{ 
                            backgroundColor: activeTab === 'fechasPedimento' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Fechas Pedimento
                    </button>
                    <button 
                        onClick={() => setActiveTab('casosPedimento')}
                        style={{ 
                            backgroundColor: activeTab === 'casosPedimento' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Casos Pedimento
                    </button>
                    <button 
                        onClick={() => setActiveTab('cuentasAduanerasGarantiaPedimento')}
                        style={{ 
                            backgroundColor: activeTab === 'cuentasAduanerasGarantiaPedimento' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cuentas Aduaneras Garantía
                    </button>
                    <button 
                        onClick={() => setActiveTab('tasasPedimento')}
                        style={{ 
                            backgroundColor: activeTab === 'tasasPedimento' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Tasas Pedimento
                    </button>
                    <button 
                        onClick={() => setActiveTab('contribucionesPedimento')}
                        style={{ 
                            backgroundColor: activeTab === 'contribucionesPedimento' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Contribuciones Pedimento
                    </button>
                    <button 
                        onClick={() => setActiveTab('observacionesPedimento')}
                        style={{ 
                            backgroundColor: activeTab === 'observacionesPedimento' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Observaciones Pedimento
                    </button>
                    <button 
                        onClick={() => setActiveTab('descargosMercancias')}
                        style={{ 
                            backgroundColor: activeTab === 'descargosMercancias' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Descargos Mercancías
                    </button>
                    <button 
                        onClick={() => setActiveTab('destinatariosMercancia')}
                        style={{ 
                            backgroundColor: activeTab === 'destinatariosMercancia' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Destinatarios Mercancía
                    </button>
                    <button 
                        onClick={() => setActiveTab('partidas')}
                        style={{ 
                            backgroundColor: activeTab === 'partidas' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Partidas
                    </button>
                    <button 
                        onClick={() => setActiveTab('mercancias')}
                        style={{ 
                            backgroundColor: activeTab === 'mercancias' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Mercancías
                    </button>
                    <button 
                        onClick={() => setActiveTab('permisosPartida')}
                        style={{ 
                            backgroundColor: activeTab === 'permisosPartida' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Permisos Partida
                    </button>
                    <button 
                        onClick={() => setActiveTab('casosPartida')}
                        style={{ 
                            backgroundColor: activeTab === 'casosPartida' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Casos Partida
                    </button>
                    <button 
                        onClick={() => setActiveTab('cuentasAduanerasGarantiaPartida')}
                        style={{ 
                            backgroundColor: activeTab === 'cuentasAduanerasGarantiaPartida' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Cuentas Aduaneras Garantía Partida
                    </button>
                    <button 
                        onClick={() => setActiveTab('tasasContribucionesPartida')}
                        style={{ 
                            backgroundColor: activeTab === 'tasasContribucionesPartida' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Tasas Contribuciones Partida
                    </button>
                    <button 
                        onClick={() => setActiveTab('contribucionesPartida')}
                        style={{ 
                            backgroundColor: activeTab === 'contribucionesPartida' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Contribuciones Partida
                    </button>
                    <button 
                        onClick={() => setActiveTab('observacionesPartida')}
                        style={{ 
                            backgroundColor: activeTab === 'observacionesPartida' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Observaciones Partida
                    </button>
                    <button 
                        onClick={() => setActiveTab('rectificaciones')}
                        style={{ 
                            backgroundColor: activeTab === 'rectificaciones' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Rectificaciones
                    </button>
                    <button 
                        onClick={() => setActiveTab('diferenciasContribucionesPedimento')}
                        style={{ 
                            backgroundColor: activeTab === 'diferenciasContribucionesPedimento' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Diferencias Contribuciones Pedimento
                    </button>
                    <button 
                        onClick={() => setActiveTab('incidenciasReconocimientoAduanero')}
                        style={{ 
                            backgroundColor: activeTab === 'incidenciasReconocimientoAduanero' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Incidencias Reconocimiento Aduanero
                    </button>
                    <button 
                        onClick={() => setActiveTab('resumen')}
                        style={{ 
                            backgroundColor: activeTab === 'resumen' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Resumen
                    </button>
                    <button 
                        onClick={() => setActiveTab('seleccionAutomatizada')}
                        style={{ 
                            backgroundColor: activeTab === 'seleccionAutomatizada' ? '#4CAF50' : '#f1f1f1',
                            padding: '10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }}
                    >
                        Selección Automatizada
                    </button>
                </div>
                
                <div style={{
                    position: 'relative',
                    width: '300px',
                    flexShrink: 0
                }}>
                    <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
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
                                border: '2px solid #e0e0e0',
                                borderRadius: '25px',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                backgroundColor: '#f8f9fa',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                '&:focus': {
                                    borderColor: '#4CAF50',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                }
                            }}
                        />
                        <FaSearch style={{
                            position: 'absolute',
                            right: '16px',
                            color: '#666',
                            fontSize: '16px'
                        }} />
                    </div>
                </div>
            </div>

            <TableContainer 
                component={Paper} 
                className="table-container"
                style={{ 
                    flex: 1,
                    width: '100%',
                    height: '100%',
                    borderRadius: '4px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    overflowX: 'auto',
                    overflowY: 'auto'
                }}
            >
                <Table 
                    {...getTableProps()} 
                    stickyHeader 
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <TableHead>
                        {headerGroups.map(headerGroup => (
                            <TableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell
                                        {...column.getHeaderProps()}
                                        onClick={() => toggleColumn(column.id)}
                                        style={{
                                            backgroundColor: hiddenColumns.has(column.id) ? '#ffcccc' : '#f9f9f9',
                                            cursor: 'pointer',
                                            fontWeight: 'bold',
                                            padding: '16px 8px',
                                            fontSize: '0.95rem'
                                        }}
                                    >
                                        {column.render('Header')}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <TableRow {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        if (hiddenColumns.has(cell.column.id)) return null;
                                        return (
                                            <TableCell
                                                {...cell.getCellProps()}
                                                style={{
                                                    padding: '12px 8px',
                                                    whiteSpace: 'normal',
                                                    wordBreak: 'break-word',
                                                    maxWidth: cell.column.width || '200px',
                                                    overflow: 'visible'
                                                }}
                                            >
                                                {cell.render('Cell')}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default VistaGeneral; 