/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import LoanRequestForm from '../../components/SolicitarForm/SolicitarForm';
import { Box, Button, Typography, Divider, Chip } from '@mui/material';
import DataTable from '../../components/TableS/TableS';
import AddIcon from '@mui/icons-material/Add';
import { RootState } from '../../store';
import { fetchLoans } from '../../services/getLoansByUser';
import { useSelector } from 'react-redux';

export default function Solicitud() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const auth = useSelector((state: RootState) => state.login);

  useEffect(() => {
    fetchLoans(auth.id).then((data) => {
      setData(data)
      console.log(data)
    });
  }, [])

  const columns = [
    { field: 'id', headerName: 'ID', width: 80, editable: false },
    { field: 'monto', headerName: 'Monto Solicitado', width: 210, editable: false },
    { field: 'cuotas', headerName: 'Coutas A Pagar', width: 210, editable: false },
    { field: 'plazos', headerName: 'Plazos', width: 210, editable: false },
    { field: 'frecuencia', headerName: 'Frecuencia de pago', width: 210, editable: false },
    { field: 'tasa', headerName: 'Tasa de interés', width: 200, editable: false,  valueFormatter: (param: any) => `${param}%`.replace('.00', '') },
    {
      field: 'estado',
      headerName: 'Estado',
      width: 200,
      editable: false,
      renderCell: (params: any) => {
        let color = 'default';

        switch (params.value) {
          case 'Pendiente':
            color = 'warning';  // Amarillo
            break;
          case 'Aprobado':
            color = 'success';  // Verde
            break;
          case 'Rechazado':
            color = 'error';    // Rojo
            break;
          default:
            color = 'default';
        }

        return <Chip label={params.value} color={color} />;
      },
    },
    { field: 'cuenta', headerName: 'Cuenta Bancaria', width: 250, editable: false },
    { field: 'fecha', headerName: 'Fecha de solicitud', width: 250, editable: false },
    {
      field: 'motivoRechazo',
      headerName: 'Motivo de Rechazo',
      width: 200,
      editable: false,
      renderCell: (params: any) => {
        return params.row.estado === 'Rechazado' ? params.row.motivoRechazo : '-';
      },
    },
    // {
    //   field: 'actions',
    //   headerName: 'Acciones',
    //   width: 120,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <IconButton aria-label="edit" size="small" onClick={() => console.log('Edit clicked', params.row)}>
    //           <EditIcon fontSize="small" />
    //         </IconButton>
    //         <IconButton aria-label="delete" size="small" onClick={() => console.log('Delete clicked', params.row)}>
    //           <DeleteIcon fontSize="small" color="error" />
    //         </IconButton>
    //       </>
    //     );
    //   },
    // },
  ];

  const onActionModal = () => {
    setOpen(!open);
  };

  return (
    <Box margin={3}>
      {/* Título principal con mejor estilo */}
      <Typography
        variant="h4"
        fontWeight="bold"
        gutterBottom
        sx={{
          fontSize: { xs: '2rem', sm: '2.5rem', md: '2rem' },
          fontFamily: 'Roboto, sans-serif',
          letterSpacing: 0.5,
          color: 'primary.main',
          textAlign: 'center',
        }}
      >
        Solicitar Préstamo
      </Typography>

      {/* Sección del formulario sin Card */}
      <Box marginBottom={3}>
        <Divider sx={{ my: 2 }} />
        <Box marginBottom={2}>
          <Button
            variant="contained"
            onClick={onActionModal}
            startIcon={<AddIcon />}
            sx={{
              padding: '12px 24px',
              fontSize: '1rem',
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Nueva Solicitud
          </Button>
        </Box>
        <LoanRequestForm open={open} onClose={onActionModal} setData={setData} />
      </Box>

      {/* Card para la tabla de solicitudes con mejor padding y margen */}
      <Box sx={{ boxShadow: 5, borderRadius: 3, padding: 3 }}>

        <Divider sx={{ my: 2 }} />
        <DataTable
          columns={columns}
          rows={data}
          count={0}
          handlePageChange={() => {}}
          handleSort={() => {}}
          handleFilter={() => {}}
          page={1}
          message="Aún no hay solicitudes."
        />
      </Box>
    </Box>
  );
}