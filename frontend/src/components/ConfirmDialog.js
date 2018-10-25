import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";

const DialogTitleStyled = styled(DialogTitle)`
  background: #eee;
`;

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

const DialogContentTextStyled = styled(DialogContentText)`
  padding: 10px 0;
`;

class ConfirmDialog extends Component {
  handleAgree = () => {
    const { handleClose, handleAggree } = this.props;
    handleAggree();
    handleClose();
  };

  render() {
    const { open, handleClose, title, content, info } = this.props;

    return (
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="confirm-dialog-title"
      >
        <DialogTitleStyled id="confirm-dialog-title">
          {title}
          {info && <strong>{info}</strong>}
        </DialogTitleStyled>
        <DialogContent>
          <DialogContentTextStyled
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" autoFocus>
            Disagree
          </Button>
          <Button onClick={this.handleAgree} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ConfirmDialog;
