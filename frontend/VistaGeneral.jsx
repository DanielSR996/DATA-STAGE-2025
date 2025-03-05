import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';

function VistaGeneral() {
    const [datosGenerales, setDatosGenerales] = useState([]);
    const [transporteMercancias, setTransporteMercancias] = useState([]);
    const [activeTab, setActiveTab] = useState('datosGenerales');
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        fetch('http://localhost:3000/api/vista-general')
            .then(response => response.json())
            .then(data => {
                setDatosGenerales(data.datosGenerales || []);
                setTransporteMercancias(data.transporteMercancias || []);
            })
            .catch(error => console.error('Error al cargar los datos:', error));
    }, []);

    const handleBusqueda = (event) => {
        setBusqueda(event.target.value);
    };

    const filtrarDatos = (tabla) => {
        return tabla.filter(dato => 
            Object.values(dato).some(val => 
                String(val).toLowerCase().includes(busqueda.toLowerCase())
            )
        );
    };

    const columnsGenerales = React.useMemo(() => [
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
        { Header: 'Fecha Pago Real', accessor: 'Fecha_Pago_Real' },
    ], []);

    const columnsTransporte = React.useMemo(() => [
        { Header: 'Patente Aduanal', accessor: 'Patente_Aduanal' },
        { Header: 'Número Pedimento', accessor: 'Numero_Pedimento' },
        { Header: 'Clave Sec Aduanera Despacho', accessor: 'Clave_Sec_Aduanera_Despacho' },
        { Header: 'RFC Transportista', accessor: 'RFC_Transportista' },
        { Header: 'CURP Transportista', accessor: 'CURP_Transportista' },
        { Header: 'Nombre Razón Social Transportista', accessor: 'Nombre_Razon_Social_Transportista' },
        { Header: 'Clave País Transporte', accessor: 'Clave_Pais_Transporte' },
        { Header: 'Identificador Transporte', accessor: 'Identificador_Transporte' },
        { Header: 'Fecha Pago Real', accessor: 'Fecha_Pago_Real' },
    ], []);

    const tableInstance = useTable({
        columns: activeTab === 'datosGenerales' ? columnsGenerales : columnsTransporte,
        data: activeTab === 'datosGenerales' ? filtrarDatos(datosGenerales) : filtrarDatos(transporteMercancias),
    });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <div style={{ marginTop: '80px' }}>
            <div>
                <button onClick={() => setActiveTab('datosGenerales')}>Datos Generales</button>
                <button onClick={() => setActiveTab('transporteMercancias')}>Transporte Mercancías</button>
            </div>
            <input 
                type="text" 
                placeholder="Buscar..." 
                value={busqueda} 
                onChange={handleBusqueda} 
            />
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default VistaGeneral; 