import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

import { updateAlias } from "../../actions/aliases";

import AliasForm from "../../components/forms/AliasForm";

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

class AliasesEdit extends Component {
  handleSubmit = data => {
    const { id } = this.props.match.params;
    return this.props.updateAlias(id, data);
  };

  render() {
    const { isAdmin, classes } = this.props;

    if (!isAdmin) {
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
              <Typography type="headline">Edit Alias</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.body}>
              <AliasForm submit={this.handleSubmit} update />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  isAdmin: state.authentication.admin
});

const enhance = compose(
  withStyles(styles),
  withRouter,
  connect(mapStateToProps, { updateAlias })
);

export default enhance(AliasesEdit);
