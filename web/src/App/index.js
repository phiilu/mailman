import React, { Component } from "react";
import { Router } from "@reach/router";

import Navigation from "components/Navigation";
import Footer from "components/Footer";

import Home from "pages/Home";

import { app } from "./App.module.scss";

class App extends Component {
  render() {
    return (
      <div className={app}>
        <Navigation />
        <Router>
          <Home path="/" />
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
