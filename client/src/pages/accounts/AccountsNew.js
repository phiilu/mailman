import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { saveAccount } from "../../actions/accounts";

import AccountForm from "../../components/forms/AccountForm";

class AccountsNew extends Component {
  handleSubmit = data => {
    return this.props.saveAccount(data);
  };

  render() {
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
          <Typography type="headline">Add Account</Typography>
        </Grid>
        <Grid item xs={12}>
          <AccountForm submit={this.handleSubmit} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(connect(mapStateToProps, { saveAccount }));

export default enhance(AccountsNew);
