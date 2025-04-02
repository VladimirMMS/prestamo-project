import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

export enum CurrencyType {
  PESO_DO = 'PESO DO',
  DOALRES = 'DOALRES USD',
}

export enum AccountType {
  CORRIENTE = 'CORRIENTE',
  AHORROS = 'AHORROS',
}

interface BankAccount {
  id?: number;
  accountNumber?: string;
  bankName?: string;
  currencyType?: CurrencyType;
  accountType?: AccountType;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  formData: Partial<BankAccount>;
  setFormData: (formData: Partial<BankAccount>) => void;
  handleSubmit: () => void;
}

export default function BankAccountForm({ open, setOpen, formData, setFormData, handleSubmit }: Props) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle>{formData.id ? "Editar" : "Agregar"} Cuenta de Banco</DialogTitle>
      <DialogContent>
      <TextField
            fullWidth
            label="Nombre del Banco"
            value={formData.bankName || ""}
            onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
          />
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <TextField
            fullWidth
            label="Número de Cuenta"
            value={formData.accountNumber || ""}
            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
          />

          <FormControl fullWidth>
            <InputLabel>Tipo de Moneda</InputLabel>
            <Select
              value={formData.currencyType || ''}
              label="Tipo de Moneda"
              onChange={(e) => setFormData({ ...formData, currencyType: e.target.value as CurrencyType })}
            >
              <MenuItem value={CurrencyType.PESO_DO}>{CurrencyType.PESO_DO}</MenuItem>
              <MenuItem value={CurrencyType.DOALRES}>{CurrencyType.DOALRES}</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Tipo de Cuenta</InputLabel>
            <Select
              value={formData.accountType || ''}
              label="Tipo de Cuenta"
              onChange={(e) => setFormData({ ...formData, accountType: e.target.value as AccountType })}
            >
              <MenuItem value={AccountType.CORRIENTE}>Cuenta Corriente</MenuItem>
              <MenuItem value={AccountType.AHORROS}>Cuenta de Ahorros</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">Cancelar</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}