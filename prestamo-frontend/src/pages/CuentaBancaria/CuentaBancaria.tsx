import { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Box,
  CardContent,
  Card,
  Grid,
  Divider,
} from "@mui/material";
import BankAccountTable from "../../components/BankAccountTable/BankAccountTable";
import BankAccountForm from "../../components/BankAccountForm/BankAccountForm";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { fetchAccounts } from "../../services/getAccount";
import { createAccount } from "../../services/createAccount";
import { updateAccountUser } from "../../services/updateAccount";
import { deleteAccount } from "../../services/deleteAccount";

interface BankAccount {
  id: number;
  accountNumber: string;
  bankName: string;
  userId: number;
}

export default function CuentaBancaria() {
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<BankAccount>>({});
  const [page, setPage] = useState(0);
  const auth = useSelector((state: RootState) => state.login);

  useEffect(() => {
    fetchAccounts(auth.id).then((data) => setAccounts(data));
  }, [page]);

  const handleSubmit = async () => {
    formData.userId = auth.id;
    if (formData.id) {
      await updateAccountUser(formData);
    } else {

      await createAccount(formData);
    }
    fetchAccounts(auth.id).then((data) => setAccounts(data));
    setOpen(false);
    setFormData({});
  };

  const handleDelete = async (id: number) => {
    await deleteAccount(id);
    fetchAccounts(auth.id).then((data) => setAccounts(data));
  };

  return (
    <Box sx={{ mt: 3, px: 3 }}>
      {/* Título */}
      <Typography
        variant="h5"
        fontWeight="bold"
        textAlign={"center"}
        gutterBottom
        sx={{
          fontSize: { xs: "1.1rem", sm: "2rem", md: "2rem" },
          fontFamily: "Poppins, sans-serif",
          letterSpacing: 1,
          color: "primary.main",
        }}
      >
        Cuentas de Banco
      </Typography>

      {/* Sección Principal */}
      <Divider sx={{ my: 2 }} />
      <Card sx={{ p: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            {/* Botón Agregar */}
            <Grid item xs={12} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
              >
                Agregar Cuenta
              </Button>
            </Grid>

            {/* Tabla de Cuentas */}
            <Grid item xs={12}>
              <BankAccountTable
                accounts={accounts}
                handleDelete={handleDelete}
                message="No hay cuentas configuradas."
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Formulario (Modal o Dialog) */}
      <BankAccountForm
        open={open}
        setOpen={setOpen}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </Box>
  );
}
