import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "./shared/PrivateRoute";
import RouteWithLayout from "./shared/RouteWithLayout";

import Index from "../pages/Index";
import DomainsNew from "../pages/domains/DomainsNew";
import DomainsEdit from "../pages/domains/DomainsEdit";
import AccountsNew from "../pages/accounts/AccountsNew";
import AccountsEdit from "../pages/accounts/AccountsEdit";
import AliasesNew from "../pages/aliases/AliasesNew";
import AliasesEdit from "../pages/aliases/AliasesEdit";
import TlsPoliciesNew from "../pages/tlspolicies/TlsPoliciesNew";
import TlsPoliciesEdit from "../pages/tlspolicies/TlsPoliciesEdit";

class App extends Component {
  render() {
    return (
      <Switch>
        <RouteWithLayout exact path="/" component={Index} />
        <PrivateRoute path="/domains/new" component={DomainsNew} />
        <PrivateRoute path="/domains/:id/edit" component={DomainsEdit} />
        <PrivateRoute path="/accounts/new" component={AccountsNew} />
        <PrivateRoute path="/accounts/:id/edit" component={AccountsEdit} />
        <PrivateRoute path="/aliases/new" component={AliasesNew} />
        <PrivateRoute path="/aliases/:id/edit" component={AliasesEdit} />
        <PrivateRoute path="/tlspolicies/new" component={TlsPoliciesNew} />
        <PrivateRoute
          path="/tlspolicies/:id/edit"
          component={TlsPoliciesEdit}
        />
      </Switch>
    );
  }
}

export default App;
