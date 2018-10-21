import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import Domain from "../components/Domain";
import PageTitle from "../components/styles/PageTitle";
import DomainTable from "../components/DomainTable";
import FormDialog from "../components/FormDialog";
import Loading from "../components/Loading";
import NewAccountForm from "../components/NewAccountForm";

const DomainCards = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
  align-items: center;
  justify-items: center;
`;

const ALL_DOMAINS_QUERY = gql`
  query ALL_DOMAINS_QUERY {
    domains {
      id
      domain
      accounts {
        count
      }
    }
  }
`;

class Dashboard extends React.Component {
  state = {
    domain: null,
    dialog: {
      open: false,
      title: "New Dialog",
      form: null
    }
  };

  handleDomainClick = domain => e => {
    this.setState({ domain });
  };

  handleDialogOpen = ({ title, form }) => e => {
    this.setState({
      dialog: { ...this.state.dialog, title, form, open: true }
    });
  };

  handleDialogClose = () => {
    this.setState({ dialog: { ...this.state.dialog, open: false } });
  };

  render() {
    return (
      <Query query={ALL_DOMAINS_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return (
              <Typography variant="h5">
                There was an error: <code>${error.message}</code>
              </Typography>
            );
          }
          return (
            <>
              <PageTitle variant="h3" noWrap>
                Dashboard
              </PageTitle>
              {loading ? (
                <Loading />
              ) : (
                <>
                  <DomainCards>
                    {data.domains.map(domain => (
                      <Domain
                        key={domain.id}
                        domain={domain}
                        handleDomainClick={this.handleDomainClick}
                        openCreateAccountDialog={this.handleDialogOpen({
                          title: "Create Account",
                          form: (
                            <NewAccountForm
                              domain={domain.domain}
                              domains={data.domains}
                            />
                          )
                        })}
                      />
                    ))}
                  </DomainCards>
                  <FormDialog
                    title={this.state.dialog.title}
                    open={this.state.dialog.open}
                    form={this.state.dialog.form}
                    handleClose={this.handleDialogClose}
                  />
                  <DomainTable domain={this.state.domain || data.domains[0]} />
                </>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default Dashboard;
export { ALL_DOMAINS_QUERY };
