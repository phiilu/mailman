/* eslint-disable */
import React, { Component } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";

import { getAll } from "../actions/data";
import { deleteDomain } from "../actions/domains";
import { deleteAccount } from "../actions/accounts";
import { deleteAlias } from "../actions/aliases";
import { deleteTlsPolicy } from "../actions/tlsPolicies";

import Navigation from "../components/shared/Navigation";
import Wrapper from "../components/shared/Wrapper";
import Dialog from "../components/shared/Dialog";

import DomainTable from "../components/DomainTable";
import AccountTable from "../components/AccountTable";
import AliasTable from "../components/AliasTable";
import TlsPolicyTable from "../components/TlsPolicyTable";

import Login from "./Login";

const styles = {
  progress: {
    display: "flex",
    flexFlow: "column",
    height: "calc(100vh - 64px)",
    justifyContent: "center",
    alignItems: "center"
  },
  actions: {
    "& > *": {
      marginRight: "15px"
    }
  }
};

class Index extends Component {
  componentDidMount() {
    if (this.props.authentication.token && !this.props.data.dataLoaded) {
      this.props.getAll();
    }
  }

  deleteDomain = id => e => {
    const result = confirm("Are you sure you want to delete this domain?");
    if (result) {
      this.props.deleteDomain(id);
    }
  };

  deleteAccount = id => e => {
    const result = confirm("Are you sure you want to delete this account?");
    if (result) {
      this.props.deleteAccount(id);
    }
  };

  deleteAlias = id => e => {
    const result = confirm("Are you sure you want to delete this alias?");
    if (result) {
      this.props.deleteAlias(id);
    }
  };

  deleteTlsPolicy = id => e => {
    const result = confirm("Are you sure you want to delete this TLS Policy?");
    if (result) {
      this.props.deleteTlsPolicy(id);
    }
  };

  render() {
    const { classes } = this.props;
    const {
      domains,
      accounts,
      aliases,
      tlspolicies,
      loading
    } = this.props.data;
    const { token, admin, email, id } = this.props.authentication;

    let content;

    if (admin) {
      content = (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography type="headline">Domains</Typography>
            <DomainTable domains={domains} deleteDomain={this.deleteDomain} />
            <br />
            <Button raised color="primary" component={Link} to="/domains/new">
              + Domain
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography type="headline">Accounts</Typography>
            <AccountTable
              accounts={accounts}
              deleteAccount={this.deleteAccount}
            />
            <br />
            <Button raised color="primary" component={Link} to="/accounts/new">
              + Account
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography type="headline">Aliases</Typography>
            <AliasTable aliases={aliases} deleteAlias={this.deleteAlias} />
            <br />
            <Button raised color="primary" component={Link} to="/aliases/new">
              + Alias
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography type="headline">TLS Policies</Typography>
            <TlsPolicyTable
              tlspolicies={tlspolicies}
              deleteTlsPolicy={this.deleteTlsPolicy}
            />
            <br />
            <Button
              raised
              color="primary"
              component={Link}
              to="/tlspolicies/new"
            >
              + TLS Policy
            </Button>
          </Grid>
        </Grid>
      );
    } else {
      content = (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography type="headline">{email}</Typography>
            <AliasTable aliases={aliases} deleteAlias={this.deleteAlias} />
            <br />
            <div className={classes.actions}>
              <Button raised color="primary" component={Link} to="/aliases/new">
                + Alias
              </Button>
              <Button
                raised
                color="accent"
                component={Link}
                to={`/accounts/${id}/password`}
              >
                Change Password
              </Button>
            </div>
          </Grid>
        </Grid>
      );
    }

    if (loading) {
      content = (
        <div className={classes.progress}>
          <CircularProgress color="accent" />
        </div>
      );
    }

    return token ? content : <Login />;
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  data: state.data
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, {
    getAll,
    deleteDomain,
    deleteAccount,
    deleteAlias,
    deleteTlsPolicy
  })
);

export default enhance(Index);
