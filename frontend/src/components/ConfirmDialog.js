import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import styled from "styled-components";
import { Mutation } from "react-apollo";

import { FETCH_ALL_DOMAINS_QUERY } from "../pages/Dashboard";

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
  handleAgree = action => async e => {
    const { handleClose, variables } = this.props;
    await action({ variables });
    handleClose();
  };

  updateDomainsCache(cache, domainId) {
    // get domains from cache
    const { domains } = cache.readQuery({
      query: FETCH_ALL_DOMAINS_QUERY
    });
    // increment the count of the accounts in the domain from the user
    const newDomains = domains.filter(domain => domain.id !== domainId);
    // write the change back to the cache
    cache.writeQuery({
      query: FETCH_ALL_DOMAINS_QUERY,
      data: { domains: newDomains }
    });
  }

  render() {
    const {
      open,
      handleClose,
      title,
      content,
      info,
      mutation,
      variables
    } = this.props;
    return (
      <Mutation
        mutation={mutation}
        variables={variables}
        update={(cache, { data }) => {
          this.updateDomainsCache(cache, variables.domainId);
        }}
      >
        {(action, { loading }) => {
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
                <Button onClick={this.handleAgree(action)} color="primary">
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

export default ConfirmDialog;
