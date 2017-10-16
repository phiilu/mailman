import React, { Component } from "react";
import { connect } from "react-redux";

import compose from "lodash/fp/compose";

import withRoot from "../components/hoc/withRoot";
import Navigation from "../components/shared/Navigation";
import Login from "./Login";

class Index extends Component {
  render() {
    const { token } = this.props.authentication;
    return (
      <div>
        <Navigation />
        {token ? <h1>Logged In</h1> : <Login />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication
});

const enhance = compose(withRoot, connect(mapStateToProps));

export default enhance(Index);
