import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

import Mailman from "./components/App";
import Dashboard from "./pages/Dashboard";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";

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
        <React.Fragment>
          <CssBaseline />
          <Mailman>
            <Dashboard />
          </Mailman>
        </React.Fragment>
      </MuiThemeProvider>
    </Router>
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

export default app;
