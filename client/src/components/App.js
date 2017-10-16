import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import Index from "../pages/Index";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Index} />
      </Switch>
    );
  }
}

export default App;
