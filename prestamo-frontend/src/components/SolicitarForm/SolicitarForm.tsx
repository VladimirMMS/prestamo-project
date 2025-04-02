/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  Box,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";
import Modal from "../Modal/Modal";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import { fetchAccounts } from "../../services/getAccount";
import { createLoanRequest } from "../../services/createLoan";
import { fetchLoans } from "../../services/getLoansByUser";

interface LoanFormProps {
  open: boolean;
  onClose: () => void;
  setData: any;
}

const LoanForm: React.FC<LoanFormProps> = ({ open, onClose, setData }) => {
  const tasaAnual = 30; // 30% de interés anual
  const [monto, setMonto] = useState<number | "">("");
  const [plazo, setPlazo] = useState<number | "">("");
  const [frecuencia, setFrecuencia] = useState("");
  const [cuentaBancaria, setCuentaBancaria] = useState("");
  const [cuentas, setCuentas] = useState<any[]>([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [errors, setErrors] = useState({
    monto: false,
    plazo: false,
    frecuencia: false,
    cuentaBancaria: false,
  });

  const auth = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (open) {
      fetchAccounts(auth.id).then((data) => {
        setCuentas(data);
      });
    }
  }, [auth.id, open]);

  const validateForm = () => {
    const newErrors = {
      monto: monto === "" || Number(monto) <= 0,
      plazo: plazo === "",
      frecuencia: frecuencia === "",
      cuentaBancaria: cuentaBancaria === "",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const calcularInteresFrances = (
    capital: number,
    tasaAnual: number,
    cuotas: number
  ) => {
    const tasaMensual = tasaAnual / 12 / 100;
    return (capital * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -cuotas));
  };

  const calcularNumeroCuotas = (meses: number, frecuencia: string) => {
    if (frecuencia === "semanal") return meses * 4;
    if (frecuencia === "quincenal") return meses * 2;
    return meses;
  };

  const numeroCuotas =
    plazo !== "" ? calcularNumeroCuotas(Number(plazo), frecuencia) : 0;
  const montoCuota =
    monto !== "" && plazo !== ""
      ? calcularInteresFrances(Number(monto), tasaAnual, numeroCuotas)
      : 0;
  const montoTotal = montoCuota * numeroCuotas;

  const handleSubmit = async () => {
    if (!validateForm()) {
      setAlertMessage("Por favor complete todos los campos requeridos");
      setAlertOpen(true);
      return;
    }

    try {
      const payload = {
        userId: auth.id,
        bankAccountId: Number(cuentaBancaria),
        amountRequested: Number(monto),
        termInMonths: Number(plazo),
        paymentFrequency: frecuencia,
        totalLoanAmount: montoTotal,
        installments: numeroCuotas,
        installmentAmount: montoCuota,
        interestRate: tasaAnual,
      };

      const response = await createLoanRequest(payload);
      if (response.status === 200) {
         fetchLoans(auth.id).then((data) => {
              setData(data)
            });
        onClose();
        resetForm();
      }
    } catch (error: any) {
      console.error("Error al solicitar préstamo:", error);
      setAlertMessage(
        error.response?.data?.message || "Error al solicitar préstamo"
      );
      setAlertOpen(true);
    }
  };

  const resetForm = () => {
    setMonto("");
    setPlazo("");
    setFrecuencia("");
    setCuentaBancaria("");
    setErrors({
      monto: false,
      plazo: false,
      frecuencia: false,
      cuentaBancaria: false,
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <>
      <Modal
        childrens={
          <Box p={2}>
            <Typography variant="h6" gutterBottom textAlign="center">
              Detalles del Préstamo
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Monto a solicitar"
                  type="number"
                  value={monto}
                  onChange={(e) =>
                    setMonto(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  margin="normal"
                  variant="outlined"
                  error={errors.monto}
                  helperText={errors.monto ? "Monto requerido y mayor a 0" : ""}
                  inputProps={{ min: "0" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Plazo en meses"
                  select
                  value={plazo}
                  onChange={(e) =>
                    setPlazo(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  margin="normal"
                  variant="outlined"
                  error={errors.plazo}
                  helperText={errors.plazo ? "Seleccione un plazo" : ""}
                >
                  <MenuItem value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  {[3, 6, 9, 12, 18, 24].map((mes) => (
                    <MenuItem key={mes} value={mes}>
                      {mes} meses
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Frecuencia de pago"
                  select
                  value={frecuencia}
                  onChange={(e) => setFrecuencia(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  error={errors.frecuencia}
                  helperText={
                    errors.frecuencia ? "Seleccione una frecuencia" : ""
                  }
                >
                  <MenuItem value="">
                    <em>Seleccione</em>
                  </MenuItem>
                  {[
                    { label: "Semanal", value: "semanal" },
                    { label: "Quincenal", value: "quincenal" },
                    { label: "Mensual", value: "mensual" },
                  ].map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cuenta bancaria a debitar"
                  select
                  value={cuentaBancaria}
                  onChange={(e) => setCuentaBancaria(e.target.value)}
                  margin="normal"
                  variant="outlined"
                  error={errors.cuentaBancaria}
                  helperText={
                    errors.cuentaBancaria ? "Seleccione una cuenta" : ""
                  }
                >
                  <MenuItem value="">
                    <em>Seleccione una cuenta</em>
                  </MenuItem>
                  {cuentas.map((cuenta) => (
                    <MenuItem key={cuenta.id} value={cuenta.id}>
                      {`${cuenta.accountNumber} - ${cuenta.bankName} (${cuenta.accountType})`}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            {monto !== "" && plazo !== "" && frecuencia !== "" && (
              <Box mt={2}>
                <Typography variant="body1">
                  Tasa de interés anual: {tasaAnual}%
                </Typography>
                <Typography variant="body1">
                  Monto total del préstamo: RD${montoTotal.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Monto por cuota ({frecuencia}): RD${montoCuota.toFixed(2)}
                </Typography>
                <Typography variant="body1">
                  Total de cuotas: {numeroCuotas}
                </Typography>
              </Box>
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2, py: 1.5, fontSize: "1rem" }}
              onClick={handleSubmit}
            >
              Solicitar
            </Button>
          </Box>
        }
        open={open}
        onClose={handleClose}
        title="Solicitar Préstamo"
      />
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default LoanForm;
