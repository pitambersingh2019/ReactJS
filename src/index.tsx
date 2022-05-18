import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "./fonts/Proxima Nova.ttf";
import "./fonts/ProximaNovaNew.ttf";

import store from "./Redux/store";
import { Provider } from "react-redux";

import "./locales/i18n";
import "./AppStart";

import GlobalStyle from "./globalStyles";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <GlobalStyle />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
