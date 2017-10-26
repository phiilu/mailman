import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { saveTlsPolicy } from "../../actions/tlsPolicies";

import TlsPolicyForm from "../../components/forms/TlsPolicyForm";

class TlsPoliciesNew extends Component {
  handleSubmit = data => {
    return this.props.saveTlsPolicy(data);
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
          <Typography type="headline">Add TLS Policy</Typography>
        </Grid>
        <Grid item xs={12}>
          <TlsPolicyForm submit={this.handleSubmit} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(connect(mapStateToProps, { saveTlsPolicy }));

export default enhance(TlsPoliciesNew);
