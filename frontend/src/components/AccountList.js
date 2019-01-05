import React from "react";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import DeleteIcon from "@material-ui/icons/Delete";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import gql from "graphql-tag";
import styled from "styled-components";
import { Formik } from "formik";
import { Query, Mutation } from "react-apollo";
import { adopt } from "react-adopt";

import Loading from "./Loading";
import AccountForm from "./AccountForm";
import Error from "./ErrorMessage";

import { humanReadableDataUnits } from "../lib/humanReadableDataUnits";
import {
  updateAccountsCacheAfterDelete,
  updateDomainsCache
} from "../lib/apolloClient";
import { FETCH_ALL_DOMAINS_QUERY } from "../pages/Dashboard";
import { accountSchema } from "../lib/validations";

const ChipStyled = styled(Chip)`
  && {
    margin-left: 1rem;
    padding: 0;
  }
`;

const ExpansionPanelStyled = styled(ExpansionPanel)`
  && {
    background: white;
  }

  && > div {
    padding-left: 0;
  }
`;

const ExpansionPanelSummaryStyled = styled(ExpansionPanelSummary)`
  && > div:first-child {
    align-items: center;
    display: grid;
    grid-template-columns: 80px 1fr 2fr;
  }
`;

const ExpansionPanelIconButton = styled(IconButton)`
  && {
    padding: 12px;
    margin: 0 10px;

    &.delete {
      color: #f73378;
    }
  }
`;

const GET_ACCOUNTS_FOR_DOMAIN_QUERY = gql`
  query GET_ACCOUNTS_FOR_DOMAIN_QUERY($id: Int!) {
    domain(id: $id) {
      accounts {
        nodes {
          id
          email
          username
          domain {
            id
            domain
          }
          quota
          enabled
          sendonly
        }
      }
    }
  }
`;

const DELETE_ACCOUNT_MUTATION = gql`
  mutation DELETE_ACCOUNT_MUTATION($id: Int!) {
    deleteAccount(id: $id)
  }
`;

const UPDATE_ACCOUNT_MUTATION = gql`
  mutation UPDATE_ACCOUNT_MUTATION(
    $id: Int!
    $username: String
    $domain: String
    $password: String
    $quota: Int
    $enabled: Int
    $sendonly: Int
  ) {
    updateAccount(
      id: $id
      username: $username
      domain: $domain
      password: $password
      quota: $quota
      enabled: $enabled
      sendonly: $sendonly
    ) {
      id
      email
      username
      domain {
        id
        domain
      }
      quota
      enabled
      sendonly
    }
  }
`;

/* eslint-disable */
const GraphQLComposed = adopt({
  domainsQuery: ({ render }) => (
    <Query query={FETCH_ALL_DOMAINS_QUERY}>{render}</Query>
  ),
  accountsQuery: ({ render }) => (
    <Query query={GET_ACCOUNTS_FOR_DOMAIN_QUERY} variables={{ id: 1 }}>
      {render}
    </Query>
  ),
  accountDeleteMutation: ({ render }) => (
    <Mutation mutation={DELETE_ACCOUNT_MUTATION}>{render}</Mutation>
  ),
  accountUpdateMutation: ({ render }) => (
    <Mutation mutation={UPDATE_ACCOUNT_MUTATION}>
      {(updateAccount, result) => render({ updateAccount, result })}
    </Mutation>
  )
});
/* eslint-enable */

class AccountList extends React.Component {
  handleAccountDeleteClick = (deleteAccount, account, domainId) => async () => {
    await deleteAccount({
      variables: { id: account.id },
      update: cache => {
        updateAccountsCacheAfterDelete(cache, account, domainId);
        updateDomainsCache(cache, { account, increase: false });
      }
    });
  };

  render() {
    const { openDeleteAccountDialog } = this.props;
    return (
      <GraphQLComposed>
        {({
          domainsQuery,
          accountsQuery,
          accountDeleteMutation: deleteAccount,
          accountUpdateMutation: { updateAccount, result: accountUpdateResult }
        }) => {
          const {
            data: domainsData,
            loading: domainsLoading,
            error: domainsError
          } = domainsQuery;
          const {
            data: accountsData,
            loading: accountsLoading,
            error: accountsError
          } = accountsQuery;

          if (domainsLoading || accountsLoading) return <Loading />;
          if (domainsError) {
            return <Error error={domainsError} />;
          }
          if (accountsError) {
            return <Error error={accountsError} />;
          }

          const { domains } = domainsData;
          const accounts = accountsData.domain.accounts.nodes;

          if (!accounts.length) {
            return "No Accounts found for this domain!";
          }

          return (
            <div>
              {accounts.map(account => (
                <Formik
                  key={account.id}
                  initialValues={{
                    username: account.username,
                    domain: account.domain.domain,
                    password: account.password,
                    quota: account.quota,
                    enabled: account.enabled === 1,
                    sendonly: account.sendonly === 1
                  }}
                  enableReinitialize={true}
                  validationSchema={accountSchema(true)}
                  validateOnChange={false}
                  onSubmit={async values => {
                    if (!values.password) delete values.password;
                    const variables = {
                      ...values,
                      id: account.id,
                      sendonly: values.sendonly ? 1 : 0,
                      enabled: values.enabled ? 1 : 0
                    };
                    await updateAccount({
                      variables: variables
                    });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    handleBlur,
                    setFieldValue,
                    setFieldTouched
                  }) => (
                    <ExpansionPanelStyled>
                      <ExpansionPanelSummaryStyled expandIcon={<EditIcon />}>
                        <ExpansionPanelIconButton
                          className="delete"
                          onClick={e => {
                            e.stopPropagation();
                            openDeleteAccountDialog({
                              title: `Delete Account: `,
                              content: `Are you sure you want to delete this account?`,
                              info: account.email,
                              action: this.handleAccountDeleteClick(
                                deleteAccount,
                                account,
                                account.domain.id
                              )
                            })(); // function must be called, because the signatur is () => () => {}
                          }}
                        >
                          <DeleteIcon />
                        </ExpansionPanelIconButton>
                        <Typography variant="h5">{account.email}</Typography>
                        <div className="chips">
                          <ChipStyled
                            label={`Quota: ${humanReadableDataUnits(
                              account.quota
                            )}`}
                            color="primary"
                            icon={<DataUsageIcon />}
                          />
                          {account.sendonly === 1 && (
                            <ChipStyled label="Sendonly" color="secondary" />
                          )}
                        </div>
                      </ExpansionPanelSummaryStyled>
                      <ExpansionPanelDetails>
                        <AccountForm
                          domains={domains}
                          values={values}
                          errors={errors}
                          touched={touched}
                          handleChange={handleChange}
                          handleSubmit={handleSubmit}
                          handleBlur={handleBlur}
                          setFieldValue={setFieldValue}
                          setFieldTouched={setFieldTouched}
                        />
                      </ExpansionPanelDetails>
                      <Divider />
                      <ExpansionPanelActions>
                        <Button
                          size="small"
                          color="primary"
                          variant="contained"
                          onClick={handleSubmit}
                        >
                          {accountUpdateResult.called
                            ? "Saved"
                            : `Sav${accountUpdateResult.loading ? "ing" : "e"}`}
                        </Button>
                      </ExpansionPanelActions>
                    </ExpansionPanelStyled>
                  )}
                </Formik>
              ))}
            </div>
          );
        }}
      </GraphQLComposed>
    );
  }
}

export default AccountList;
export { GET_ACCOUNTS_FOR_DOMAIN_QUERY };
