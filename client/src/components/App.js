import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../pages/Index";
import DomainsNew from "../pages/domains/DomainsNew";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/domains/new" component={DomainsNew} />
      </Switch>
    );
  }
}

export default App;
