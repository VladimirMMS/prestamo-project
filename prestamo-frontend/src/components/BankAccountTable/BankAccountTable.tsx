/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button } from "@mui/material";
import DataTable from "../TableS/TableS";

interface BankAccount {
  id: number;
  accountNumber: string;
  bankName: string;
}

interface Props {
  accounts: BankAccount[];
  handleDelete: (id: number) => void;
  message: string;
}

export default function BankAccountTable({ accounts, handleDelete, message }: Props) {
  const columns = [
    { field: "accountNumber", headerName: "Numero de cuenta", flex: 1 },
    { field: "bankName", headerName: "Nombre del Banco", flex: 1 },
    { field: "currencyType", headerName: "Tipo de Moneda", flex: 1 },
    { field: "accountType", headerName: "Tipo de Cuenta", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params: any) => (
        <Box >
          <Button variant="outlined" color="error" size="small" onClick={() => handleDelete(params.row.id)}>
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  return <DataTable columns={columns} rows={accounts} count={accounts.length} page={0} message={message}/>;
}
