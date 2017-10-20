import React from "react";
import { Route } from "react-router-dom";

import Navigation from "./Navigation";
import Wrapper from "./Wrapper";

const RouteWithLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={matchProps => (
        <div>
          <Navigation />
          <Wrapper>
            <Component {...matchProps} />
          </Wrapper>
        </div>
      )}
    />
  );
};

export default RouteWithLayout;
