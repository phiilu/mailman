import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

class LoginForm extends Component {
  state = {
    fields: {
      email: "",
      password: ""
    },
    errors: {}
  };

  handleChange = e => {
    this.setState({
      fields: {
        ...this.state.fields,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.fields);
  };

  render() {
    const { email, password } = this.state.fields;
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <TextField
          id="email"
          label="Email"
          name="email"
          value={email}
          onChange={this.handleChange}
          margin="normal"
        />
        <TextField
          id="name"
          label="Password"
          name="password"
          type="password"
          value={password}
          onChange={this.handleChange}
          margin="normal"
        />
        <Button raised color="accent" type="submit">
          Login
        </Button>
      </form>
    );
  }
}

export default LoginForm;
