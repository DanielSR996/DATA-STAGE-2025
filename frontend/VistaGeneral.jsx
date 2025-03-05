import React, { useState, useEffect, useMemo } from 'react';
import { useTable } from 'react-table';

function VistaGeneral() {
    const [data, setData] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [activeTab, setActiveTab] = useState('datosGenerales');
    const [hiddenColumns, setHiddenColumns] = useState(new Set());

    useEffect(() => {
        fetch('http://localhost:3000/api/vista-general')
            .then(response => response.json())
            .then(data => {
                setData(data || {});
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }, []);

    const columns = useMemo(() => {
        const datosGeneralesColumns = [
            { Header: 'Patente Aduanal', accessor: 'Patente_Aduanal' },
            { Header: 'Número Pedimento', accessor: 'Numero_Pedimento' },
            { Header: 'Clave Sec Aduanera Despacho', accessor: 'Clave_Sec_Aduanera_Despacho' },
            { Header: 'Clave Tipo Operación', accessor: 'Clave_Tipo_Operacion' },
            { Header: 'Clave Documento', accessor: 'Clave_Documento' },
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

        // Aquí puedes agregar más conjuntos de columnas para otras pestañas
        switch (activeTab) {
            case 'datosGenerales':
                return datosGeneralesColumns;
            case 'transporteMercancias':
                return transporteColumns;
            default:
                return datosGeneralesColumns;
        }
    }, [activeTab]);

    const filteredData = useMemo(() => {
        const currentData = activeTab === 'datosGenerales' ? 
            data.datosGenerales || [] : 
            data.transporteMercancias || [];

        if (!busqueda) return currentData;

        return currentData.filter(row =>
            Object.values(row).some(value =>
                String(value).toLowerCase().includes(busqueda.toLowerCase())
            )
        );
    }, [data, busqueda, activeTab]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: filteredData,
        initialState: {
            hiddenColumns: Array.from(hiddenColumns)
        }
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

    return (
        <div style={{ padding: '20px', marginTop: '80px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
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
            </div>

            <input
                type="text"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                placeholder="Buscar..."
                style={{ 
                    marginBottom: '20px', 
                    padding: '8px', 
                    width: '200px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                }}
            />

            <div style={{ overflowX: 'auto' }}>
                <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th
                                        {...column.getHeaderProps()}
                                        onClick={() => toggleColumn(column.id)}
                                        style={{
                                            padding: '12px 8px',
                                            borderBottom: '2px solid black',
                                            cursor: 'pointer',
                                            backgroundColor: hiddenColumns.has(column.id) ? '#ffcccc' : '#f9f9f9',
                                            position: 'relative'
                                        }}
                                    >
                                        {column.render('Header')}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        if (hiddenColumns.has(cell.column.id)) return null;
                                        return (
                                            <td
                                                {...cell.getCellProps()}
                                                style={{
                                                    padding: '8px',
                                                    borderBottom: '1px solid #ddd'
                                                }}
                                            >
                                                {cell.render('Cell')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default VistaGeneral; 