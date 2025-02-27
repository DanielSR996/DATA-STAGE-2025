import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

const Navbar = () => {
  return (
    <AppBar position="fixed" style={{ backgroundColor: '#4675eb' }}>
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Subir ZIP
          </Typography>
          <Button color="inherit">Subir ZIP</Button>
          <Button color="inherit">Subir ASC</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 