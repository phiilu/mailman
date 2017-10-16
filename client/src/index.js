import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";

import { setToken } from "./actions/authentication";

// login if there is a token
const token = localStorage.getItem("token");
if (token) {
  store.dispatch(setToken(token));
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const app = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
