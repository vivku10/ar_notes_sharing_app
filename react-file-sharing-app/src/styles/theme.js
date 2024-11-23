import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", 
    },
    secondary: {
      main: "#ff4081", 
    },
    background: {
      default: "#f4f4f9", 
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 500,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Prevent all-caps on buttons
        },
      },
    },
  },
});

export default theme;
