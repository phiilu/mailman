import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";
import Slide from "@material-ui/core/Slide";

const DialogTitleStyled = styled(DialogTitle)`
  background: #eee;
`;

const Transition = props => {
  return <Slide direction="up" {...props} />;
};

class FormDialog extends Component {
  render() {
    const { open, handleClose, title, form } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        disableBackdropClick
        disableEscapeKeyDown
        aria-labelledby="form-dialog-title"
      >
        <DialogTitleStyled id="form-dialog-title">{title}</DialogTitleStyled>
        {form}
      </Dialog>
    );
  }
}

export default FormDialog;
