import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Azul
      light: "#63a4ff",
      dark: "#004ba0",
      contrastText: "#fff",
    },
    secondary: {
      main: "#d32f2f", // Rojo
      light: "#ff6659",
      dark: "#9a0007",
      contrastText: "#fff",
    },
    background: {
      default: "#ffffff", // Color de fondo de la app
      paper: "#ffffff", // Color de fondo de tarjetas y diálogos
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif", // Fuente global
    h1: {
      fontSize: "2rem",
      fontWeight: 700,
      color: "#1976d2", // Color primario por defecto en títulos h1
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
      color: "#1976d2",
    },
    body1: {
      fontSize: "1rem",
      color: "#212121",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#212121", // Color por defecto en todos los textos
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          padding: "10px 20px",
          fontSize: "1rem",
          textTransform: "none", // Evita que los botones usen mayúsculas
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: "20px",
        },
      },
    },
  },
});

export default theme;
