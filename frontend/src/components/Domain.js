import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const CardTitle = styled(CardContent)`
  && {
    background: #eee;
    color: #1e1f2e;
    padding: 16px 24px 5px 24px;
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

class Domain extends Component {
  render() {
    const { domain, handleDomainClick } = this.props;

    return (
      <Card>
        <CardActionArea onClick={handleDomainClick(domain)}>
          <CardTitle>
            <Typography gutterBottom variant="h5" component="h2">
              {domain.domain}
            </Typography>
          </CardTitle>
          <CardContent>
            <DashboardNumbers>
              <div className="number-item">
                <Typography variant="h3" className="number">
                  {domain.accounts.count}
                </Typography>
                <Typography variant="h6" className="number-text">
                  Accounts
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
        <CardActions>
          <Button size="small" variant="contained" color="secondary">
            Add Account
          </Button>
          <Button size="small" variant="contained" color="secondary">
            Add Alias
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default Domain;
