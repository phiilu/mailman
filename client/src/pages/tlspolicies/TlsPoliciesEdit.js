import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { updateTlsPolicy } from "../../actions/tlsPolicies";

import TlsPolicyForm from "../../components/forms/TlsPolicyForm";

const styles = {
  header: {
    padding: "1em",
    borderBottom: "1px solid #eee"
  },
  body: {
    padding: "0 1em"
  },
  paper: {
    maxWidth: "450px",
    margin: "2em auto"
  }
};

class TlsPoliciesEdit extends Component {
  handleSubmit = data => {
    const { id } = this.props.match.params;
    return this.props.updateTlsPolicy(id, data);
  };

  render() {
    const { isAdmin, classes } = this.props;

    if (!isAdmin) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography variant="headline">Edit TLS Policy</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.body}>
              <TlsPolicyForm submit={this.handleSubmit} update />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { updateTlsPolicy }
  )
);

export default enhance(TlsPoliciesEdit);
