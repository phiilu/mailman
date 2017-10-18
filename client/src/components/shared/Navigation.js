import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";

import compose from "lodash/fp/compose";

import { logout } from "../../actions/authentication";

const styles = {
  flex: {
    flex: 1,
    "& > *": {
      textDecoration: "none",
      color: "white"
    }
  }
};

class Navigation extends Component {
  render() {
    const { classes, logout, token } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            <Link to="/">Mailman</Link>
          </Typography>
          {token && (
            <Button color="contrast" onClick={() => logout()}>
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.authentication.token
});

const enhance = compose(
  connect(mapStateToProps, { logout }),
  withStyles(styles)
);

export default enhance(Navigation);
