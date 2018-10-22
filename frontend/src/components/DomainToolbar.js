import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import styled from "styled-components";

const LeftAddIconButton = styled(AddIcon)`
  && {
    margin-right: 8px;
  }
`;

const StyledToolbar = styled(Toolbar)`
  && {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    padding: 1rem 0;
  }
`;

const DomainToolbar = ({ openCreateDomainDialog }) => {
  return (
    <StyledToolbar>
      <Button
        color="secondary"
        variant="contained"
        onClick={openCreateDomainDialog}
      >
        <LeftAddIconButton />
        Domain
      </Button>
      <Button color="secondary" variant="contained">
        <LeftAddIconButton />
        TLS Policy
      </Button>
    </StyledToolbar>
  );
};

export default DomainToolbar;
