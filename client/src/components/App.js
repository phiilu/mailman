import React, { Component } from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "./shared/PrivateRoute";
import RouteWithLayout from "./shared/RouteWithLayout";

import withRoot from "./hoc/withRoot";

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
        <RouteWithLayout exact path="/" component={withRoot(Index)} />
        <PrivateRoute path="/domains/new" component={withRoot(DomainsNew)} />
        <PrivateRoute
          path="/domains/:id/edit"
          component={withRoot(DomainsEdit)}
        />
        <PrivateRoute path="/accounts/new" component={withRoot(AccountsNew)} />
        <PrivateRoute
          path="/accounts/:id/edit"
          component={withRoot(AccountsEdit)}
        />
        <PrivateRoute path="/aliases/new" component={withRoot(AliasesNew)} />
        <PrivateRoute
          path="/aliases/:id/edit"
          component={withRoot(AliasesEdit)}
        />
        <PrivateRoute
          path="/tlspolicies/new"
          component={withRoot(TlsPoliciesNew)}
        />
        <PrivateRoute
          path="/tlspolicies/:id/edit"
          component={withRoot(TlsPoliciesEdit)}
        />
      </Switch>
    );
  }
}

export default App;
