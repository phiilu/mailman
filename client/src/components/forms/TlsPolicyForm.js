import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";

import { getAll } from "../../actions/data";

const styles = {
  select: {
    minWidth: "167px"
  }
};

class TlsPolicyForm extends Component {
  state = {
    data: {
      domain: "",
      params: "",
      policy: "dane"
    },
    error: "",
    submitting: false
  };

  async componentDidMount() {
    if (this.props.tlspolicies.length === 0) await this.props.getAll();

    const { id } = this.props.match.params;
    const tlsPolicy = this.props.tlspolicies.find(
      tlsPolicy => tlsPolicy.id === +id
    );

    if (tlsPolicy) {
      this.setState({
        data: {
          ...this.state.data,
          domain: tlsPolicy.domain,
          params: tlsPolicy.params,
          policy: tlsPolicy.policy
        }
      });
    }
  }

  handleChange = e => {
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  handleChangeSelect = e => {
    this.setState({
      data: { ...this.state.data, policy: e.target.value }
    });
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
            data: {
              ...this.state.data,
              domain: "",
              params: "",
              policy: "dane"
            },
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
    const { domain, params, policy } = this.state.data;
    const { update, classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="domain"
              label="Domain"
              name="domain"
              placeholder="google.com"
              value={domain}
              onChange={this.handleChange}
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.select}>
              <InputLabel htmlFor="policies">Policy</InputLabel>
              <Select
                name="policy"
                value={policy}
                onChange={this.handleChangeSelect}
                input={<Input id="policies" />}
              >
                <MenuItem value="dane">
                  <em>dane</em>
                </MenuItem>
                <MenuItem value="dane-only">
                  <em>dane-only</em>
                </MenuItem>
                <MenuItem value="fingerprint">
                  <em>fingerprint</em>
                </MenuItem>
                <MenuItem value="verify">
                  <em>verify</em>
                </MenuItem>
                <MenuItem value="secure">
                  <em>secure</em>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="params"
              label="Params"
              name="params"
              placeholder="match=.some.domain"
              value={params}
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
              {update ? "Update TLS Policy" : "Save TLS Policy"}
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

TlsPolicyForm.propTypes = {
  update: PropTypes.bool
};

TlsPolicyForm.defaultProps = {
  update: false
};

const mapStateToProps = state => ({
  tlspolicies: state.data.tlspolicies
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { getAll })
);

export default enhance(TlsPolicyForm);
