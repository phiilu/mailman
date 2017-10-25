import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";

import { saveAlias } from "../../actions/aliases";

import AliasForm from "../../components/forms/AliasForm";

class AliasesNew extends Component {
  handleSubmit = data => {
    return this.props.saveAlias(data);
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
          <Typography type="headline">Add Alias</Typography>
        </Grid>
        <Grid item xs={12}>
          <AliasForm submit={this.handleSubmit} />
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(connect(mapStateToProps, { saveAlias }));

export default enhance(AliasesNew);
