import React, { useState } from "react";
import { TextField, Button, MenuItem, InputLabel, Select, FormControl, Typography, Container, Box, Paper, SelectChangeEvent } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const provinciasRD = [
  "Distrito Nacional", "Azua", "Bahoruco", "Barahona", "Dajabón", "Duarte", "El Seibo", "Elías Piña", "Espaillat", "Hato Mayor", "Hermanas Mirabal", "Independencia", "La Altagracia", "La Romana", "La Vega", "María Trinidad Sánchez", "Monseñor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia", "Puerto Plata", "Samaná", "San Cristóbal", "San José de Ocoa", "San Juan", "San Pedro de Macorís", "Sánchez Ramírez", "Santiago", "Santiago Rodríguez", "Santo Domingo", "Valverde"
];

const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    cedula: "",
    fotoCedula: null as File | null,
    correo: "",
    contraseña: "",
    fechaNacimiento: null as Date | null,
    direccion: "",
    nacionalidad: "",
    provincia: "",
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name!]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, fotoCedula: file }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
  };

  return (
    <Container maxWidth="sm" style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper elevation={6} style={{ padding: 30, backgroundColor: "white", borderRadius: 10, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", width: "100%" }}>
        <Typography variant="h4" gutterBottom align="center">Sign Up</Typography>
        <form onSubmit={handleSubmit}>
          <TextField fullWidth label="Nombre" name="nombre" value={formData.nombre} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Apellido" name="apellido" value={formData.apellido} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Cédula" name="cedula" value={formData.cedula} onChange={handleChange} margin="normal" required />
          <Box mt={2} mb={2} display="flex" flexDirection="column">
            <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} id="fotoCedula" />
            <label htmlFor="fotoCedula">
              <Button variant="contained" component="span" color="primary">Subir Foto de Cédula</Button>
            </label>
            {formData.fotoCedula && <Typography variant="body2" mt={1}>{formData.fotoCedula.name}</Typography>}
          </Box>
          <TextField fullWidth label="Correo" name="correo" type="email" value={formData.correo} onChange={handleChange} margin="normal" required />
          <TextField fullWidth label="Contraseña" name="contraseña" type="password" value={formData.contraseña} onChange={handleChange} margin="normal" required />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Fecha de Nacimiento" value={formData.fechaNacimiento} onChange={(newValue) => setFormData((prev) => ({ ...prev, fechaNacimiento: newValue ? newValue.toDate() : null }))} />
          </LocalizationProvider>
          <TextField fullWidth label="Dirección" name="direccion" value={formData.direccion} onChange={handleChange} margin="normal" required />
          <FormControl fullWidth margin="normal">
            <InputLabel>Pais</InputLabel>
            <Select name="Pais" value={formData.nacionalidad} onChange={(event) => handleChange(event as SelectChangeEvent<string>)}>
              <MenuItem value="dominicana">Republica Dominicana</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Provincia</InputLabel>
            <Select name="provincia" value={formData.provincia} onChange={(event) => handleChange(event as SelectChangeEvent<string>)}>
              {provinciasRD.map((provincia) => (
                <MenuItem key={provincia} value={provincia}>{provincia}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={3} display="flex" justifyContent="center">
            <Button type="submit" variant="contained" color="primary" size="large">Registrar</Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default SignUpForm;
