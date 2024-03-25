import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import { MuiCustomTheme } from "./helpers";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={MuiCustomTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
