import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import AppWrapper from "./components/shared/AppWrapper";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";
import { loginAction } from "./actions/authentication";
import { setupAxiosInterceptors } from "./util";

import "typeface-roboto";

import "./styles/index.css";

setupAxiosInterceptors();

// login if there is a token
const userJson = localStorage.getItem("user");
if (userJson) {
  const user = JSON.parse(userJson);
  store.dispatch(loginAction(user));
  axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#555767",
      main: "#2B2D42",
      dark: "#1e1f2e",
      contrastText: "#fff"
    },
    secondary: {
      light: "#f73378",
      main: "#f50057",
      dark: "#ab003c",
      contrastText: "#fff"
    }
  },
  typography: {
    useNextVariants: true
  }
});

const app = (
  <Provider store={store}>
    <Router basename={process.env.REACT_APP_BASENAME}>
      <MuiThemeProvider theme={theme}>
        <AppWrapper>
          <App key={0} />
          <ToastContainer
            position="top-right"
            type="default"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            pauseOnHover
            key={1}
            style={{ marginTop: "65px" }}
          />
        </AppWrapper>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

export default app;
