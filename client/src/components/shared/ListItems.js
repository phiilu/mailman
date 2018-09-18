// This file is shared across the demos.
import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import PublicIcon from "@material-ui/icons/Public";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import DashBoardIcon from "@material-ui/icons/Dashboard";

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class ListItems extends React.Component {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, domains } = this.props;

    console.log(domains);

    return (
      <div className={classes.root}>
        <ListItem>
          <ListItemIcon>
            <DashBoardIcon />
          </ListItemIcon>
          <ListItemText inset primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={this.handleClick}>
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText inset primary="Domains" />
          {this.state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {domains.map(domain => (
              <ListItem key={domain.id} button className={classes.nested}>
                <ListItemText inset primary={domain.domain} />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  domains: state.data.domains
});

const enhance = compose(
  withStyles(styles),
  connect(mapStateToProps)
);

export default enhance(ListItems);
