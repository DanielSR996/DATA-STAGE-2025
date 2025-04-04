import React, { useState, useEffect, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  TablePagination,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  FileDownload as FileDownloadIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import axios from 'axios';
import * as XLSX from 'xlsx';

function VistaGeneralSignify() {
  const [datosGenerales, setDatosGenerales] = useState([]);
  const [transporteMercancias, setTransporteMercancias] = useState([]);
  const [guias, setGuias] = useState([]);
  const [contenedores, setContenedores] = useState([]);
  const [facturas, setFacturas] = useState([]);
  const [fechasPedimento, setFechasPedimento] = useState([]);
  const [casosPedimento, setCasosPedimento] = useState([]);
  const [cuentasAduanerasGarantiaPedimento, setCuentasAduanerasGarantiaPedimento] = useState([]);
  const [tasasPedimento, setTasasPedimento] = useState([]);
  const [contribucionesPedimento, setContribucionesPedimento] = useState([]);
  const [observacionesPedimento, setObservacionesPedimento] = useState([]);
  const [descargosMercancias, setDescargosMercancias] = useState([]);
  const [destinatariosMercancia, setDestinatariosMercancia] = useState([]);
  const [partidas, setPartidas] = useState([]);
  const [mercancias, setMercancias] = useState([]);
  const [permisosPartida, setPermisosPartida] = useState([]);
  const [casosPartida, setCasosPartida] = useState([]);
  const [cuentasAduanerasGarantiaPartida, setCuentasAduanerasGarantiaPartida] = useState([]);
  const [tasasContribucionesPartida, setTasasContribucionesPartida] = useState([]);
  const [contribucionesPartida, setContribucionesPartida] = useState([]);
  const [observacionesPartida, setObservacionesPartida] = useState([]);
  const [rectificaciones, setRectificaciones] = useState([]);
  const [diferenciasContribucionesPedimento, setDiferenciasContribucionesPedimento] = useState([]);
  const [incidenciasReconocimientoAduanero, setIncidenciasReconocimientoAduanero] = useState([]);
  const [resumen, setResumen] = useState([]);
  const [seleccionAutomatizada, setSeleccionAutomatizada] = useState([]);
  const [identificadoresPedimento, setIdentificadoresPedimento] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFloatingHeader, setShowFloatingHeader] = useState(false);
  const [selectedTable, setSelectedTable] = useState('datosGenerales');
  const [visibleColumns, setVisibleColumns] = useState({});
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const [exportOptions, setExportOptions] = useState({
    fechaInicio: '',
    fechaFin: '',
    formato: 'xlsx',
    todasLasTablas: true,
    tablasSeleccionadas: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/vista-general-signify');
        const data = response.data;

        setDatosGenerales(data.datosGenerales || []);
        setTransporteMercancias(data.transporteMercancias || []);
        setGuias(data.guias || []);
        setContenedores(data.contenedores || []);
        setFacturas(data.facturas || []);
        setFechasPedimento(data.fechasPedimento || []);
        setCasosPedimento(data.casosPedimento || []);
        setCuentasAduanerasGarantiaPedimento(data.cuentasAduanerasGarantiaPedimento || []);
        setTasasPedimento(data.tasasPedimento || []);
        setContribucionesPedimento(data.contribucionesPedimento || []);
        setObservacionesPedimento(data.observacionesPedimento || []);
        setDescargosMercancias(data.descargosMercancias || []);
        setDestinatariosMercancia(data.destinatariosMercancia || []);
        setPartidas(data.partidas || []);
        setMercancias(data.mercancias || []);
        setPermisosPartida(data.permisosPartida || []);
        setCasosPartida(data.casosPartida || []);
        setCuentasAduanerasGarantiaPartida(data.cuentasAduanerasGarantiaPartida || []);
        setTasasContribucionesPartida(data.tasasContribucionesPartida || []);
        setContribucionesPartida(data.contribucionesPartida || []);
        setObservacionesPartida(data.observacionesPartida || []);
        setRectificaciones(data.rectificaciones || []);
        setDiferenciasContribucionesPedimento(data.diferenciasContribucionesPedimento || []);
        setIncidenciasReconocimientoAduanero(data.incidenciasReconocimientoAduanero || []);
        setResumen(data.resumen || []);
        setSeleccionAutomatizada(data.seleccionAutomatizada || []);
        setIdentificadoresPedimento(data.identificadoresPedimento || []);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setError('Error al cargar los datos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      setShowFloatingHeader(scrollTop > 50);
    };

    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
      tableContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const columns = useMemo(() => {
    const guiasColumns = [
      { 
        Header: 'Patente Aduanal', 
        accessor: 'Patente_Aduanal',
        id: 'Patente_Aduanal'
      },
      { 
        Header: 'Número Pedimento', 
        accessor: 'Numero_Pedimento',
        id: 'Numero_Pedimento'
      },
      { 
        Header: 'Clave Sec. Aduanera Despacho', 
        accessor: 'Clave_Sec_Aduanera_Despacho',
        id: 'Clave_Sec_Aduanera_Despacho'
      },
      { 
        Header: 'Número Guía/Manifiesto', 
        accessor: 'Numero_Guia_Manifiesto',
        id: 'Numero_Guia_Manifiesto'
      },
      { 
        Header: 'Clave Tipo Guía', 
        accessor: 'Clave_Tipo_Guia',
        id: 'Clave_Tipo_Guia'
      },
      { 
        Header: 'Fecha Pago Real', 
        accessor: 'Fecha_Pago_Real',
        id: 'Fecha_Pago_Real'
      }
    ];

    return {
      guias: guiasColumns,
      // Agregar más definiciones de columnas según sea necesario
    };
  }, []);

  const toggleColumn = (columnId) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnId]: !prev[columnId]
    }));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterChange = (columnId, value) => {
    setFilters(prev => ({
      ...prev,
      [columnId]: value
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const handleExport = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/exportar-excel-signify', exportOptions, {
        responseType: 'blob'
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `reporte_signify_${exportOptions.fechaInicio}_${exportOptions.fechaFin}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error al exportar:', error);
    }
  };

  const getCurrentTableData = () => {
    switch (selectedTable) {
      case 'datosGenerales':
        return datosGenerales;
      case 'transporteMercancias':
        return transporteMercancias;
      case 'guias':
        return guias;
      case 'contenedores':
        return contenedores;
      case 'facturas':
        return facturas;
      case 'fechasPedimento':
        return fechasPedimento;
      case 'casosPedimento':
        return casosPedimento;
      case 'cuentasAduanerasGarantiaPedimento':
        return cuentasAduanerasGarantiaPedimento;
      case 'tasasPedimento':
        return tasasPedimento;
      case 'contribucionesPedimento':
        return contribucionesPedimento;
      case 'observacionesPedimento':
        return observacionesPedimento;
      case 'descargosMercancias':
        return descargosMercancias;
      case 'destinatariosMercancia':
        return destinatariosMercancia;
      case 'partidas':
        return partidas;
      case 'mercancias':
        return mercancias;
      case 'permisosPartida':
        return permisosPartida;
      case 'casosPartida':
        return casosPartida;
      case 'cuentasAduanerasGarantiaPartida':
        return cuentasAduanerasGarantiaPartida;
      case 'tasasContribucionesPartida':
        return tasasContribucionesPartida;
      case 'contribucionesPartida':
        return contribucionesPartida;
      case 'observacionesPartida':
        return observacionesPartida;
      case 'rectificaciones':
        return rectificaciones;
      case 'diferenciasContribucionesPedimento':
        return diferenciasContribucionesPedimento;
      case 'incidenciasReconocimientoAduanero':
        return incidenciasReconocimientoAduanero;
      case 'resumen':
        return resumen;
      case 'seleccionAutomatizada':
        return seleccionAutomatizada;
      default:
        return [];
    }
  };

  const filteredData = useMemo(() => {
    let data = getCurrentTableData();
    
    // Aplicar filtros
    Object.entries(filters).forEach(([columnId, value]) => {
      if (value) {
        data = data.filter(row => 
          String(row[columnId]).toLowerCase().includes(String(value).toLowerCase())
        );
      }
    });

    return data;
  }, [getCurrentTableData, filters]);

  const paginatedData = useMemo(() => {
    const startIndex = page * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, page, rowsPerPage]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Signify - Vista General
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Seleccionar Tabla</InputLabel>
            <Select
              value={selectedTable}
              onChange={(e) => setSelectedTable(e.target.value)}
              label="Seleccionar Tabla"
            >
              <MenuItem value="datosGenerales">Datos Generales</MenuItem>
              <MenuItem value="transporteMercancias">Transporte de Mercancías</MenuItem>
              <MenuItem value="guias">Guías</MenuItem>
              <MenuItem value="contenedores">Contenedores</MenuItem>
              <MenuItem value="facturas">Facturas</MenuItem>
              <MenuItem value="fechasPedimento">Fechas Pedimento</MenuItem>
              <MenuItem value="casosPedimento">Casos Pedimento</MenuItem>
              <MenuItem value="cuentasAduanerasGarantiaPedimento">Cuentas Aduaneras Garantía Pedimento</MenuItem>
              <MenuItem value="tasasPedimento">Tasas Pedimento</MenuItem>
              <MenuItem value="contribucionesPedimento">Contribuciones Pedimento</MenuItem>
              <MenuItem value="observacionesPedimento">Observaciones Pedimento</MenuItem>
              <MenuItem value="descargosMercancias">Descargos Mercancías</MenuItem>
              <MenuItem value="destinatariosMercancia">Destinatarios Mercancía</MenuItem>
              <MenuItem value="partidas">Partidas</MenuItem>
              <MenuItem value="mercancias">Mercancías</MenuItem>
              <MenuItem value="permisosPartida">Permisos Partida</MenuItem>
              <MenuItem value="casosPartida">Casos Partida</MenuItem>
              <MenuItem value="cuentasAduanerasGarantiaPartida">Cuentas Aduaneras Garantía Partida</MenuItem>
              <MenuItem value="tasasContribucionesPartida">Tasas Contribuciones Partida</MenuItem>
              <MenuItem value="contribucionesPartida">Contribuciones Partida</MenuItem>
              <MenuItem value="observacionesPartida">Observaciones Partida</MenuItem>
              <MenuItem value="rectificaciones">Rectificaciones</MenuItem>
              <MenuItem value="diferenciasContribucionesPedimento">Diferencias Contribuciones Pedimento</MenuItem>
              <MenuItem value="incidenciasReconocimientoAduanero">Incidencias Reconocimiento Aduanero</MenuItem>
              <MenuItem value="resumen">Resumen</MenuItem>
              <MenuItem value="seleccionAutomatizada">Selección Automatizada</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<FilterListIcon />}
              onClick={() => setFilterDialogOpen(true)}
            >
              Filtros
            </Button>
            <Button
              variant="contained"
              startIcon={<FileDownloadIcon />}
              onClick={() => setExportDialogOpen(true)}
            >
              Exportar
            </Button>
          </Box>
        </Grid>
      </Grid>

      <TableContainer component={Paper} className="table-container" sx={{ maxHeight: 'calc(100vh - 200px)' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {Object.keys(paginatedData[0] || {}).map((column) => (
                <TableCell key={column}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {column}
                    <IconButton
                      size="small"
                      onClick={() => toggleColumn(column)}
                    >
                      {visibleColumns[column] ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row, index) => (
              <TableRow key={index}>
                {Object.entries(row).map(([column, value]) => (
                  visibleColumns[column] !== false && (
                    <TableCell key={column}>{value}</TableCell>
                  )
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filteredData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filas por página:"
        rowsPerPageOptions={[5, 10, 25, 50]}
      />

      {/* Diálogo de Filtros */}
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)}>
        <DialogTitle>Filtros</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            {Object.keys(paginatedData[0] || {}).map((column) => (
              <TextField
                key={column}
                label={column}
                value={filters[column] || ''}
                onChange={(e) => handleFilterChange(column, e.target.value)}
                fullWidth
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={clearFilters}>
            <ClearIcon /> Limpiar
          </Button>
          <Button onClick={() => setFilterDialogOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo de Exportación */}
      <Dialog open={exportDialogOpen} onClose={() => setExportDialogOpen(false)}>
        <DialogTitle>Exportar a Excel</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Fecha Inicio"
              type="date"
              value={exportOptions.fechaInicio}
              onChange={(e) => setExportOptions({ ...exportOptions, fechaInicio: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Fecha Fin"
              type="date"
              value={exportOptions.fechaFin}
              onChange={(e) => setExportOptions({ ...exportOptions, fechaFin: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={exportOptions.todasLasTablas}
                  onChange={(e) => setExportOptions({ ...exportOptions, todasLasTablas: e.target.checked })}
                />
              }
              label="Exportar todas las tablas"
            />
            {!exportOptions.todasLasTablas && (
              <FormControl fullWidth>
                <InputLabel>Seleccionar Tablas</InputLabel>
                <Select
                  multiple
                  value={exportOptions.tablasSeleccionadas}
                  onChange={(e) => setExportOptions({ ...exportOptions, tablasSeleccionadas: e.target.value })}
                >
                  <MenuItem value="datosGenerales">Datos Generales</MenuItem>
                  <MenuItem value="transporteMercancias">Transporte de Mercancías</MenuItem>
                  <MenuItem value="guias">Guías</MenuItem>
                  <MenuItem value="contenedores">Contenedores</MenuItem>
                  <MenuItem value="facturas">Facturas</MenuItem>
                  <MenuItem value="fechasPedimento">Fechas Pedimento</MenuItem>
                  <MenuItem value="casosPedimento">Casos Pedimento</MenuItem>
                  <MenuItem value="cuentasAduanerasGarantiaPedimento">Cuentas Aduaneras Garantía Pedimento</MenuItem>
                  <MenuItem value="tasasPedimento">Tasas Pedimento</MenuItem>
                  <MenuItem value="contribucionesPedimento">Contribuciones Pedimento</MenuItem>
                  <MenuItem value="observacionesPedimento">Observaciones Pedimento</MenuItem>
                  <MenuItem value="descargosMercancias">Descargos Mercancías</MenuItem>
                  <MenuItem value="destinatariosMercancia">Destinatarios Mercancía</MenuItem>
                  <MenuItem value="partidas">Partidas</MenuItem>
                  <MenuItem value="mercancias">Mercancías</MenuItem>
                  <MenuItem value="permisosPartida">Permisos Partida</MenuItem>
                  <MenuItem value="casosPartida">Casos Partida</MenuItem>
                  <MenuItem value="cuentasAduanerasGarantiaPartida">Cuentas Aduaneras Garantía Partida</MenuItem>
                  <MenuItem value="tasasContribucionesPartida">Tasas Contribuciones Partida</MenuItem>
                  <MenuItem value="contribucionesPartida">Contribuciones Partida</MenuItem>
                  <MenuItem value="observacionesPartida">Observaciones Partida</MenuItem>
                  <MenuItem value="rectificaciones">Rectificaciones</MenuItem>
                  <MenuItem value="diferenciasContribucionesPedimento">Diferencias Contribuciones Pedimento</MenuItem>
                  <MenuItem value="incidenciasReconocimientoAduanero">Incidencias Reconocimiento Aduanero</MenuItem>
                  <MenuItem value="resumen">Resumen</MenuItem>
                  <MenuItem value="seleccionAutomatizada">Selección Automatizada</MenuItem>
                </Select>
              </FormControl>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setExportDialogOpen(false)}>Cancelar</Button>
          <Button onClick={handleExport} variant="contained" color="primary">
            Exportar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default VistaGeneralSignify; 