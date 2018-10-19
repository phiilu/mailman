import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import RouteWithLayout from "./RouteWithLayout";

const PrivateRoute = ({ isAuthenticated, ...rest }) =>
  isAuthenticated ? (
    <RouteWithLayout {...rest} />
  ) : (
    <Redirect
      to={{
        pathname: "/"
      }}
    />
  );

const mapStateToProps = state => ({
  isAuthenticated: !!state.authentication.token
});

export default connect(mapStateToProps)(PrivateRoute);
