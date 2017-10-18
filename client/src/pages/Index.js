import React, { Component } from "react";
import { connect } from "react-redux";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import { TableCell, TableRow } from "material-ui/Table";
import { withStyles } from "material-ui/styles";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { CircularProgress } from "material-ui/Progress";

import { getAll } from "../actions/data";

import withRoot from "../components/hoc/withRoot";
import Navigation from "../components/shared/Navigation";
import Table from "../components/shared/Table";
import Login from "./Login";

const styles = {
  wrapper: {
    padding: "2.5% 5%"
  },
  progress: {
    display: "flex",
    flexFlow: "column",
    height: "calc(100vh - 64px)",
    justifyContent: "center",
    alignItems: "center"
  }
};

const DomainTable = ({ domains }) => {
  const headers = ["Domain"];

  return (
    <Table headers={headers}>
      {domains.map(d => (
        <TableRow key={d.id}>
          <TableCell>{d.domain}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

const AccountTable = ({ accounts }) => {
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
          <TableCell>{a.sendonly}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
};

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
    if (this.props.authentication.token) {
      this.props.getAll();
    }
  }

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
      <div className={classes.wrapper}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Typography type="headline">Domains</Typography>
            <DomainTable domains={domains} />
            <br />
            <Button raised color="primary">
              + Domain
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography type="headline">Accounts</Typography>
            <AccountTable accounts={accounts} />
            <br />
            <Button raised color="primary">
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
      </div>
    );

    if (loading) {
      content = (
        <div className={classes.progress}>
          <CircularProgress color="accent" />
        </div>
      );
    }

    return (
      <div>
        <Navigation />
        {token ? content : <Login />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  data: state.data
});

const enhance = compose(
  withRoot,
  withStyles(styles),
  connect(mapStateToProps, {
    getAll
  })
);

export default enhance(Index);
