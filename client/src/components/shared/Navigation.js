import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import { withStyles } from "material-ui/styles";
import { toast } from "react-toastify";

import compose from "lodash/fp/compose";
import startCase from "lodash/startCase";

import { logout } from "../../actions/authentication";

const styles = {
  flex: {
    flex: 1,
    "& > *": {
      textDecoration: "none",
      color: "white"
    }
  },
  logout: {
    marginLeft: "15px"
  }
};

class Navigation extends Component {
  logout = () => {
    this.props.logout();
    toast.success("See you!");
  };

  render() {
    const { classes, token, username } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography type="title" color="inherit" className={classes.flex}>
            <Link to="/">Mailman</Link>
          </Typography>
          {token && [
            <span key={1}>
              <Typography
                type="subheading"
                color="inherit"
                className={classes.flex}
              >
                {startCase(username)}
              </Typography>
            </span>,
            <Button
              className={classes.logout}
              key={2}
              color="contrast"
              onClick={this.logout}
            >
              Logout
            </Button>
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
  connect(mapStateToProps, { logout })
);

export default enhance(Navigation);
