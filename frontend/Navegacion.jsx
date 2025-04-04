import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import TableViewIcon from '@mui/icons-material/TableView';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Navegacion = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Woco - Sistema de Gestión Aduanera
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={Link}
            to="/woco/upload"
            startIcon={<CloudUploadIcon />}
          >
            SUBIR ZIP
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/woco/upload-asc"
            startIcon={<UploadFileIcon />}
          >
            SUBIR ASC
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/woco/vista-general"
            startIcon={<TableViewIcon />}
          >
            TABLAS
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navegacion;