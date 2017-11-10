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
import Paper from "material-ui/Paper";
import { CircularProgress } from "material-ui/Progress";
import { toast } from "react-toastify";
import Tooltip from "material-ui/Tooltip";
import green from "material-ui/colors/green";

import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import AddIcon from "material-ui-icons/Add";
import EditIcon from "material-ui-icons/Edit";
import PersonAddIcon from "material-ui-icons/PersonAdd";
import GroupAddIcon from "material-ui-icons/GroupAdd";

import { getAll } from "../actions/data";
import { deleteDomain } from "../actions/domains";
import { deleteAccount } from "../actions/accounts";
import { deleteAlias } from "../actions/aliases";
import { deleteTlsPolicy } from "../actions/tlsPolicies";

import Navigation from "../components/shared/Navigation";
import Wrapper from "../components/shared/Wrapper";
import Dialog from "../components/shared/Dialog";

import AccountTable from "../components/AccountTable";
import AliasTable from "../components/AliasTable";
import TlsPolicyTable from "../components/TlsPolicyTable";

import Login from "./Login";

import { handleRequestError } from "../util";

const styles = theme => ({
  progress: {
    display: "flex",
    flexFlow: "column",
    height: "calc(100vh - 64px)",
    justifyContent: "center",
    alignItems: "center"
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: "10px"
    }
  },
  box: {
    margin: "1em 0 2em"
  },
  boxTitle: {
    background: theme.palette.primary["200"],
    borderBottom: "1px solid #eee",
    padding: "1em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "& > span": {
      marginLeft: "1em"
    },
    "@media (max-width: 530px)": {
      flexFlow: "column"
    }
  },
  boxContent: {
    padding: "0.5em 1em"
  },
  boxSection: {
    margin: "1.5em 0"
  },
  pageHeader: {
    color: "black",
    padding: "0.5em 0",
    borderBottom: "1px solid #eee",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 530px)": {
      "& > button": {}
    }
  },
  deleteIcon: {
    color: "#FF6347"
  },
  addIcon: {
    color: green["500"]
  }
});

class Index extends Component {
  componentDidMount() {
    if (this.props.authentication.token && !this.props.data.dataLoaded) {
      this.props.getAll();
    }
  }

  deleteDomain = id => async e => {
    const result = confirm("Are you sure you want to delete this domain?");
    if (result) {
      try {
        await this.props.deleteDomain(id);
        toast.success("Deleted domain successfully 🔥");
      } catch (error) {
        const { message } = handleRequestError(error);
        toast.error("Error: " + message);
      }
    }
  };

  deleteAccount = id => async e => {
    const result = confirm("Are you sure you want to delete this account?");
    if (result) {
      try {
        await this.props.deleteAccount(id);
        toast.success("Deleted account successfully 🔥");
      } catch (error) {
        const { message } = handleRequestError(error);
        toast.error("Error: " + message);
      }
    }
  };

  deleteAlias = id => async e => {
    const result = confirm("Are you sure you want to delete this alias?");
    if (result) {
      try {
        await this.props.deleteAlias(id);
        toast.success("Deleted alias successfully 🔥");
      } catch (error) {
        const { message } = handleRequestError(error);
        toast.error("Error: " + message);
      }
    }
  };

  deleteTlsPolicy = id => async e => {
    const result = confirm("Are you sure you want to delete this TLS Policy?");
    if (result) {
      try {
        await this.props.deleteTlsPolicy(id);
        toast.success("Deleted TLS Policy successfully 🔥");
      } catch (error) {
        const { message } = handleRequestError(error);
        toast.error("Error: " + message);
      }
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
            <Typography type="display1" className={classes.pageHeader}>
              Domains
              <Button raised color="accent" component={Link} to="/domains/new">
                <AddIcon /> Domain
              </Button>
            </Typography>
            {domains.length > 0 ? (
              domains.map(domain => (
                <Paper key={domain.id} className={classes.box}>
                  <div className={classes.boxTitle}>
                    <Typography type="headline">{domain.domain}</Typography>
                    <span>
                      <Tooltip title="Add Alias" placement="top">
                        <IconButton
                          className={classes.addIcon}
                          aria-label="Add Alias"
                          to={`/aliases/new?domain=${domain.domain}`}
                          component={Link}
                        >
                          <GroupAddIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Add Account" placement="top">
                        <IconButton
                          className={classes.addIcon}
                          aria-label="Add Account"
                          to={`/accounts/new?domain=${domain.domain}`}
                          component={Link}
                        >
                          <PersonAddIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit Domain" placement="top">
                        <IconButton
                          aria-label="Edit Domain"
                          to={`/domains/${domain.id}/edit`}
                          component={Link}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Domain" placement="top">
                        <IconButton
                          className={classes.deleteIcon}
                          aria-label="Delete Domain"
                          className={classes.deleteIcon}
                          onClick={this.deleteDomain(domain.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </span>
                  </div>
                  <div className={classes.boxContent}>
                    <div className={classes.boxSection}>
                      <Typography type="title">Accounts</Typography>
                      <AccountTable
                        accounts={accounts.filter(
                          account => account.domain === domain.domain
                        )}
                        deleteAccount={this.deleteAccount}
                      />
                    </div>
                    <div className={classes.boxSection}>
                      <Typography type="title">Aliases</Typography>
                      <AliasTable
                        aliases={aliases.filter(
                          alias =>
                            alias.source_domain === domain.domain ||
                            alias.destination_domain === domain.domain
                        )}
                        deleteAlias={this.deleteAlias}
                      />
                    </div>
                  </div>
                </Paper>
              ))
            ) : (
              <p>No domains</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <Typography type="display1" className={classes.pageHeader}>
              TLS Policies
              <Button
                raised
                color="accent"
                component={Link}
                to="/tlspolicies/new"
              >
                <AddIcon /> TLS Policy
              </Button>
            </Typography>
            <TlsPolicyTable
              tlspolicies={tlspolicies}
              deleteTlsPolicy={this.deleteTlsPolicy}
            />
          </Grid>
        </Grid>
      );
    } else {
      content = (
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography type="display1" className={classes.pageHeader}>
              {email}
            </Typography>
            <AliasTable aliases={aliases} deleteAlias={this.deleteAlias} />
            <br />
            <div className={classes.actions}>
              <Button raised color="primary" component={Link} to="/aliases/new">
                <AddIcon /> Alias
              </Button>
              <Button
                raised
                color="accent"
                component={Link}
                to={`/accounts/${id}/password`}
              >
                <EditIcon /> Change Password
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
