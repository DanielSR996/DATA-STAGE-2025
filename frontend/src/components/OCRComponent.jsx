import React, { useState, useCallback } from 'react';
import './OCRComponent.css';

const OCRComponent = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [textSections, setTextSections] = useState([]);

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      const fileType = droppedFile.type;
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      
      if (validTypes.includes(fileType)) {
        setFile(droppedFile);
        setError('');
        
        // Crear preview de la imagen
        if (fileType.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => setImagePreview(e.target.result);
          reader.readAsDataURL(droppedFile);
        } else {
          setImagePreview(null);
        }
      } else {
        setError('Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF) y PDFs.');
      }
    }
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileType = selectedFile.type;
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
      
      if (validTypes.includes(fileType)) {
        setFile(selectedFile);
        setError('');
        
        // Crear preview de la imagen
        if (fileType.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => setImagePreview(e.target.result);
          reader.readAsDataURL(selectedFile);
        } else {
          setImagePreview(null);
        }
      } else {
        setError('Tipo de archivo no válido. Solo se permiten imágenes (JPG, PNG, GIF) y PDFs.');
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

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Iniciando verificación de conexión...');
      const healthCheck = await fetch('http://localhost:3001/api/health', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }).catch(err => {
        console.error('Error de conexión:', err);
        throw new Error('No se pudo conectar con el servidor. Por favor, verifica que el servidor esté en ejecución.');
      });

      if (!healthCheck.ok) {
        throw new Error(`El servidor respondió con estado ${healthCheck.status}`);
      }

      console.log('Conexión establecida, enviando archivo...');
      const response = await fetch('http://localhost:3001/api/ocr', {
        method: 'POST',
        body: formData,
      }).catch(err => {
        console.error('Error al enviar archivo:', err);
        throw new Error('Error al enviar el archivo al servidor');
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al procesar el archivo (${response.status})`);
      }

      const data = await response.json();
      const extractedText = data.text || '';
      setText(extractedText);
      
      // Dividir el texto en secciones basadas en saltos de línea y espacios
      const sections = extractedText.split(/\n\s*\n/).filter(section => section.trim());
      setTextSections(sections);
    } catch (err) {
      console.error('Error detallado:', err);
      if (err.message.includes('Failed to fetch') || err.message.includes('ERR_CONNECTION_REFUSED')) {
        setError('No se pudo conectar con el servidor. Por favor, verifica que:\n1. El servidor esté en ejecución\n2. El puerto 3001 esté disponible\n3. No haya un firewall bloqueando la conexión\n\nPara verificar, intenta acceder a: http://localhost:3001/api/health');
      } else {
        setError(err.message || 'Ocurrió un error al procesar el archivo');
      }
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // Opcional: Mostrar una notificación de éxito
      console.log('Texto copiado al portapapeles');
    }).catch(err => {
      console.error('Error al copiar texto:', err);
    });
  };

  return (
    <div className="ocr-container">
      <h2>Lector OCR</h2>
      <p className="description">
        Sube una imagen o PDF para extraer el texto
      </p>
      
      <form onSubmit={handleSubmit} className="ocr-form">
        <div 
          className={`file-input-container ${isDragging ? 'dragging' : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*,.pdf"
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
                  : 'Arrastra un archivo aquí o haz clic para seleccionar'}
            </p>
          </label>
        </div>
        
        <button 
          type="submit" 
          className="submit-button"
          disabled={loading || !file}
        >
          {loading ? 'Procesando...' : 'Extraer Texto'}
        </button>
      </form>

      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
          <p className="error-help">
            Si el problema persiste, verifica que:
            <br />
            1. El servidor esté en ejecución
            <br />
            2. Estés conectado a internet
            <br />
            3. El archivo sea válido (imagen o PDF)
          </p>
        </div>
      )}

      {(text || imagePreview) && (
        <div className="result-container">
          <div className="result-header">
            <h3>Resultado del OCR</h3>
            {text && (
              <button 
                onClick={() => copyToClipboard(text)}
                className="copy-button"
              >
                Copiar Todo
              </button>
            )}
          </div>
          
          <div className="result-content">
            {imagePreview && (
              <div className="image-preview">
                <h4>Imagen Original</h4>
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
            
            <div className="text-sections">
              <h4>Texto Extraído</h4>
              {text && !textSections.length && (
                <div className="text-section">
                  <div className="section-header">
                    <span className="section-title">Texto Completo</span>
                    <button 
                      onClick={() => copyToClipboard(text)}
                      className="copy-section-button"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="section-content">{text}</pre>
                </div>
              )}
              {textSections.map((section, index) => (
                <div key={index} className="text-section">
                  <div className="section-header">
                    <span className="section-title">Sección {index + 1}</span>
                    <button 
                      onClick={() => copyToClipboard(section)}
                      className="copy-section-button"
                    >
                      Copiar
                    </button>
                  </div>
                  <pre className="section-content">{section}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OCRComponent; 