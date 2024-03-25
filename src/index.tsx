import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { MuiCustomTheme } from "./helpers";
import { BrowserRouter } from "react-router-dom";
import { ScrollToTheTopOnNavigate } from "./components/core";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={MuiCustomTheme}>
      <BrowserRouter>
        <ScrollToTheTopOnNavigate />
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
