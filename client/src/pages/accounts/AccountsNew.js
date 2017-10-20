import React, { Component } from "react";
import { connect } from "react-redux";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { saveAccount } from "../../actions/accounts";

import withRoot from "../../components/hoc/withRoot";

import Navigation from "../../components/shared/Navigation";
import Wrapper from "../../components/shared/Wrapper";
import AccountForm from "../../components/forms/AccountForm";

class AccountsNew extends Component {
  handleSubmit = data => {
    return this.props.saveAccount(data);
  };

  render() {
    return (
      <div>
        <Navigation />
        <Wrapper>
          <Grid container>
            <Grid item xs={12}>
              <Typography type="headline">Add Account</Typography>
            </Grid>
            <Grid item xs={12}>
              <AccountForm submit={this.handleSubmit} />
            </Grid>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

const enhance = compose(withRoot, connect(null, { saveAccount }));

export default enhance(AccountsNew);
