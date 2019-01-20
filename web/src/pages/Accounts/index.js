import React, { useState } from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import AccountList from "components/Account/AccountList";
import AccountCreate from "components/Account/AccountCreate";
import AccountEdit from "components/Account/AccountEdit";

import Content from "components/util/Content";
import Loading from "components/util/Loading";

import { row, withForm } from "styles/global.module.scss";

// GraphQL Queries
export const ALL_ACCOUNTS_QUERY = gql`
  query ALL_ACCOUNTS_QUERY {
    accounts {
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

export const ALL_ACCOUNTS_BY_DOMAIN_QUERY = gql`
  query ALL_ACCOUNTS_BY_DOMAIN_QUERY($domain: String) {
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

export default function Accounts({ domain }) {
  const [showCreateAccount, setShowCreateAccount] = useState(true);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [editAccountId, setEditAccountId] = useState(0);

  let query;
  // queries
  if (domain) {
    query = useQuery(ALL_ACCOUNTS_BY_DOMAIN_QUERY, {
      suspend: false,
      variables: { domain }
    });
  } else {
    query = useQuery(ALL_ACCOUNTS_QUERY, {
      suspend: false
    });
  }
  const { data, loading, error } = query;

  if (loading) return <Loading />;

  const accounts = data.accounts.nodes;

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
                  showCreateAccount={showCreateAccount}
                  setShowCreateAccount={setShowCreateAccount}
                  domain={domain}
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
