import React, { Component } from "react";
import { connect } from "react-redux";
import Grid from "material-ui/Grid";
import LoginForm from "../components/forms/LoginForm";
import { toast } from "react-toastify";

import { login } from "../actions/authentication";
import { handleRequestError } from "../util";

class Login extends Component {
  handleLogin = async data => {
    try {
      await this.props.login(data);
      toast.info("You are now logged in");
    } catch (error) {
      const { message } = handleRequestError(error);
      toast.error("Error: " + message);
    }
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
