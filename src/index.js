import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/assets/styles/index.scss";
import "./index.css";
import "react-circular-progressbar/dist/styles.css";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@mui/styles";
import { Toaster } from "react-hot-toast";

const theme = createTheme();
ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
      <Toaster position="top-right" />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
