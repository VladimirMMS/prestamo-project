/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
  Link,
} from "@mui/material";
import { loginUser } from "../../services/login";
import { useDispatch } from "react-redux";
import { AppDispatch,  } from "../../store";
import { login } from "../../store/client";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginUser(formData);
      if (response.statusCode || response.code || response.error) {
        throw new Error("Usuario o contraseña incorrectos");
      }
      dispatch(login(response));
      navigate("/");

    } catch (error: any) {
      setErrorMessage(error.message || "Ocurrió un error inesperado");
    }
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={6}
        style={{
          padding: 30,
          backgroundColor: "white",
          borderRadius: 10,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Correo"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
          />
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Ingresar
            </Button>
          </Box>
        </form>
        {errorMessage && (
        <Typography color="error" align="center" mt={2} style={{color: "red"}}>
          {errorMessage}
        </Typography>
      )}
        <Box mt={2} display="flex" justifyContent="center">
          <Typography variant="body2">
            ¿No tienes una cuenta?{" "}
            <Link href="/registrar">Regístrate aquí</Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
