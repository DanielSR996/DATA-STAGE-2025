import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const NavegacionSignify = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Signify - Sistema de Gestión Aduanera
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/signify/upload">
            Carga de Archivos
          </Button>
          <Button color="inherit" component={Link} to="/signify/vista-general">
            Vista General
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavegacionSignify; 