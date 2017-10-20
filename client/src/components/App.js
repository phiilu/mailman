import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../pages/Index";
import DomainsNew from "../pages/domains/DomainsNew";
import DomainsEdit from "../pages/domains/DomainsEdit";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/domains/new" component={DomainsNew} />
        <Route path="/domains/:id/edit" component={DomainsEdit} />
      </Switch>
    );
  }
}

export default App;
