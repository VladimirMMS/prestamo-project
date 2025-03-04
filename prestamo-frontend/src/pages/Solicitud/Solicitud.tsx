import React, { useState } from 'react'
import LoanRequestForm from '../../components/SolicitarForm/SolicitarForm'
import { Box, Button, Typography } from '@mui/material'
import BasicTable from '../../components/TableS/TableS'

export default function Solicitud() {
 const [open, setOpen] =  useState(false)
  const onActionModal = () => {
    setOpen(!open)
  }
  return (
    <Box margin={1} alignItems={"center"}>
           <Typography variant="h5">Solicitar Prestamo</Typography>
        <Box height={300}>
        <Button variant="contained" onClick={onActionModal}>Solicitar Prestamo</Button>
          <LoanRequestForm open={open} onClose={onActionModal}></LoanRequestForm>
        </Box>
        <Box>
        <BasicTable></BasicTable>
        </Box>
    </Box>
  )
}
