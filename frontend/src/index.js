import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

import registerServiceWorker from "./registerServiceWorker";
import apolloClient from "./lib/apolloClient";

import Mailman from "./components/Mailman";
import Dashboard from "./pages/Dashboard";

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
  <ApolloProvider client={apolloClient}>
    <Router basename={process.env.REACT_APP_BASENAME}>
      <MuiThemeProvider theme={theme}>
        <>
          <CssBaseline />
          <Mailman>
            <Dashboard />
          </Mailman>
        </>
      </MuiThemeProvider>
    </Router>
  </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();

export default app;
