/* eslint-disable */
import React, { Component } from "react";
import { createPortal } from "react-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import { TableCell, TableRow } from "material-ui/Table";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";

import { getAll } from "../actions/data";
import { deleteDomain } from "../actions/domains";
import { deleteAccount } from "../actions/accounts";

import Navigation from "../components/shared/Navigation";
import Table from "../components/shared/Table";
import Wrapper from "../components/shared/Wrapper";
import Dialog from "../components/shared/Dialog";

import Login from "./Login";

const styles = {
  progress: {
    display: "flex",
    flexFlow: "column",
    height: "calc(100vh - 64px)",
    justifyContent: "center",
    alignItems: "center"
  },
  tableCell: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  deleteIcon: {
    color: "#FF6347"
  }
};

const DomainTable = withStyles(styles)(({ domains, classes, deleteDomain }) => {
  const headers = ["Domain"];

  return (
    <Table headers={headers}>
      {domains.map(d => (
        <TableRow key={d.id}>
          <TableCell className={classes.tableCell}>
            {d.domain}
            <span>
              <IconButton
                aria-label="Edit"
                to={`/domains/${d.id}/edit`}
                component={Link}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                className={classes.deleteIcon}
                onClick={deleteDomain(d.id)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
});

const AccountTable = withStyles(
  styles
)(({ accounts, classes, deleteAccount }) => {
  const headers = ["Email", "Quota", "Enabled", "Sendonly"];
  return (
    <Table headers={headers}>
      {accounts.map(a => (
        <TableRow key={a.id}>
          <TableCell>
            {a.username}@{a.domain}
          </TableCell>
          <TableCell>{a.quota}</TableCell>
          <TableCell>{a.enabled}</TableCell>
          <TableCell className={classes.tableCell}>
            {a.sendonly}
            <span>
              <IconButton
                aria-label="Edit"
                to={`/accounts/${a.id}/edit`}
                component={Link}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="Delete"
                className={classes.deleteIcon}
                onClick={deleteAccount(a.id)}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </TableCell>
        </TableRow>
      ))}
    </Table>
  );
});

const AliasTable = ({ aliases }) => {
  const headers = ["Source Email", "Destination Email", "Enabled"];

  return (
    <Table headers={headers}>
      {aliases.map(a => (
        <TableRow key={a.id}>
          <TableCell>
            {a.source_username}@{a.source_domain}
          </TableCell>
          <TableCell>
            {a.destination_username}@{a.destination_domain}
          </TableCell>
          <TableCell>{a.enabled}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

const TlsPolicyTable = ({ tlspolicies }) => {
  const headers = ["Domain", "Params", "Policy"];

  return (
    <Table headers={headers}>
      {tlspolicies.map(t => (
        <TableRow key={t.id}>
          <TableCell>{t.domain}</TableCell>
          <TableCell>{t.params}</TableCell>
          <TableCell>{t.policy}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
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

  render() {
    const { classes } = this.props;
    const {
      domains,
      accounts,
      aliases,
      tlspolicies,
      loading
    } = this.props.data;
    const { token } = this.props.authentication;

    let content = (
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
          <AliasTable aliases={aliases} />
          <br />
          <Button raised color="primary">
            + Alias
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography type="headline">TLS Policies</Typography>
          <TlsPolicyTable tlspolicies={tlspolicies} />
          <br />
          <Button raised color="primary">
            + TLS Policy
          </Button>
        </Grid>
      </Grid>
    );

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
    deleteAccount
  })
);

export default enhance(Index);
