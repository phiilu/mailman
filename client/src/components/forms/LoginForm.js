import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Paper from "material-ui/Paper";
import Typography from "material-ui/Typography";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  paper: {
    maxWidth: "400px",
    margin: "100px auto"
  },
  header: {
    padding: "2em 0",
    background: theme.palette.primary[500],
    borderBottom: "1px solid #eee",
    "& > *": {
      color: theme.palette.common.white
    }
  },
  form: {
    display: "flex",
    flexFlow: "column",
    padding: "0 2em",
    "& > button": {
      margin: "1em 0"
    }
  }
});

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
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Typography type="headline" align="center">
            Login
          </Typography>
        </div>
        <div className={classes.body}>
          <form
            className={classes.form}
            autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <TextField
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
              margin="normal"
              autoFocus
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
        </div>
      </Paper>
    );
  }
}

export default withStyles(styles)(LoginForm);
