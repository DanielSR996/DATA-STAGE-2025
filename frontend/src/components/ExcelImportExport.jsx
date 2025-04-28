import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Typography, Paper, Alert, CircularProgress, List, ListItem, ListItemText, Collapse, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import InfoIcon from '@mui/icons-material/Info';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const ExcelImportExport = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [unmatchedColumns, setUnmatchedColumns] = useState([]);
  const [ignoredColumns, setIgnoredColumns] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setMessage({ type: '', text: '' });
    setUnmatchedColumns([]);
    setIgnoredColumns([]);
  };

  const handleDownloadTemplate = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/import/export-551', {
        responseType: 'blob'
      });
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'partidas_template.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      setMessage({ type: 'success', text: 'Plantilla descargada exitosamente' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error al descargar la plantilla' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'Por favor selecciona un archivo' });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('tableName', '551_partidas');

      const response = await axios.post('http://localhost:3000/api/import/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage({ 
        type: 'success', 
        text: `Datos importados exitosamente: ${response.data.recordsImported} registros`
      });
      
      if (response.data.unmatchedColumns && response.data.unmatchedColumns.length > 0) {
        setUnmatchedColumns(response.data.unmatchedColumns);
      }
      
      if (response.data.ignoredColumns && response.data.ignoredColumns.length > 0) {
        setIgnoredColumns(response.data.ignoredColumns);
      }
      
      setFile(null);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Error al importar los datos' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Importación/Exportación de Excel
        </Typography>

        {message.text && (
          <Alert severity={message.type} sx={{ mb: 2 }}>
            {message.text}
          </Alert>
        )}

        {(unmatchedColumns.length > 0 || ignoredColumns.length > 0) && (
          <Alert 
            severity="info" 
            icon={<InfoIcon />}
            sx={{ mb: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="subtitle2">
                Detalles de la importación
              </Typography>
              <IconButton
                size="small"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            </Box>

            <Collapse in={showDetails}>
              {ignoredColumns.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Columnas ignoradas (se dejaron en blanco):
                  </Typography>
                  <List dense>
                    {ignoredColumns.map((column, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={column} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {unmatchedColumns.length > 0 && (
                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    Columnas no mapeadas:
                  </Typography>
                  <List dense>
                    {unmatchedColumns.map((column, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={column} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Collapse>
          </Alert>
        )}

        <Box sx={{ mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<DownloadIcon />}
            onClick={handleDownloadTemplate}
            disabled={loading}
            sx={{ mb: 2 }}
          >
            Descargar Plantilla
          </Button>
        </Box>

        <Box sx={{ mb: 3 }}>
          <input
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
            >
              Seleccionar Archivo
            </Button>
          </label>
          {file && (
            <Typography variant="body2" sx={{ ml: 2 }}>
              Archivo seleccionado: {file.name}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          disabled={!file || loading}
          sx={{ mb: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Importar Datos'}
        </Button>
      </Paper>
    </Box>
  );
};

export default ExcelImportExport; 