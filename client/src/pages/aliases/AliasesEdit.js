import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { updateAlias } from "../../actions/aliases";

import AliasForm from "../../components/forms/AliasForm";

class AliasesEdit extends Component {
  handleSubmit = data => {
    const { id } = this.props.match.params;
    return this.props.updateAlias(id, data);
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
          <Typography type="headline">Update Alias</Typography>
        </Grid>
        <Grid item xs={12}>
          <AliasForm submit={this.handleSubmit} update />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(withRouter, connect(mapStateToProps, { updateAlias }));

export default enhance(AliasesEdit);
