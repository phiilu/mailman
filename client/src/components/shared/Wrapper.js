import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  wrapper: {
    padding: "2.5% 5%",
    maxWidth: "1080px",
    margin: "0 auto",
    "@media (max-width: 530px)": {
      padding: "2.5%"
    }
  }
};

export default withStyles(styles)(({ children, classes }) => {
  return <div className={classes.wrapper}>{children}</div>;
});
