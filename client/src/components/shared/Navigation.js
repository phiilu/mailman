import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import { withStyles } from "material-ui/styles";

import compose from "lodash/fp/compose";

import { logout } from "../../actions/authentication";

const styles = {
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Navigation extends Component {
  render() {
    const { classes, logout, token } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="contrast"
            aria-label="Menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            M
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
