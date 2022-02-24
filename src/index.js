import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "../src/assets/styles/index.scss";
import "./index.css";
import "react-circular-progressbar/dist/styles.css";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
