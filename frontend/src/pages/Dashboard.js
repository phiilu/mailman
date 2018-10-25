import React from "react";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";

import AccountList from "../components/AccountList";
import AddDomainCard from "../components/styles/AddDomainCard";
import ConfirmDialog from "../components/ConfirmDialog";
import Domain from "../components/Domain";
import DomainCards from "../components/styles/DomainCards";
import FormDialog from "../components/FormDialog";
import Loading from "../components/Loading";
import NewAccountForm from "../components/NewAccountFormForDialog";
import NewDomainForm from "../components/NewDomainForm";
import PageTitle from "../components/styles/PageTitle";

import { updateDomainsCache } from "../lib/apolloClient";

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

/* eslint-disable */
const GraphQLComposed = adopt({
  domainsQuery: ({ render }) => (
    <Query query={FETCH_ALL_DOMAINS_QUERY}>{render}</Query>
  ),
  domainsDeleteMutation: ({ render }) => (
    <Mutation mutation={DELETE_DOMAIN_MUTATION}>{render}</Mutation>
  )
});
/* eslint-enable */

class Dashboard extends React.Component {
  state = {
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
      action: () => {}
    }
  };

  handleDialogOpen = ({ title, form }) => e => {
    this.setState({
      dialog: { ...this.state.dialog, title, form, open: true }
    });
  };

  handleConfirmDialogOpen = ({ title, content, info, action }) => e => {
    this.setState({
      confirmDialog: {
        ...this.state.confirmDialog,
        title,
        content,
        info,
        action,
        open: true
      }
    });
  };

  handleDialogClose = () => {
    this.setState({ dialog: { ...this.state.dialog, open: false } });
  };

  handleConfirmDialogClose = () => {
    this.setState({
      confirmDialog: {
        ...this.state.confirmDialog,
        open: false
      }
    });
  };

  /**
   * A function that returns a function so that in can be called with the arguments, but
   * the actual call to the backend will start when it gets called again.
   *
   * For example this function is used to acknowledge the deletion of a domain in the ConfirmDialog
   */
  handleDomainDeleteClick = (deleteDomain, variables) => async () => {
    await deleteDomain({
      variables,
      update: (cache, { data }) => {
        updateDomainsCache(cache, { domainId: variables.domainId });
      }
    });
  };

  render() {
    return (
      <>
        <PageTitle variant="h3" noWrap>
          Dashboard
        </PageTitle>
        <GraphQLComposed>
          {({
            domainsQuery: { data, loading, error },
            domainsDeleteMutation: deleteDomain
          }) => {
            if (error) {
              return (
                <Typography variant="h5">
                  There was an error: <code>${error.message}</code>
                </Typography>
              );
            }
            if (loading) return <Loading />;
            if (!data.domains.length) {
              return (
                <DomainCards>
                  <AddDomainCard
                    openCreateDomainDialog={this.handleDialogOpen({
                      title: "Create Domain",
                      form: (
                        <NewDomainForm handleClose={this.handleDialogClose} />
                      )
                    })}
                  />
                </DomainCards>
              );
            }
            return (
              <DomainCards>
                <AddDomainCard
                  openCreateDomainDialog={this.handleDialogOpen({
                    title: "Create Domain",
                    form: <NewDomainForm handleClose={this.handleDialogClose} />
                  })}
                />
                {data.domains.map((domain, i) => (
                  <Domain
                    key={domain.id}
                    domain={domain}
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
                      action: this.handleDomainDeleteClick(deleteDomain, {
                        domainId: domain.id
                      })
                    })}
                  />
                ))}
              </DomainCards>
            );
          }}
        </GraphQLComposed>
        <FormDialog
          title={this.state.dialog.title}
          open={this.state.dialog.open}
          form={this.state.dialog.form}
        />
        <ConfirmDialog
          open={this.state.confirmDialog.open}
          title={this.state.confirmDialog.title}
          content={this.state.confirmDialog.content}
          info={this.state.confirmDialog.info}
          handleAggree={this.state.confirmDialog.action}
          handleClose={this.handleConfirmDialogClose}
        />
        <AccountList openDeleteAccountDialog={this.handleConfirmDialogOpen} />
      </>
    );
  }
}

export default Dashboard;
export { FETCH_ALL_DOMAINS_QUERY };
