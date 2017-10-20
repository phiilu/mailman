import React from "react";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "material-ui/Dialog";
import Slide from "material-ui/transitions/Slide";

export default class AlertDialog extends React.Component {
  state = {
    open: false
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      this.setState({ open: true });
    }
  }

  handleRequestClose = agree => () => {
    if (agree) {
      this.props.agree();
    }
    this.setState({ open: false });
  };

  render() {
    const { title, content, agreeButton, disagreeButton } = this.props;
    return (
      <Dialog
        open={this.state.open}
        transition={<Slide direction="up" />}
        keepMounted
        onRequestClose={this.handleRequestClose}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose(true)} color="primary">
            {disagreeButton}
          </Button>
          <Button onClick={this.handleRequestClose(false)} color="primary">
            {agreeButton}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
