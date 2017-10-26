import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { updateTlsPolicy } from "../../actions/tlsPolicies";

import TlsPolicyForm from "../../components/forms/TlsPolicyForm";

class TlsPoliciesEdit extends Component {
  handleSubmit = data => {
    const { id } = this.props.match.params;
    return this.props.updateTlsPolicy(id, data);
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
          <Typography type="headline">Edit TLS Policy</Typography>
        </Grid>
        <Grid item xs={12}>
          <TlsPolicyForm submit={this.handleSubmit} update />
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
  connect(mapStateToProps, { updateTlsPolicy })
);

export default enhance(TlsPoliciesEdit);
