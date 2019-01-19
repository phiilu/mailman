import React from "react";
import { Router } from "@reach/router";

import Navigation from "components/Navigation";
import Header from "components/Header";
import Footer from "components/Footer";
import PleaseLogin from "components/PleaseLogin";

import Home from "pages/Home";
import Domains from "pages/Domains";
import Accounts from "pages/Accounts";
import Aliases from "pages/Aliases";
import TlsPolicies from "pages/TlsPolicies";

import { app, appLogin, notFound } from "./App.module.scss";

import { useUser } from "lib/hooks";

const NotFound = () => (
  <div className={notFound}>
    <h1>Not Found | 404</h1>
  </div>
);

const App = () => {
  const { user } = useUser();

  return (
    <div className={user ? app : appLogin}>
      <Navigation />
      <PleaseLogin>
        <Header />
        <main>
          <Router>
            <Home path="/" exact />
            <Domains path="/domains" />
            <Accounts path="/accounts/:domain" />
            <Accounts path="/accounts" />
            <Aliases path="/aliases/:email" />
            <Aliases path="/aliases" />
            <TlsPolicies path="/tlspolicies" />
            <NotFound default />
          </Router>
        </main>
      </PleaseLogin>

      <Footer />
    </div>
  );
};

export default App;
