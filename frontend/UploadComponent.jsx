import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const UploadComponent = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});

  const onDrop = (acceptedFiles) => {
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
    .then(() => {
      alert('Archivo subido con éxito');
      setProgress(0);
    })
    .catch((err) => {
      setError('Error al subir el archivo');
      console.error(err);
    });
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.zip' });

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
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
      } else {
        console.error('Error en la carga');
      }
    } catch (error) {
      console.error('Error en la carga', error);
    }

    setUploadStatus(status);
  };

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}>
      <input {...getInputProps()} />
      <p>Arrastra un archivo ZIP aquí, o haz clic para seleccionar uno</p>
      {progress > 0 && <CircularProgressbar value={progress} text={`${progress}%`} />}
      {error && <p style={{ color: 'red' }}>{error}</p>}
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