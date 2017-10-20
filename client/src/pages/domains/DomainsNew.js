import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { saveDomain } from "../../actions/domains";

import DomainForm from "../../components/forms/DomainForm";

class DomainsNew extends Component {
  handleSubmit = data => {
    return this.props.saveDomain(data);
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
          <Typography type="headline">Add Domain</Typography>
        </Grid>
        <Grid item xs={12}>
          <DomainForm submit={this.handleSubmit} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(connect(mapStateToProps, { saveDomain }));

export default enhance(DomainsNew);
