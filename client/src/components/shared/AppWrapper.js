import { withStyles } from "material-ui/styles";

const styles = theme => ({
  "@global": {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: "antialiased", // Antialiasing.
      MozOsxFontSmoothing: "grayscale" // Antialiasing.
    },
    body: {
      margin: 0
    }
  }
});

const AppWrapper = props => props.children;

export default withStyles(styles)(AppWrapper);
