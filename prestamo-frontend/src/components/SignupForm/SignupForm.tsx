/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Typography,
  Container,
  Box,
  Paper,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { signUpUser } from "../../services/signup";
import { useNavigate } from "react-router-dom";

interface SignUpFormProps {
  provincia: any[];
  country: any[];
}

const SignUpForm: React.FC<SignUpFormProps> = ({ provincia, country }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fotoCedula: null as File | null,
    correo: "",
    contraseña: "",
    confirmarContraseña: "",
    fechaNacimiento: null as Dayjs | null,
    direccion: "",
    nacionalidadId: "",
    provinciaId: "",
  });

  const [filteredProvinces, setFilteredProvinces] = useState<any[]>([]);
  const [passwordError, setPasswordError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.nacionalidadId) {
      const provinces = provincia.filter(
        (prov) => prov.country.id === formData.nacionalidadId
      );
      setFilteredProvinces(provinces);
      setFormData((prev) => ({ ...prev, provinciaId: "" }));
    }
  }, [formData.nacionalidadId, provincia]);

  const handleChange = (
    event:
      | React.ChangeEvent<{ name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;
    if (name === "cedula") {
      const numericValue = (value as string).replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name!]: value }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, fotoCedula: file }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (formData.contraseña !== formData.confirmarContraseña) {
      setPasswordError(true);
      return;
    }
    setPasswordError(false);
    try {
      await signUpUser(formData);
      setModalMessage("Registro exitoso");
      setFormData({
        nombre: "",
        apellido: "",
        cedula: "",
        fotoCedula: null,
        correo: "",
        contraseña: "",
        confirmarContraseña: "",
        fechaNacimiento: null,
        direccion: "",
        nacionalidadId: "",
        provinciaId: "",
      });

    } catch (error: any) {
      console.log(error);
      setModalMessage("Hubo un error. Inténtalo más tarde.");
    }
    setOpenModal(true);
  };

  return (
    <Container
      maxWidth="sm"
      style={{ minHeight: "100vh", display: "flex", alignItems: "center" }}
    >
      <Paper
        elevation={6}
        style={{ padding: 30, borderRadius: 10, width: "100%" }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Sign Up
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            margin="normal"
            required
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />
          <Box mt={2} mb={2}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fotoCedula"
            />
            <label htmlFor="fotoCedula">
              <Button variant="contained" component="span">
                Subir Foto de Cédula
              </Button>
            </label>
            {formData.fotoCedula && (
              <Typography variant="body2">
                {formData.fotoCedula.name}
              </Typography>
            )}
          </Box>
          <TextField
            fullWidth
            label="Correo"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Contraseña"
            name="contraseña"
            type="password"
            value={formData.contraseña}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            name="confirmarContraseña"
            type="password"
            value={formData.confirmarContraseña}
            onChange={handleChange}
            margin="normal"
            required
            error={passwordError}
            helperText={passwordError ? "Las contraseñas no coinciden" : ""}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Nacimiento"
              value={formData.fechaNacimiento}
              onChange={(newValue) =>
                setFormData((prev) => ({
                  ...prev,
                  fechaNacimiento: newValue || null,
                }))
              }
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            label="Dirección"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            margin="normal"
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>País</InputLabel>
            <Select
              name="nacionalidadId"
              value={formData.nacionalidadId}
              onChange={handleChange}
            >
              {country.map((pais) => (
                <MenuItem key={pais.id} value={pais.id}>
                  {pais.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal" required>
            <InputLabel>Provincia</InputLabel>
            <Select
              name="provinciaId"
              value={formData.provinciaId}
              onChange={handleChange}
              disabled={filteredProvinces.length === 0}
            >
              {filteredProvinces.map((prov) => (
                <MenuItem key={prov.id} value={prov.id}>
                  {prov.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={3} display="flex" justifyContent="center">
            <Button type="submit" variant="contained">
              Registrar
            </Button>
          </Box>
        </form>
      </Paper>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Registro</DialogTitle>
        <DialogContent>{modalMessage}</DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setOpenModal(false);
            if (modalMessage === "Registro exitoso") {
              navigate("/login");
            }
          }}>Aceptar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SignUpForm;
