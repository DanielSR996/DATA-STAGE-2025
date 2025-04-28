import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [excelMenuAnchor, setExcelMenuAnchor] = useState(null);
  const open = Boolean(anchorEl);
  const excelMenuOpen = Boolean(excelMenuAnchor);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExcelMenuClick = (event) => {
    setExcelMenuAnchor(event.currentTarget);
  };

  const handleExcelMenuClose = () => {
    setExcelMenuAnchor(null);
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#4675eb' }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Logo y título */}
          <Typography variant="h6" component={Link} to="/" sx={{ 
            textDecoration: 'none', 
            color: 'white',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center'
          }}>
            Sistema de Gestión Aduanera
          </Typography>

          {/* Menú de navegación para pantallas grandes */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' }, 
            gap: 2,
            alignItems: 'center'
          }}>
            {/* SIGNIFY */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#fff', opacity: 0.9 }}>
                SIGNIFY
              </Typography>
              <Button 
                component={Link} 
                to="/upload" 
                sx={{ color: 'white', fontSize: '0.9rem' }}
              >
                Subir ZIP
              </Button>
              <Button 
                component={Link} 
                to="/tablas" 
                sx={{ color: 'white', fontSize: '0.9rem' }}
              >
                Tablas
              </Button>
            </Box>

            {/* WOCO */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ color: '#fff', opacity: 0.9 }}>
                WOCO
              </Typography>
              <Button 
                component={Link} 
                to="/woco/upload" 
                sx={{ color: 'white', fontSize: '0.9rem' }}
              >
                Subir ZIP
              </Button>
              <Button 
                component={Link} 
                to="/woco/tablas" 
                sx={{ color: 'white', fontSize: '0.9rem' }}
              >
                Tablas
              </Button>
            </Box>

            {/* Herramientas */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button 
                onClick={handleExcelMenuClick}
                sx={{ color: 'white', fontSize: '0.9rem' }}
              >
                Excel
              </Button>
              <Menu
                anchorEl={excelMenuAnchor}
                open={excelMenuOpen}
                onClose={handleExcelMenuClose}
              >
                <MenuItem component={Link} to="/excel" onClick={handleExcelMenuClose}>
                  Exportar Datos
                </MenuItem>
                <MenuItem component={Link} to="/excel/import" onClick={handleExcelMenuClose}>
                  Importar Compras
                </MenuItem>
              </Menu>
              <Button 
                component={Link} 
                to="/ocr" 
                sx={{ color: 'white', fontSize: '0.9rem' }}
              >
                OCR
              </Button>
            </Box>
          </Box>

          {/* Menú hamburguesa para pantallas pequeñas */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
            >
              <MenuItem component={Link} to="/upload">SIGNIFY - Subir ZIP</MenuItem>
              <MenuItem component={Link} to="/tablas">SIGNIFY - Tablas</MenuItem>
              <MenuItem component={Link} to="/woco/upload">WOCO - Subir ZIP</MenuItem>
              <MenuItem component={Link} to="/woco/tablas">WOCO - Tablas</MenuItem>
              <MenuItem component={Link} to="/excel">Exportar Datos</MenuItem>
              <MenuItem component={Link} to="/excel/import">Importar Compras</MenuItem>
              <MenuItem component={Link} to="/ocr">OCR</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 