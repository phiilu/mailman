import React, { Component } from "react";
import PropTypes from "prop-types";

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

  componentWillReceiveProps(nextProps) {
    if (!this.state.data.domain) {
      this.setState({
        data: { ...this.state.data, domain: nextProps.domain }
      });
    }
  }

  handleChange = e => {
    this.setState({ data: { ...this.state.data, domain: e.target.value } });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props
      .submit(this.state.data)
      .then(data => {
        if (this.props.update) {
          this.setState({
            error: "updated successfully",
            submitting: false
          });
        } else {
          this.setState({
            error: "saved successfully",
            data: { domain: "" },
            submitting: false
          });
        }
      })
      .catch(error => {
        if (error.response) {
          this.setState({
            error: error.response.data.message,
            submitting: false
          });
        } else if (error.message) {
          this.setState({
            error: error.message,
            submitting: false
          });
        }
      });
  };

  render() {
    const { domain } = this.state.data;
    const { update } = this.props;
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
              {update ? "Update Domain" : "Save Domain"}
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

DomainForm.propTypes = {
  domain: PropTypes.string
};

DomainForm.defaultProps = {
  domain: ""
};

export default DomainForm;
