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
  FormHelperText,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { signUpUser } from "../../services/signup";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Tipos e interfaces
interface FormErrors {
  nombre?: string;
  apellido?: string;
  cedula?: string;
  fotoCedula?: string;
  correo?: string;
  contraseña?: string;
  confirmarContraseña?: string;
  fechaNacimiento?: string;
  direccion?: string;
  nacionalidadId?: string;
  provinciaId?: string;
}

interface SignUpFormProps {
  provincia: any[];
  country: any[];
}

const initialState = {
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
};

const SignUpForm: React.FC<SignUpFormProps> = ({ provincia, country }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [filteredProvinces, setFilteredProvinces] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  // Filtra provincias según país seleccionado
  useEffect(() => {
    if (formData.nacionalidadId) {
      const provinces = provincia.filter(
        (prov) => prov.country.id === formData.nacionalidadId
      );
      setFilteredProvinces(provinces);
      setFormData((prev) => ({ ...prev, provinciaId: "" }));
    }
  }, [formData.nacionalidadId, provincia]);

  // Validaciones del formulario
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    // Validación de nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
      isValid = false;
    } else if (formData.nombre.length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
      isValid = false;
    }

    // Validación de apellido
    if (!formData.apellido.trim()) {
      newErrors.apellido = "El apellido es requerido";
      isValid = false;
    } else if (formData.apellido.length < 2) {
      newErrors.apellido = "El apellido debe tener al menos 2 caracteres";
      isValid = false;
    }

    // Validación de cédula
    if (!formData.cedula) {
      newErrors.cedula = "La cédula es requerida";
      isValid = false;
    } else if (formData.cedula.length < 6) {
      newErrors.cedula = "La cédula debe tener al menos 6 dígitos";
      isValid = false;
    }

    // Validación de foto de cédula
    if (!formData.fotoCedula) {
      newErrors.fotoCedula = "Debe subir una foto de su cédula";
      isValid = false;
    }

    // Validación de correo
    if (!formData.correo) {
      newErrors.correo = "El correo es requerido";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = "Ingrese un correo válido";
      isValid = false;
    }

    // Validación de contraseña
    if (!formData.contraseña) {
      newErrors.contraseña = "La contraseña es requerida";
      isValid = false;
    } else if (formData.contraseña.length < 8) {
      newErrors.contraseña = "La contraseña debe tener al menos 8 caracteres";
      isValid = false;
    } else if (!/[A-Z]/.test(formData.contraseña)) {
      newErrors.contraseña = "Debe contener al menos una mayúscula";
      isValid = false;
    } else if (!/[0-9]/.test(formData.contraseña)) {
      newErrors.contraseña = "Debe contener al menos un número";
      isValid = false;
    }

    // Validación de confirmación de contraseña
    if (formData.contraseña !== formData.confirmarContraseña) {
      newErrors.confirmarContraseña = "Las contraseñas no coinciden";
      isValid = false;
    }

    // Validación de fecha de nacimiento
    if (!formData.fechaNacimiento) {
      newErrors.fechaNacimiento = "La fecha de nacimiento es requerida";
      isValid = false;
    } else {
      const today = new Date();
      const birthDate = new Date(formData.fechaNacimiento.toString());
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      if (age < 18) {
        newErrors.fechaNacimiento = "Debe ser mayor de 18 años";
        isValid = false;
      }
    }

    // Validación de dirección
    if (!formData.direccion.trim()) {
      newErrors.direccion = "La dirección es requerida";
      isValid = false;
    } else if (formData.direccion.length < 10) {
      newErrors.direccion = "La dirección debe ser más específica";
      isValid = false;
    }

    // Validación de país
    if (!formData.nacionalidadId) {
      newErrors.nacionalidadId = "Debe seleccionar un país";
      isValid = false;
    }

    // Validación de provincia
    if (!formData.provinciaId) {
      newErrors.provinciaId = "Debe seleccionar una provincia";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Manejo de cambios en los campos
  const handleChange = (
    event:
      | React.ChangeEvent<{ name?: string; value: unknown }>
      | SelectChangeEvent<string>
  ) => {
    const { name, value } = event.target;

    // Limpiar error al cambiar el campo
    if (name && errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (name === "cedula") {
      const numericValue = (value as string).replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name!]: value }));
    }
  };

  // Manejo de cambio de archivo
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, fotoCedula: file }));

    // Validar tipo de archivo
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, fotoCedula: "Solo se permiten imágenes (JPEG, PNG, GIF)" }));
      } else if (file.size > 5 * 1024 * 1024) { // 5MB
        setErrors(prev => ({ ...prev, fotoCedula: "La imagen no debe exceder 5MB" }));
      } else {
        setErrors(prev => ({ ...prev, fotoCedula: undefined }));
      }
    }
  };

  // Manejo de envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await signUpUser(formData);

      if (response.statusCode || response.code || response.error) {
        throw new Error(response.message || "Error en el registro");
      }

      setModalMessage("Registro exitoso. Por favor inicie sesión.");
      setOpenModal(true);
      setFormData(initialState);
      setErrors({});
    } catch (error: any) {
      setModalMessage(error.message || "Ocurrió un error durante el registro");
      setOpenModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" justifyContent="center" mb={3}>
          <img
            src="/vite.png"
            alt="Logo"
            style={{ width: 100, height: 100 }}
          />
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', color: 'primary.main' }}
        >
          Registro de Usuario
        </Typography>

        <form onSubmit={handleSubmit}>
          {/* Nombre y Apellido en una fila */}
          <Box display="flex" gap={2} mb={2}>
            <TextField
              fullWidth
              label="Nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              error={!!errors.nombre}
              helperText={errors.nombre}
            />
            <TextField
              fullWidth
              label="Apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              error={!!errors.apellido}
              helperText={errors.apellido}
            />
          </Box>

          {/* Cédula */}
          <TextField
            fullWidth
            label="Cédula"
            name="cedula"
            value={formData.cedula}
            onChange={handleChange}
            margin="normal"
            error={!!errors.cedula}
            helperText={errors.cedula}
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          />

          {/* Foto de cédula */}
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
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formData.fotoCedula.name}
              </Typography>
            )}
            {errors.fotoCedula && (
              <FormHelperText error sx={{ ml: 2 }}>
                {errors.fotoCedula}
              </FormHelperText>
            )}
          </Box>

          {/* Correo */}
          <TextField
            fullWidth
            label="Correo Electrónico"
            name="correo"
            type="email"
            value={formData.correo}
            onChange={handleChange}
            margin="normal"
            error={!!errors.correo}
            helperText={errors.correo}
          />

          {/* Contraseñas */}
          <Box display="flex" gap={2} mb={2}>
        <TextField
          fullWidth
          label="Contraseña"
          name="contraseña"
          type={showPassword ? "text" : "password"}
          value={formData.contraseña}
          onChange={handleChange}
          error={!!errors.contraseña}
          helperText={errors.contraseña}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <TextField
          fullWidth
          label="Confirmar Contraseña"
          name="confirmarContraseña"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmarContraseña}
          onChange={handleChange}
          error={!!errors.confirmarContraseña}
          helperText={errors.confirmarContraseña}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>

          {/* Fecha de nacimiento */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Fecha de Nacimiento"
              value={formData.fechaNacimiento}
              onChange={(newValue) => {
                setFormData((prev) => ({
                  ...prev,
                  fechaNacimiento: newValue || null,
                }));
                if (errors.fechaNacimiento) {
                  setErrors(prev => ({ ...prev, fechaNacimiento: undefined }));
                }
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  margin: "normal",
                  error: !!errors.fechaNacimiento,
                  helperText: errors.fechaNacimiento,
                },
              }}
            />
          </LocalizationProvider>

          {/* Dirección */}
          <TextField
            fullWidth
            label="Dirección Completa"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            margin="normal"
            error={!!errors.direccion}
            helperText={errors.direccion}
            multiline
            rows={2}
          />

          {/* País y Provincia */}
          <Box display="flex" gap={2} mb={3}>
            <FormControl fullWidth error={!!errors.nacionalidadId}>
              <InputLabel>País</InputLabel>
              <Select
                name="nacionalidadId"
                value={formData.nacionalidadId}
                onChange={handleChange}
                label="País"
              >
                {country.map((pais) => (
                  <MenuItem key={pais.id} value={pais.id}>
                    {pais.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.nacionalidadId && (
                <FormHelperText>{errors.nacionalidadId}</FormHelperText>
              )}
            </FormControl>

            <FormControl
              fullWidth
              error={!!errors.provinciaId}
              disabled={filteredProvinces.length === 0}
            >
              <InputLabel>Provincia/Estado</InputLabel>
              <Select
                name="provinciaId"
                value={formData.provinciaId}
                onChange={handleChange}
                label="Provincia/Estado"
              >
                {filteredProvinces.map((prov) => (
                  <MenuItem key={prov.id} value={prov.id}>
                    {prov.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.provinciaId && (
                <FormHelperText>{errors.provinciaId}</FormHelperText>
              )}
            </FormControl>
          </Box>

          {/* Botón de envío */}
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              sx={{ px: 6, py: 1.5 }}
            >
              {isSubmitting ? "Registrando..." : "Registrarse"}
            </Button>
          </Box>
        </form>

        {/* Enlace a login */}
        <Box mt={3} display="flex" justifyContent="center">
          <Typography variant="body1">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" style={{ textDecoration: "none", fontWeight: "bold" }}>
              Inicia sesión aquí
            </Link>
          </Typography>
        </Box>
      </Paper>

      {/* Modal de feedback */}
      <Dialog open={openModal} onClose={() => {
        setOpenModal(false);
        if (modalMessage.includes("éxito")) {
          navigate("/login");
        }
      }}>
        <DialogTitle>
          {modalMessage.includes("éxito") ? "Registro Exitoso" : "Error en Registro"}
        </DialogTitle>
        <DialogContent>
          <Typography>{modalMessage}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenModal(false);
              if (modalMessage.includes("éxito")) {
                navigate("/login");
              }
            }}
            color={modalMessage.includes("éxito") ? "primary" : "error"}
          >
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SignUpForm;