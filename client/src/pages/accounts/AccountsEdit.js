import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { updateAccount } from "../../actions/accounts";

import AccountForm from "../../components/forms/AccountForm";

class AccountsEdit extends Component {
  handleSubmit = data => {
    const { id } = this.props.match.params;
    if (!data.password) delete data.password; // remove password if it is empty
    return this.props.updateAccount(id, data);
  };

  render() {
    const { id } = this.props.match.params;

    if (!this.props.isAdmin) {
      return (
        <Redirect
          to={{
            pathname: "/"
          }}
        />
      );
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography type="headline">Update Account</Typography>
        </Grid>
        <Grid item xs={12}>
          <AccountForm submit={this.handleSubmit} update />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(
  withRouter,
  connect(mapStateToProps, { updateAccount })
);

export default enhance(AccountsEdit);
