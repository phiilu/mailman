import React from "react";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

const AddDomainCardStyled = styled(Card)`
  && {
    height: 100%;
    min-height: 150px;
    min-width: 150px;
    background: #a9a9a92e;
    position: relative;

    .content {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      text-align: center;
    }

    button {
      height: 100%;
      width: 100%;
    }

    svg {
      font-size: 3rem;
      color: #949494;
    }

    h6 {
      color: #949494;
    }
  }
`;

const AddDomainCard = ({ openCreateDomainDialog }) => (
  <AddDomainCardStyled>
    <div className="content">
      <CardActionArea onClick={openCreateDomainDialog}>
        <AddIcon />
        <Typography variant="h6">Domain</Typography>
      </CardActionArea>
    </div>
  </AddDomainCardStyled>
);

export default AddDomainCard;
