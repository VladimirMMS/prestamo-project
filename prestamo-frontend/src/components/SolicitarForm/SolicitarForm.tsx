import React, { useState } from "react";
import { TextField, MenuItem, Button, Typography } from "@mui/material";
import Modal from "../Modal/Modal";

interface LoanFormProps {
  open: boolean;
  onClose: () => void;
}

const LoanForm: React.FC<LoanFormProps> = ({ open, onClose }) => {
  const [monto, setMonto] = useState(0);
  const [plazo, setPlazo] = useState(3);

  const interes = 0.30; // 25% de interés
  const interesTotal = monto * interes;
  const montoTotal = monto + interesTotal;
  const cuotaMensual = montoTotal / plazo;

  return (
   <Modal childrens={
    <>
      <TextField
        fullWidth
        label="Monto a solicitar"
        type="number"
        value={monto}
        onChange={(e) => setMonto(Number(e.target.value))}
        margin="normal"
      />
      <TextField
        fullWidth
        label="Plazo en meses"
        select
        value={plazo}
        onChange={(e) => setPlazo(Number(e.target.value))}
        margin="normal"
      >
        {[3, 6, 9, 12, 18, 24].map((mes) => (
          <MenuItem key={mes} value={mes}>{mes} meses</MenuItem>
        ))}
      </TextField>
      <Typography variant="body1">Monto total del préstamo: RD${montoTotal.toFixed(2)}</Typography>
      <Typography variant="body1">Cuota mensual estimada: RD${cuotaMensual.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Solicitar
      </Button>
    </>
   } open={open} onClose={onClose} title={"Solicitar préstamo"}>
   </Modal>
  );
};

export default LoanForm;
