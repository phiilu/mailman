import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import Domain from "../components/Domain";
import PageTitle from "../components/styles/PageTitle";
import DomainTable from "../components/DomainTable";
import Loading from "../components/Loading";
import DomainToolbar from "../components/DomainToolbar";

import FormDialog from "../components/FormDialog";
import ConfirmDialog from "../components/ConfirmDialog";

import NewAccountForm from "../components/NewAccountForm";
import NewDomainForm from "../components/NewDomainForm";

const DomainCards = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: 1fr;
  align-items: center;
`;

const FETCH_ALL_DOMAINS_QUERY = gql`
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

const DELETE_DOMAIN_MUTATION = gql`
  mutation DELETE_DOMAIN_MUTATION($domainId: Int!) {
    deleteDomain(id: $domainId)
  }
`;

class Dashboard extends React.Component {
  state = {
    domain: null,
    dialog: {
      open: false,
      title: "New Dialog",
      form: null
    },
    confirmDialog: {
      open: false,
      title: "Confirm Dialog",
      content: "Are you sure?",
      info: null,
      mutation: DELETE_DOMAIN_MUTATION,
      variables: {}
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

  handleConfirmDialogOpen = ({
    title,
    content,
    info,
    mutation,
    variables
  }) => e => {
    this.setState({
      confirmDialog: {
        ...this.state.confirmDialog,
        title,
        content,
        info,
        mutation,
        variables,
        open: true
      }
    });
  };

  handleDialogClose = () => {
    this.setState({ dialog: { ...this.state.dialog, open: false } });
  };

  handleConfirmDialogClose = () => {
    // clear out the domain, so the data table is not showing up
    if (
      this.state.domain &&
      this.state.domain.domain === this.state.confirmDialog.info
    ) {
      this.setState({
        domain: null
      });
    }
    this.setState({
      confirmDialog: {
        open: false,
        title: "Confirm Dialog",
        content: "Are you sure?",
        info: null,
        mutation: DELETE_DOMAIN_MUTATION,
        variables: {}
      }
    });
  };

  render() {
    return (
      <Query query={FETCH_ALL_DOMAINS_QUERY}>
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
              <DomainToolbar
                openCreateDomainDialog={this.handleDialogOpen({
                  title: "Create Domain",
                  form: <NewDomainForm handleClose={this.handleDialogClose} />
                })}
              />
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
                              domain={domain}
                              domains={data.domains}
                              handleClose={this.handleDialogClose}
                            />
                          )
                        })}
                        openDeleteDomainDialog={this.handleConfirmDialogOpen({
                          title: `Delete Domain: `,
                          content: `Are you sure you want to delete this domain?`,
                          info: domain.domain,
                          mutation: DELETE_DOMAIN_MUTATION,
                          variables: { domainId: domain.id }
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
                  <ConfirmDialog
                    open={this.state.confirmDialog.open}
                    title={this.state.confirmDialog.title}
                    content={this.state.confirmDialog.content}
                    info={this.state.confirmDialog.info}
                    mutation={this.state.confirmDialog.mutation}
                    variables={this.state.confirmDialog.variables}
                    handleClose={this.handleConfirmDialogClose}
                  />
                  {this.state.domain && (
                    <DomainTable domain={this.state.domain} />
                  )}
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
export { FETCH_ALL_DOMAINS_QUERY };
