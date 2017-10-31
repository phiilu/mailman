import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import TextField from "material-ui/TextField";
import Button from "material-ui/Button";
import Input, { InputLabel } from "material-ui/Input";
import { MenuItem } from "material-ui/Menu";
import { FormControl, FormControlLabel } from "material-ui/Form";
import Select from "material-ui/Select";
import Switch from "material-ui/Switch";
import { withStyles } from "material-ui/styles";
import Grid from "material-ui/Grid";
import { toast } from "react-toastify";

import { getAll } from "../../actions/data";
import { handleRequestError } from "../../util";

const styles = {
  textfield: {
    width: "100%"
  }
};

class AccountForm extends Component {
  state = {
    data: {
      username: "",
      domain: "",
      password: "",
      quota: "0",
      enabled: true,
      sendonly: false
    },
    error: "",
    submitting: false
  };

  async componentDidMount() {
    if (this.props.domains.length === 0) await this.props.getAll();
    if (this.props.domains.length > 0) {
      this.setState({
        data: {
          ...this.state.data,
          domain: this.props.domains[0].domain
        }
      });
    }

    const { id } = this.props.match.params;
    const account = this.props.accounts.find(account => account.id === +id);

    if (account) {
      this.setState({
        data: {
          ...this.state.data,
          username: account.username,
          domain: account.domain,
          password: "",
          quota: account.quota,
          enabled: account.enabled === "1",
          sendonly: account.sendonly === "1"
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
      data: { ...this.state.data, domain: e.target.value }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ submitting: true });
    this.props
      .submit(this.state.data)
      .then(data => {
        if (this.props.update) {
          toast.success("Updated successfully 💥");
          this.setState({
            data: {
              ...this.state.data,
              password: ""
            },
            submitting: false
          });
        } else {
          toast.success("Saved successfully 💥");
          this.setState({
            data: {
              ...this.state.data,
              username: "",
              domain: "",
              password: "",
              quota: "0",
              enabled: true,
              sendonly: false
            },
            submitting: false
          });
        }
      })
      .catch(error => {
        const { message } = handleRequestError(error);
        this.setState({
          submitting: false
        });
        toast.error("Error: " + message);
      });
  };

  render() {
    const {
      username,
      domain,
      password,
      enabled,
      quota,
      sendonly
    } = this.state.data;
    const { update, classes } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="username"
              label="Username"
              name="username"
              placeholder="user"
              value={username}
              onChange={this.handleChange}
              margin="normal"
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl className={classes.textfield}>
              <InputLabel htmlFor="domains">Domain</InputLabel>
              <Select
                name="domain"
                value={domain}
                onChange={this.handleChangeSelect}
                input={<Input id="domains" />}
              >
                {this.props.domains.map(domain => (
                  <MenuItem key={domain.id} value={domain.domain}>
                    {domain.domain}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="password"
              label="Password"
              name="password"
              type="password"
              value={password || ""}
              onChange={this.handleChange}
              margin="normal"
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="quota"
              label="Quota"
              name="quota"
              type="number"
              placeholder="1024"
              value={quota}
              onChange={this.handleChange}
              margin="normal"
              className={classes.textfield}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={enabled}
                  onChange={(event, checked) =>
                    this.setState({
                      data: { ...this.state.data, enabled: checked }
                    })}
                />
              }
              label="Enabled"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={sendonly}
                  onChange={(event, checked) =>
                    this.setState({
                      data: { ...this.state.data, sendonly: checked }
                    })}
                />
              }
              label="Sendonly"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              raised
              color="accent"
              type="submit"
              disabled={this.state.submitting}
            >
              {update ? "Update Account" : "Save Account"}
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

AccountForm.propTypes = {
  domain: PropTypes.string,
  update: PropTypes.bool
};

AccountForm.defaultProps = {
  domain: "",
  update: false
};

const mapStateToProps = state => ({
  domains: state.data.domains,
  accounts: state.data.accounts
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { getAll })
);

export default enhance(AccountForm);
