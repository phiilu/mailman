import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";

import { updateAccountPassword } from "../../actions/accounts";

import AccountPasswordForm from "../../components/forms/AccountPasswordForm";

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

class AccountsPassword extends Component {
  handleSubmit = data => {
    const { id } = this.props.match.params;
    return this.props.updateAccountPassword(id, data);
  };

  render() {
    const { classes, match, id } = this.props;

    if (id !== +match.params.id) {
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
              <Typography variant="headline">Change Password</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.body}>
              <AccountPasswordForm submit={this.handleSubmit} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  id: state.authentication.id
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(
    mapStateToProps,
    { updateAccountPassword }
  )
);

export default enhance(AccountsPassword);
