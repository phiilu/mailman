import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import LoginForm from "../components/forms/LoginForm";

import { login } from "../actions/authentication";

class Login extends Component {
  handleLogin = async data => {
    this.props.login(data);
  };

  render() {
    return (
      <div>
        <Grid container alignContent="center" alignItems="center">
          <Grid item xs={12}>
            <LoginForm submit={this.handleLogin} />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(null, { login })(Login);
