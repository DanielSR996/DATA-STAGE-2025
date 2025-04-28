import React, { useState } from 'react';
import './ExcelImportComponent.css';

const ExcelImportComponent = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileType = droppedFile.type;
      const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
      
      if (validTypes.includes(fileType)) {
        setFile(droppedFile);
        setError('');
      } else {
        setError('Tipo de archivo no válido. Solo se permiten archivos Excel (.xlsx, .xls)');
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const validTypes = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'];
      
      if (validTypes.includes(fileType)) {
        setFile(selectedFile);
        setError('');
      } else {
        setError('Tipo de archivo no válido. Solo se permiten archivos Excel (.xlsx, .xls)');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Por favor, selecciona un archivo');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3001/api/excel/import', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al procesar el archivo');
      }

      const data = await response.json();
      setSuccess(`Archivo procesado exitosamente. ${data.registrosProcesados} registros importados.`);
      setFile(null);
    } catch (err) {
      setError(err.message || 'Ocurrió un error al procesar el archivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="excel-import-container">
      <h2>Importar Datos desde Excel</h2>
      <p className="description">
        Sube un archivo Excel para importar datos a la tabla de compras. 
        El archivo debe tener los encabezados de columna que coincidan con los campos de la base de datos.
      </p>
      
      <form onSubmit={handleSubmit} className="excel-import-form">
        <div 
          className={`file-input-container ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileChange}
            className="file-input"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="file-input-label">
            <p className="file-input-text">
              {isDragging 
                ? 'Suelta el archivo aquí' 
                : file 
                  ? `Archivo seleccionado: ${file.name}` 
                  : 'Arrastra un archivo Excel aquí o haz clic para seleccionar'}
            </p>
          </label>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !file}
        >
          {loading ? 'Procesando...' : 'Importar Datos'}
        </button>
      </form>

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      )}

      {success && (
        <div className="success-container">
          <p className="success-message">{success}</p>
        </div>
      )}

      <div className="instructions">
        <h3>Instrucciones:</h3>
        <ol>
          <li>El archivo Excel debe tener los siguientes encabezados de columna exactamente como se muestran:</li>
          <ul>
            <li>Pedimento</li>
            <li>FOLIO FOSS</li>
            <li>Factura</li>
            <li>NOMBREPROVEEDOR</li>
            <li>Código Proveedor</li>
            <li>Incoterm</li>
            <li>Cove</li>
            <li>Número de Parte</li>
            <li>Descripcion</li>
            <li>UM FACT</li>
            <li>Cantidad</li>
            <li>Fecha Factura</li>
            <li>Precio Unitario</li>
            <li>MONEDA</li>
            <li>Valor Moneda Extranjera</li>
            <li>FACTOR DE CONVERSION</li>
            <li>Unidad</li>
            <li>Factor Moneda</li>
            <li>Valor Dólares</li>
            <li>Fracción partida Pedimento</li>
            <li>Secuencia</li>
            <li>PESO UNIT ESTIMADO</li>
            <li>PESO TOTAL</li>
            <li>tc</li>
            <li>vcom</li>
            <li>fact incr</li>
            <li>Vadu mxn</li>
            <li>Pedimento-Fracción partida Pedimento-Secuencia</li>
            <li>NIC'S</li>
            <li>PRECION UNITARIO SIN EB</li>
            <li>VALOR ME SIN EB</li>
          </ul>
          <li>Los datos deben comenzar desde la segunda fila (después de los encabezados)</li>
          <li>Los formatos de fecha deben ser válidos (YYYY-MM-DD)</li>
          <li>Los valores numéricos deben estar en el formato correcto</li>
        </ol>
      </div>
    </div>
  );
};

export default ExcelImportComponent; 