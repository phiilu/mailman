import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const CardTitle = styled(CardContent)`
  && {
    background: #eee;
    color: #1e1f2e;
    padding: 5px 24px 5px 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;

    h2 {
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .icons {
      justify-self: end;
    }

    button.delete {
      color: #f73378;
    }
  }
`;

const DashboardNumbers = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  .number-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number-text {
      color: #555767;
    }
  }
`;

const CardActionsGrid = styled(CardActions)`
  && {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

class Domain extends Component {
  render() {
    const {
      domain,
      openCreateAccountDialog,
      openDeleteDomainDialog
    } = this.props;

    return (
      <Card>
        <CardTitle>
          <Typography gutterBottom variant="h5" component="h2">
            {domain.domain}
          </Typography>
          <div className="icons">
            <IconButton
              aria-label="Edit"
              className="edit"
              onClick={openDeleteDomainDialog}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete"
              className="delete"
              onClick={openDeleteDomainDialog}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </CardTitle>
        <CardActionArea>
          <CardContent>
            <DashboardNumbers>
              <div className="number-item">
                <Typography variant="h3" className="number">
                  {domain.accounts.count}
                </Typography>
                <Typography variant="h6" className="number-text">
                  Account
                  {domain.accounts.count === 1 ? "" : "s"}
                </Typography>
              </div>
              <div className="number-item">
                <Typography variant="h3" className="number">
                  0
                </Typography>
                <Typography variant="h6" className="number-text">
                  Aliases
                </Typography>
              </div>
            </DashboardNumbers>
          </CardContent>
        </CardActionArea>
        <CardActionsGrid>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={openCreateAccountDialog}
          >
            Add Account
          </Button>
          <Button size="small" variant="contained" color="primary">
            Add Alias
          </Button>
        </CardActionsGrid>
      </Card>
    );
  }
}

export default Domain;
