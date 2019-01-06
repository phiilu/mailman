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
const ALL_ACCOUNTS_QUERY = gql`
  query ALL_ACCOUNTS_QUERY($domain: String) {
    accounts(domain: $domain) {
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
  const { data, loading, error } = useQuery(ALL_ACCOUNTS_QUERY, {
    suspend: false,
    variables: { domain }
  });
  if (error) return `Error! ${error.message}`;
  if (loading) return <Loading />;

  const { accounts } = data;

  if (!accounts.length) {
    // return "Todo: show add account view!";
  }

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
                showCreateAccount={showCreateAccount}
                setShowCreateAccount={setShowCreateAccount}
                showEditAccount={showEditAccount}
                setShowEditAccount={setShowEditAccount}
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
