import React, { useState, useEffect } from 'react';

function VistaGeneral() {
    const [datos, setDatos] = useState({});
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        fetch('/api/vista-general')
            .then(response => response.json())
            .then(data => setDatos(data))
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

    return (
        <div>
            <input 
                type="text" 
                placeholder="Buscar..." 
                value={busqueda} 
                onChange={handleBusqueda} 
            />
            <h2>Datos Generales</h2>
            <table>
                <thead>
                    <tr>
                        <th>Patente Aduanal</th>
                        <th>Número Pedimento</th>
                        <th>Clave Sec Aduanera Despacho</th>
                        <th>Clave Tipo Operación</th>
                        <th>Clave Documento</th>
                        <th>Clave Sec Aduanera Entrada</th>
                        <th>CURP Contribuyente</th>
                        <th>RFC Contribuyente</th>
                        <th>CURP Agente Aduanal</th>
                        <th>Tipo Cambio</th>
                        <th>Total Fletes</th>
                        <th>Total Seguros</th>
                        <th>Total Embalajes</th>
                        <th>Total Otros Incrementables</th>
                        <th>Total Otros Deducibles</th>
                        <th>Peso Bruto Mercancía</th>
                        <th>Clave Medio Transporte Salida</th>
                        <th>Clave Medio Transporte Arribo</th>
                        <th>Clave Medio Transporte Entrada Salida</th>
                        <th>Clave Destino Mercancía</th>
                        <th>Nombre Contribuyente</th>
                        <th>Calle Domicilio Contribuyente</th>
                        <th>Número Interior Domicilio Contribuyente</th>
                        <th>Número Exterior Domicilio Contribuyente</th>
                        <th>Código Postal Domicilio Contribuyente</th>
                        <th>Municipio Ciudad Domicilio Contribuyente</th>
                        <th>Clave Entidad Federativa Domicilio Contribuyente</th>
                        <th>Clave País Domicilio Contribuyente</th>
                        <th>Clave Tipo Pedimento</th>
                        <th>Fecha Recepción</th>
                        <th>Fecha Pago Real</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarDatos(datos.datosGenerales || []).map((dato, index) => (
                        <tr key={index}>
                            <td>{dato.Patente_Aduanal}</td>
                            <td>{dato.Numero_Pedimento}</td>
                            <td>{dato.Clave_Sec_Aduanera_Despacho}</td>
                            <td>{dato.Clave_Tipo_Operacion}</td>
                            <td>{dato.Clave_Documento}</td>
                            <td>{dato.Clave_Sec_Aduanera_Entrada}</td>
                            <td>{dato.CURP_Contribuyente}</td>
                            <td>{dato.RFC_Contribuyente}</td>
                            <td>{dato.CURP_Agente_Aduanal}</td>
                            <td>{dato.Tipo_Cambio}</td>
                            <td>{dato.Total_Fletes}</td>
                            <td>{dato.Total_Seguros}</td>
                            <td>{dato.Total_Embalajes}</td>
                            <td>{dato.Total_Otros_Incrementables}</td>
                            <td>{dato.Total_Otros_Deducibles}</td>
                            <td>{dato.Peso_Bruto_Mercancia}</td>
                            <td>{dato.Clave_Medio_Transporte_Salida}</td>
                            <td>{dato.Clave_Medio_Transporte_Arribo}</td>
                            <td>{dato.Clave_Medio_Transporte_Entrada_Salida}</td>
                            <td>{dato.Clave_Destino_Mercancia}</td>
                            <td>{dato.Nombre_Contribuyente}</td>
                            <td>{dato.Calle_Domicilio_Contribuyente}</td>
                            <td>{dato.Numero_Interior_Domicilio_Contribuyente}</td>
                            <td>{dato.Numero_Exterior_Domicilio_Contribuyente}</td>
                            <td>{dato.Codigo_Postal_Domicilio_Contribuyente}</td>
                            <td>{dato.Municipio_Ciudad_Domicilio_Contribuyente}</td>
                            <td>{dato.Clave_Entidad_Federativa_Domicilio_Contribuyente}</td>
                            <td>{dato.Clave_Pais_Domicilio_Contribuyente}</td>
                            <td>{dato.Clave_Tipo_Pedimento}</td>
                            <td>{dato.Fecha_Recepcion}</td>
                            <td>{dato.Fecha_Pago_Real}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Transporte Mercancías</h2>
            <table>
                <thead>
                    <tr>
                        <th>Patente Aduanal</th>
                        <th>Número Pedimento</th>
                        <th>Clave Sec Aduanera Despacho</th>
                        <th>RFC Transportista</th>
                        <th>CURP Transportista</th>
                        <th>Nombre Razón Social Transportista</th>
                        <th>Clave País Transporte</th>
                        <th>Identificador Transporte</th>
                        <th>Fecha Pago Real</th>
                    </tr>
                </thead>
                <tbody>
                    {filtrarDatos(datos.transporteMercancias || []).map((dato, index) => (
                        <tr key={index}>
                            <td>{dato.Patente_Aduanal}</td>
                            <td>{dato.Numero_Pedimento}</td>
                            <td>{dato.Clave_Sec_Aduanera_Despacho}</td>
                            <td>{dato.RFC_Transportista}</td>
                            <td>{dato.CURP_Transportista}</td>
                            <td>{dato.Nombre_Razon_Social_Transportista}</td>
                            <td>{dato.Clave_Pais_Transporte}</td>
                            <td>{dato.Identificador_Transporte}</td>
                            <td>{dato.Fecha_Pago_Real}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default VistaGeneral; 