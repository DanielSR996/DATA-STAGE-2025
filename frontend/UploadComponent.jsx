import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import 'react-circular-progressbar/dist/styles.css';

const UploadComponent = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [duplicatedFiles, setDuplicatedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    setIsUploading(true);
    setMessage('');
    setDuplicatedFiles([]);
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);

    axios.post('http://localhost:3000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      },
    })
    .then((response) => {
      if (response.data.duplicated) {
        setMessage('Algunos archivos ya han sido subidos anteriormente.');
        setMessageType('warning');
        setDuplicatedFiles(response.data.duplicatedFiles);
      } else {
        setMessage('Archivo subido con éxito');
        setMessageType('success');
      }
      setProgress(100);
    })
    .catch((err) => {
      setError('Error al subir el archivo');
      setMessageType('error');
      console.error(err);
    })
    .finally(() => {
      setIsUploading(false);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.zip' });

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setMessage('');
    setDuplicatedFiles([]);
    const formData = new FormData();
    const status = {};

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        result.forEach(file => {
          status[file.name] = file.uploaded ? 'Subido' : 'No subido';
        });
        setMessage('Archivos subidos con éxito');
        setMessageType('success');
      } else {
        setMessage('Error en la carga');
        setMessageType('error');
        console.error('Error en la carga');
      }
    } catch (error) {
      setMessage('Error en la carga');
      setMessageType('error');
      console.error('Error en la carga', error);
    } finally {
      setIsUploading(false);
    }

    setUploadStatus(status);
  };

  const getMessageStyle = () => {
    switch (messageType) {
      case 'success':
        return { color: 'green', fontWeight: 'bold' };
      case 'error':
        return { color: 'red', fontWeight: 'bold' };
      case 'warning':
        return { color: 'orange', fontWeight: 'bold' };
      default:
        return {};
    }
  };

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Arrastra un archivo ZIP aquí, o haz clic para seleccionar uno</p>
      {isUploading && (
        <div style={{ width: '100%', backgroundColor: '#f3f3f3', borderRadius: '5px', margin: '10px 0' }}>
          <div
            style={{
              width: `${progress}%`,
              height: '10px',
              backgroundColor: progress === 100 ? 'green' : '#4caf50',
              borderRadius: '5px',
              transition: 'width 0.2s ease-in-out',
            }}
          />
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={getMessageStyle()}>{message}</p>}
      {duplicatedFiles.length > 0 && (
        <div>
          <p>Archivos duplicados:</p>
          <ul>
            {duplicatedFiles.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir Archivos</button>
      <div>
        {Object.entries(uploadStatus).map(([fileName, status]) => (
          <div key={fileName}>
            {fileName}: {status}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadComponent;