import React from "react";
import { withStyles } from "material-ui/styles";

const styles = {
  wrapper: {
    padding: "2.5% 5%"
  }
};

export default withStyles(styles)(({ children, classes }) => {
  return <div className={classes.wrapper}>{children}</div>;
});
