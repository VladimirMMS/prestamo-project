/* eslint-disable @typescript-eslint/prefer-as-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Chip,
  Modal,
  IconButton,
  Link,
  Button,
  ButtonGroup,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  FormHelperText
} from '@mui/material';
import DataTable from '../../components/TableS/TableS';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { fetchLoansPending } from '../../services/getLoansPending';
import { updateLoanStatus } from '../../services/updateLoan';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  maxWidth: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflow: 'auto'
};

export default function Solicitud() {
  const [data, setData] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState<any>(null);
  const [loading, setLoading] = useState<{ [key: number]: boolean }>({});
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [currentLoanId, setCurrentLoanId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [rejectionError, setRejectionError] = useState('');
  const auth = useSelector((state: RootState) => state.login);

  const loadData = async () => {
    try {
      const loans = await fetchLoansPending();
      const mappedLoans = loans.map((loan: any) => {
        interface Document {
          type: string;
          url: string;
          name: string;
          extension: string;
        }

        interface BankAccount {
          number: string;
          bank: string;
          type: string;
        }

        interface Loan {
          id: number;
          cedula: string;
          fullName: string;
          amount: number;
          term: string;
          installmentAmount: number;
          interestRate: number;
          status: string;
          documents: Document[];
          bankAccount: BankAccount;
          rejectionReason?: string;
        }

        return {
          id: loan.id as number,
          cedula: loan.cedula as string,
          fullName: `${loan.fullName} ${loan.lastNames}` as string,
          amount: loan.amount as number,
          term: loan.term as string,
          installmentAmount: loan.installmentAmount as number,
          interestRate: loan.interestRate as number,
          status: loan.status as string,
          rejectionReason: loan.rejectionReason || '',
          documents: loan.user?.person?.personDocument
            ? loan.user.person.personDocument.map((doc: any): Document => ({
                type: doc.documentType as string,
                url: doc.document.route as string,
                name: doc.document.name as string,
                extension: doc.document.extension as string
              }))
            : (loan.documents || []) as Document[],
          bankAccount: {
            number: loan.bankAccount?.accountNumber || loan.bankAccount?.number as string,
            bank: loan.bankAccount?.bankName || loan.bankAccount?.bank as string,
            type: loan.bankAccount?.accountType || loan.bankAccount?.type || 'No especificado' as string
          } as BankAccount
        } as Loan;
      });
      setData(mappedLoans);
    } catch (error) {
      console.error('Error loading loans:', error);
    }
  };

  useEffect(() => {

    loadData();
  }, [auth.id]);

  const handleOpenModal = (document: any) => {
    setCurrentDocument(document);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentDocument(null);
  };

  const handleOpenRejectDialog = (loanId: number) => {
    setCurrentLoanId(loanId);
    setRejectionReason('');
    setRejectionError('');
    setRejectDialogOpen(true);
  };

  const handleCloseRejectDialog = () => {
    setRejectDialogOpen(false);
    setCurrentLoanId(null);
    setRejectionReason('');
    setRejectionError('');
  };

  const handleStatusChange = async (loanId: number, newStatus: string, reason?: string) => {
    try {
      setLoading(prev => ({ ...prev, [loanId]: true }));

      // Actualizar el estado en el backend
      await updateLoanStatus(loanId, newStatus, reason);
      await loadData();

      // Actualizar el estado local
      // setData(prevData =>
      //   prevData.map(loan =>
      //     loan.id === loanId
      //       ? {
      //           ...loan,
      //           status: newStatus,
      //           ...(reason && { rejectionReason: reason })
      //         }
      //       : loan
      //   )
      // );

      if (newStatus === 'Rechazado') {
        handleCloseRejectDialog();
      }
    } catch (error) {
      console.error('Error updating loan status:', error);
    } finally {
      setLoading(prev => ({ ...prev, [loanId]: false }));
    }
  };

  const handleRejectSubmit = () => {
    if (!rejectionReason.trim()) {
      setRejectionError('El motivo del rechazo es requerido');
      return;
    }

    if (currentLoanId) {
      handleStatusChange(currentLoanId, 'Rechazado', rejectionReason);
    }
  };

  const getDocumentIcon = (extension: string) => {
    switch (extension.toLowerCase()) {
      case 'pdf':
        return <PictureAsPdfIcon color="error" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <ImageIcon color="primary" />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'fullName', headerName: 'Nombre Completo', width: 200 },
    { field: 'cedula', headerName: 'Cédula', width: 150 },
    { field: 'amount', headerName: 'Monto', width: 120, valueFormatter: (param: any) => `RD${param}` },
    { field: 'term', headerName: 'Plazo', width: 100, },
    { field: 'installmentAmount', headerName: 'Cuotas a pagar', width: 120, valueFormatter: (param: any) => `RD${parseFloat(param).toFixed().toString()}.00` },
    { field: 'interestRate', headerName: 'Interés', width: 100, valueFormatter: (param: any) => `${param}%`.replace('.00', '') },
    {
      field: 'status',
      headerName: 'Estado',
      width: 120,
      renderCell: (params: any) => {
        let color = 'default';

        switch (params.value) {
          case 'Pendiente':
            color = 'warning';
            break;
          case 'Aprobado':
            color = 'success';
            break;
          case 'Rechazado':
            color = 'error';
            break;
          default:
            color = 'default';
        }

        return <Chip label={params.value} color={color as "default" | "warning" | "success" | "error" | "primary" | "secondary" | "info"} />;
      }
    },
    {
      field: 'documents',
      headerName: 'Documentos',
      width: 215,
      renderCell: (params: any) => (
        params.value.length > 0 ? (
          params.value.map((doc: any, index: number) => (
            <Chip
              key={index}
              icon={getDocumentIcon(doc.extension)}
              label={doc.name}
              onClick={() => handleOpenModal(doc)}
              sx={{ marginRight: 1, marginBottom: 1, cursor: 'pointer' }}
            />
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">No hay documentos</Typography>
        )
      )
    },
    {
      field: 'bankAccount',
      headerName: 'Cuenta Bancaria',
      width: 275,
      renderCell: (params: any) => (
        <span>
          {params.value.number} ({params.value.bank} - {params.value.type})
        </span>
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 280,
      renderCell: (params: any) => (
        <ButtonGroup variant="contained" style={{gap: '10px'}}>
          <Button
            color="success"
            startIcon={<CheckIcon />}
            onClick={() => handleStatusChange(params.row.id, 'Aprobado')}
            disabled={params.row.status !== 'Pendiente' || loading[params.row.id]}
          >
            Aprobar
          </Button>
          <Button
            color="error"
            startIcon={<ClearIcon />}
            onClick={() => handleOpenRejectDialog(params.row.id)}
            disabled={params.row.status !== 'Pendiente' || loading[params.row.id]}
          >
            Rechazar
          </Button>
        </ButtonGroup>
      )
    }
  ];

  return (
    <Box margin={3}>
      <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem', md: '2rem' }, fontFamily: 'Roboto, sans-serif', letterSpacing: 0.5, color: 'primary.main', textAlign: 'center' }}>Solicitudes Pendientes</Typography>
      <Box sx={{ boxShadow: 5, borderRadius: 3, padding: 3 }}>
        <Divider sx={{ my: 2 }} />
        <DataTable columns={columns} rows={data} count={data.length} handlePageChange={() => {}} handleSort={() => {}} handleFilter={() => {}} page={1} message="Aún no hay solicitudes." />
      </Box>

      {/* Modal para documentos */}
      <Modal open={openModal} onClose={handleCloseModal} aria-labelledby="document-modal-title">
        <Box sx={style}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography id="document-modal-title" variant="h6">{currentDocument?.name}</Typography>
            <IconButton onClick={handleCloseModal}><CloseIcon /></IconButton>
          </Box>
          {currentDocument && (currentDocument.extension.toLowerCase() === 'pdf' ?
            <iframe src={currentDocument.url} width="100%" height="500px" title="Documento PDF" /> :
            <img src={currentDocument.url} alt={currentDocument.name} style={{ maxWidth: '100%', maxHeight: '70vh' }} />)}
          <Typography mt={2} textAlign="center">
            <Link href={currentDocument?.url} target="_blank" rel="noopener" underline="hover">Abrir en nueva pestaña</Link>
          </Typography>
        </Box>
      </Modal>

      {/* Diálogo para motivo de rechazo */}
      <Dialog open={rejectDialogOpen} onClose={handleCloseRejectDialog} fullWidth maxWidth="sm">
        <DialogTitle>Motivo del rechazo</DialogTitle>
        <DialogContent>
          <FormControl fullWidth error={!!rejectionError}>
            <TextField
              autoFocus
              margin="dense"
              id="rejectionReason"
              label="Ingrese el motivo del rechazo"
              type="text"
              fullWidth
              variant="outlined"
              multiline
              rows={4}
              value={rejectionReason}
              onChange={(e) => {
                setRejectionReason(e.target.value);
                if (rejectionError) setRejectionError('');
              }}
              error={!!rejectionError}
            />
            {rejectionError && <FormHelperText>{rejectionError}</FormHelperText>}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseRejectDialog}>Cancelar</Button>
          <Button
            onClick={handleRejectSubmit}
            color="error"
            startIcon={<ClearIcon />}
            disabled={loading[currentLoanId || 0]}
          >
            {loading[currentLoanId || 0] ? 'Enviando...' : 'Confirmar Rechazo'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

