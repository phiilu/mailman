import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import styled from "styled-components";

const DialogTitleStyled = styled(DialogTitle)`
  background: #eee;
`;

class FormDialog extends Component {
  render() {
    const { open, handleClose, title, form } = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
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
