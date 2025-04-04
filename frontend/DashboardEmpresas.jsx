import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Button,
  Box,
  Paper
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';

const empresas = [
  {
    id: 'woco',
    nombre: 'Woco',
    descripcion: 'Sistema de gestión aduanera para Woco',
    color: '#1976d2',
    ruta: '/woco'
  },
  {
    id: 'signify',
    nombre: 'Signify',
    descripcion: 'Sistema de gestión aduanera para Signify',
    color: '#2e7d32',
    ruta: '/signify'
  }
];

const DashboardEmpresas = () => {
  const navigate = useNavigate();

  const handleNavigation = (ruta) => {
    navigate(ruta);
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      pt: 4
    }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ p: 4, mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom 
            color="primary"
            sx={{ fontWeight: 'bold' }}
          >
            Sistema de Gestión Aduanera
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Seleccione una empresa para comenzar
          </Typography>
        </Paper>
        
        <Grid container spacing={4}>
          {empresas.map((empresa) => (
            <Grid item xs={12} md={6} key={empresa.id}>
              <Card 
                sx={{ 
                  height: '100%', 
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    cursor: 'pointer',
                    boxShadow: 6
                  }
                }}
                onClick={() => handleNavigation(empresa.ruta)}
              >
                <CardMedia
                  sx={{
                    height: 200,
                    backgroundColor: empresa.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <BusinessIcon sx={{ fontSize: 100, color: 'white' }} />
                </CardMedia>
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Typography gutterBottom variant="h4" component="h2">
                    {empresa.nombre}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {empresa.descripcion}
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="large"
                    color="primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigation(empresa.ruta);
                    }}
                    sx={{ mt: 2 }}
                  >
                    Acceder al Sistema
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default DashboardEmpresas; 