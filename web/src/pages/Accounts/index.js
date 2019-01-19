import React, { useState } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { useQuery, useMutation } from "react-apollo-hooks";

import AccountList from "components/Account/AccountList";
import AccountCreate from "components/Account/AccountCreate";
import AccountEdit from "components/Account/AccountEdit";

import Content from "components/util/Content";
import Loading from "components/util/Loading";

import { row, withForm } from "styles/global.module.scss";
import { ALL_DOMAINS_QUERY } from "pages/Domains";
import { GET_STATS_QUERY } from "components/Header";

// GraphQL Queries
const ALL_ACCOUNTS_QUERY = gql`
  query ALL_ACCOUNTS_QUERY($domain: String) {
    accounts(domain: $domain) {
      nodes {
        id
        username
        domain {
          id
          domain
        }
        email
        quota
        enabled
        sendonly
      }
    }
  }
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CREATE_ACCOUNT_MUTATION(
    $email: String
    $username: String
    $domain: String
    $password: String!
    $quota: Int
    $enabled: Int
    $sendonly: Int
  ) {
    createAccount(
      email: $email
      username: $username
      domain: $domain
      password: $password
      quota: $quota
      enabled: $enabled
      sendonly: $sendonly
    ) {
      id
      username
      domain {
        id
        domain
      }
      email
      quota
      enabled
      sendonly
    }
  }
`;

export default function Accounts({ domain }) {
  const [showCreateAccount, setShowCreateAccount] = useState(true);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [editAccountId, setEditAccountId] = useState(0);

  // queries
  const { data, loading, error } = useQuery(ALL_ACCOUNTS_QUERY, {
    suspend: false,
    variables: { domain }
  });
  const {
    data: domainsData,
    loading: domainsLoading,
    error: domainsError
  } = useQuery(ALL_DOMAINS_QUERY, {
    suspend: false
  });

  // mutations
  const createAccount = useMutation(CREATE_ACCOUNT_MUTATION, {
    refetchQueries: [{ query: ALL_ACCOUNTS_QUERY }, { query: GET_STATS_QUERY }]
  });

  if (error || domainsError) {
    console.log(error.response);
    return `Error!`;
  }
  if (loading || domainsLoading) return <Loading />;

  const accounts = data.accounts.nodes;
  const domains = domainsData.domains.nodes;

  const showEditAccountHideCeateAccount = id => {
    if (showCreateAccount) {
      setShowCreateAccount(false);
    }
    setEditAccountId(id);
    setShowEditAccount(true);
  };

  const showCreateAccountHideEditAccount = () => {
    if (showEditAccount) {
      setShowEditAccount(false);
    }
    setShowCreateAccount(true);
  };

  return (
    <div>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateAccount || showEditAccount
          })}
        >
          {!!accounts.length ? (
            <div className="col">
              <h1>{domain ? `${domain} Accounts` : "All Accounts"}</h1>
              <AccountList
                accounts={accounts}
                showCreateAccountHideEditAccount={
                  showCreateAccountHideEditAccount
                }
                showEditAccountHideCeateAccount={
                  showEditAccountHideCeateAccount
                }
              />
            </div>
          ) : (
            <div />
          )}
          <div className="col">
            {showCreateAccount && (
              <>
                <h1>Create Account</h1>
                <AccountCreate
                  domains={domains}
                  showCreateAccount={showCreateAccount}
                  setShowCreateAccount={setShowCreateAccount}
                  createAccount={createAccount}
                />
              </>
            )}
            {showEditAccount && (
              <>
                <h1>Edit Account</h1>
                <AccountEdit
                  showEditAccount={showEditAccount}
                  setShowEditAccount={setShowEditAccount}
                />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
