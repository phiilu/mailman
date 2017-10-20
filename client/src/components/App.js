import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../pages/Index";
import DomainsNew from "../pages/domains/DomainsNew";
import DomainsEdit from "../pages/domains/DomainsEdit";
import AccountsNew from "../pages/accounts/AccountsNew";
import AccountsEdit from "../pages/accounts/AccountsEdit";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/domains/new" component={DomainsNew} />
        <Route path="/domains/:id/edit" component={DomainsEdit} />
        <Route path="/accounts/new" component={AccountsNew} />
        <Route path="/accounts/:id/edit" component={AccountsEdit} />
      </Switch>
    );
  }
}

export default App;
