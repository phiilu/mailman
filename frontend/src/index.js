import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "typeface-roboto";

import registerServiceWorker from "./registerServiceWorker";
import apolloClient from "lib/apolloClient";
import theme from "lib/theme";

import Mailman from "components/Mailman";
import Dashboard from "pages/Dashboard";

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
