import React, { Component } from "react";
import { connect } from "react-redux";

import compose from "lodash/fp/compose";

import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import { withStyles } from "material-ui/styles";

import { saveAlias } from "../../actions/aliases";

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

class AliasesNew extends Component {
  handleSubmit = data => {
    return this.props.saveAlias(data);
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.header}>
              <Typography type="headline">Add Alias</Typography>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.body}>
              <AliasForm submit={this.handleSubmit} />
            </div>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps, { saveAlias })
);

export default enhance(AliasesNew);
