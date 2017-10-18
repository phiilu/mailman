import React, { Component } from "react";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";

import Grid from "material-ui/Grid";

class DomainForm extends Component {
  state = {
    data: {
      domain: ""
    },
    error: "",
    submitting: false
  };

  handleChange = e => {
    this.setState({ data: { ...this.state.data, domain: e.target.value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props
      .submit(this.state.data)
      .then(data => {
        this.setState({
          error: "saved successfully",
          data: { domain: "" },
          submitting: false
        });
      })
      .catch(error => {
        this.setState({
          error: error.response.data.message,
          submitting: false
        });
      });
  };

  render() {
    const { domain } = this.state.data;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="domain"
              label="Domain"
              name="domain"
              placeholder="example.org"
              value={domain}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              raised
              color="accent"
              type="submit"
              disabled={this.state.submitting}
            >
              Save Domain
            </Button>
          </Grid>
          <Grid item xs={12}>
            {this.state.error}
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default DomainForm;
