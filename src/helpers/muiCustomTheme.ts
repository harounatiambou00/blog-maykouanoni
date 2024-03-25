import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#114232",
    },
    secondary: {
      main: "#F5E8C7",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          letterSpacing: 3,
        },
      },
    },
  },
});
export default theme;
