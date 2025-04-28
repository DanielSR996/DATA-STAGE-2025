import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
  Typography,
  Alert,
  Snackbar
} from '@mui/material';

const API_URL = 'http://localhost:3000';

const VistaGeneralWoco = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [totalRows, setTotalRows] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const loadData = async (page = 0) => {
    try {
      setLoading(true);
      setError(null);
      console.log('Iniciando carga de datos...');
      
      const url = `${API_URL}/api/woco/vista-general`;
      const params = {
        page: page + 1,
        limit: rowsPerPage
      };

      console.log('URL y parámetros:', { url, params });
      
      const response = await axios.get(url, { params });
      console.log('Respuesta completa:', response);

      if (response.data && Array.isArray(response.data.datos)) {
        console.log('Datos recibidos:', response.data.datos);
        setData(response.data.datos);
        setTotalRows(response.data.pagination?.total || 0);
      } else {
        console.error('Formato de datos inválido:', response.data);
        throw new Error('Los datos recibidos no tienen el formato esperado');
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
      setError(error.message || 'Error al cargar los datos. Por favor, verifica que el servidor esté corriendo.');
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('Efecto ejecutado, página:', page);
    loadData(page);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    console.log('Cambiando página a:', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    console.log('Cambiando filas por página a:', event.target.value);
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(value || 0);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-MX');
  };

  if (loading && data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  console.log('Renderizando tabla con datos:', data);

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patente Aduanal</TableCell>
                <TableCell>Número Pedimento</TableCell>
                <TableCell>Clave Sec. Aduanera</TableCell>
                <TableCell>Fecha Pago</TableCell>
                <TableCell>RFC Contribuyente</TableCell>
                <TableCell>Nombre Contribuyente</TableCell>
                <TableCell align="right">Valor Comercial</TableCell>
                <TableCell align="right">Valor Aduana</TableCell>
                <TableCell align="right">Total Contribuciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length > 0 ? (
                data.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.Patente_Aduanal || '-'}</TableCell>
                    <TableCell>{row.Numero_Pedimento || '-'}</TableCell>
                    <TableCell>{row.Clave_Sec_Aduanera_Despacho || '-'}</TableCell>
                    <TableCell>{formatDate(row.Fecha_Pago_Real)}</TableCell>
                    <TableCell>{row.RFC_Contribuyente || '-'}</TableCell>
                    <TableCell>{row.Nombre_Contribuyente || '-'}</TableCell>
                    <TableCell align="right">{formatCurrency(row.Valor_Comercial)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.Valor_Aduana)}</TableCell>
                    <TableCell align="right">{formatCurrency(row.Total_Contribuciones)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No hay datos disponibles
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
        />
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default VistaGeneralWoco; 