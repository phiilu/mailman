import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import AccountIcon from "@material-ui/icons/AccountCircle";

import { toast } from "react-toastify";

import compose from "lodash/fp/compose";
import startCase from "lodash/startCase";

import { logout } from "../../actions/authentication";

const styles = {
  flex: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    "& > *": {
      textDecoration: "none",
      color: "white"
    },
    "& > svg": {
      marginRight: "0.5em"
    }
  },
  logout: {
    marginLeft: "15px",
    color: "white"
  }
};

class Navigation extends Component {
  logout = () => {
    this.props.logout();
    toast.success("Have a great day!");
  };

  render() {
    const { classes, token, username } = this.props;
    return (
      <AppBar
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
          [classes[`appBarShift-${anchor}`]]: open
        })}
      >
        <Toolbar disableGutters={!open}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={this.handleDrawerOpen}
            className={classNames(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={classes.flex}
            noWrap
          >
            <Link to="/">Mailman</Link>
          </Typography>
          {token && [
            <span key={1}>
              <Typography
                variant="subheading"
                color="inherit"
                className={classes.flex}
              >
                <AccountIcon /> {startCase(username)}
              </Typography>
            </span>,
            <IconButton
              className={classes.logout}
              key={2}
              onClick={this.logout}
            >
              <LogoutIcon />
            </IconButton>
          ]}
        </Toolbar>
      </AppBar>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  token: state.authentication.token,
  username: state.authentication.email.split("@")[0]
});

const enhance = compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { logout }
  )
);

export default enhance(Navigation);
