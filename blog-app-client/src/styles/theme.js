import { createTheme } from "@mui/material/styles";

const theme = (darkMode) =>
  createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
    // You can add more custom theme options here
  });

export default theme;
