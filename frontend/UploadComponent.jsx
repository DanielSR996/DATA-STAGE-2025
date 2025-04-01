import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

const UploadComponent = () => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [duplicatedFiles, setDuplicatedFiles] = useState([]);
  const [discrepancyAlert, setDiscrepancyAlert] = useState('');
  const [matchAlert, setMatchAlert] = useState('');
  const [archivoExistente, setArchivoExistente] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [archivoPendiente, setArchivoPendiente] = useState(null);

  const onDrop = (acceptedFiles) => {
    setIsUploading(true);
    setMessage('');
    setDuplicatedFiles([]);
    setDiscrepancyAlert('');
    setMatchAlert('');
    setArchivoExistente(null);
    setShowConfirmDialog(false);
    
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    setArchivoPendiente(formData);

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
      if (response.data.archivoExiste) {
        setArchivoExistente(response.data);
        setShowConfirmDialog(true);
        setMessage('El archivo ya existe en el servidor');
        setMessageType('warning');
      } else if (response.data.duplicated) {
        setMessage('Se encontraron registros duplicados en el archivo.');
        setMessageType('warning');
        setDuplicatedFiles(response.data.duplicatedFiles);
      } else {
        setMessage('Archivo subido con éxito');
        setMessageType('success');
      }

      if (response.data.discrepancy) {
        setDiscrepancyAlert('Discrepancia detectada en Total_Fracciones.');
      } else {
        setMatchAlert('Total_Fracciones coincide correctamente.');
      }

      setProgress(0);
    })
    .catch((error) => {
      if (error.response && error.response.status === 409) {
        setArchivoExistente(error.response.data);
        setShowConfirmDialog(true);
        setMessage('El archivo ya existe en el servidor');
        setMessageType('warning');
      } else {
        setMessage('Error al subir el archivo');
        setMessageType('error');
      }
      setProgress(0);
    })
    .finally(() => {
      setIsUploading(false);
    });
  };

  const handleConfirmUpload = async () => {
    if (archivoPendiente) {
      setIsUploading(true);
      setShowConfirmDialog(false);
      
      try {
        const response = await axios.post('http://localhost:3000/upload', archivoPendiente, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-Force-Upload': 'true'
          }
        });
        
        setMessage('Archivo subido con éxito');
        setMessageType('success');
      } catch (error) {
        setMessage('Error al subir el archivo');
        setMessageType('error');
      } finally {
        setIsUploading(false);
        setArchivoPendiente(null);
      }
    }
  };

  const handleCancelUpload = () => {
    setShowConfirmDialog(false);
    setArchivoExistente(null);
    setArchivoPendiente(null);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: '.zip' });

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setMessage('');
    setDuplicatedFiles([]);
    setDiscrepancyAlert('');
    setMatchAlert('');
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

  const getMessageClass = () => {
    switch (messageType) {
      case 'success':
        return 'green lighten-4 green-text text-darken-4';
      case 'error':
        return 'red lighten-4 red-text text-darken-4';
      case 'warning':
        return 'orange lighten-4 orange-text text-darken-4';
      default:
        return '';
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: '100px' }}>
      <Box {...getRootProps()} sx={{ border: '2px dashed #007BFF', padding: '20px', borderRadius: '10px', textAlign: 'center' }}>
        <input {...getInputProps()} />
        <Typography variant="h6" color="primary">Arrastra un archivo ZIP aquí, o haz clic para seleccionar uno</Typography>
      </Box>
      {isUploading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </Box>
      )}
      {progress > 0 && (
        <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
          <Box sx={{ width: '100%', mr: 1 }}>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="textSecondary">{`${progress}%`}</Typography>
          </Box>
        </Box>
      )}
      {message && (
        <Alert severity={messageType} sx={{ marginTop: '20px' }}>
          {message}
        </Alert>
      )}
      {duplicatedFiles.length > 0 && (
        <Alert severity="warning" sx={{ marginTop: '20px' }}>
          <Typography variant="body1">Registros duplicados encontrados:</Typography>
          {duplicatedFiles.map(({ tabla, registros }, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                Tabla: {tabla}
              </Typography>
              <Typography variant="body2" sx={{ ml: 2 }}>
                {registros.length} registros duplicados
              </Typography>
              <Box sx={{ ml: 4 }}>
                {registros.slice(0, 3).map((registro, idx) => (
                  <Typography key={idx} variant="body2">
                    • Patente: {registro.Patente_Aduanal}, 
                    Pedimento: {registro.Numero_Pedimento}, 
                    Clave: {registro.Clave_Sec_Aduanera_Despacho}
                  </Typography>
                ))}
                {registros.length > 3 && (
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    ... y {registros.length - 3} más
                  </Typography>
                )}
              </Box>
            </Box>
          ))}
        </Alert>
      )}
      {discrepancyAlert && (
        <Alert severity="warning" sx={{ marginTop: '20px' }}>
          {discrepancyAlert}
        </Alert>
      )}
      {matchAlert && (
        <Alert severity="success" sx={{ marginTop: '20px' }}>
          {matchAlert}
        </Alert>
      )}
      <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} onClick={handleUpload}>Subir Archivos</Button>

      {showConfirmDialog && archivoExistente && (
        <Dialog open={showConfirmDialog} onClose={handleCancelUpload}>
          <DialogTitle>Archivo Existente</DialogTitle>
          <DialogContent>
            <DialogContentText>
              El archivo "{archivoExistente.nombreArchivo}" ya existe en el servidor.
              ¿Desea continuar con la subida?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelUpload}>Cancelar</Button>
            <Button onClick={handleConfirmUpload} color="primary" variant="contained">
              Continuar
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default UploadComponent;