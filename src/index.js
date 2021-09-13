import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import store from './store/store';
import App from "./App"
import reportWebVitals from './reportWebVitals';
import "../src/assets/styles/index.scss";
// import '../src/assets/fonts/basier.ttf';
import './index.css';
import 'react-circular-progressbar/dist/styles.css';
import "react-chat-widget/lib/styles.css";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
