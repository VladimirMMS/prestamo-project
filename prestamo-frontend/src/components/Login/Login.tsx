import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box, Paper, Link } from "@mui/material";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    correo: "",
    contraseña: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={6} style={{ padding: 30, backgroundColor: "white", borderRadius: 10, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "100%" }}>
        <Typography variant="h4" gutterBottom align="center">Login</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Correo" name="correo" type="email" value={formData.correo} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Contraseña" name="contraseña" type="password" value={formData.contraseña} onChange={handleChange} margin="normal" required />
          <Box mt={3} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary" size="large">Ingresar</Button>
          </Box>
        </form>
        <Box mt={2} display="flex" justifyContent="center">
          <Typography variant="body2">¿No tienes una cuenta? <Link href="/registrar">Regístrate aquí</Link></Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
