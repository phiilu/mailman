import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import DomainForm from "../../components/forms/DomainForm";

class DomainsNew extends Component {
  handleSubmit = data => {
    const { id } = this.props.match.params;
    return this.props.updateDomain(id, data);
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
          <Typography type="headline">Edit Domain</Typography>
        </Grid>
        <Grid item xs={12}>
          <DomainForm submit={this.handleSubmit} update />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(connect(mapStateToProps));

export default enhance(DomainsNew);
