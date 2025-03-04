import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  childrens: React.ReactNode;
}

export default function Modal({ open, onClose, title, childrens }: ModalProps) {
  return (

        <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            {childrens}
          </DialogContent>
        </Dialog>
      )
}
