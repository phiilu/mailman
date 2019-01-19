import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import TlsPolicyList from "components/TlsPolicy/TlsPolicyList";
import TlsPolicyCreate from "components/TlsPolicy/TlsPolicyCreate";
import TlsPolicyEdit from "components/TlsPolicy/TlsPolicyEdit";

import Content from "components/util/Content";
import Loading from "components/util/Loading";

import classNames from "classnames";
import { row, withForm } from "styles/global.module.scss";

// GraphQL Queries
const ALL_TLS_POLICIES_QUERY = gql`
  query ALL_TLS_POLICIES_QUERY {
    tlsPolicies {
      nodes {
        id
        domain
        policy
        params
      }
    }
  }
`;

export default function TlsPolicys() {
  const [showCreateTlsPolicy, setShowCreateTlsPolicy] = useState(true);
  const [showEditTlsPolicy, setShowEditTlsPolicy] = useState(false);
  const { data, loading, error } = useQuery(ALL_TLS_POLICIES_QUERY, {
    suspend: false
  });
  if (error) return `Error! ${error.message}`;
  if (loading) return <Loading />;

  const tlsPolicies = data.tlsPolicies.nodes;

  if (!tlsPolicies) {
    return "Todo: show add tlspolicy view!";
  }

  return (
    <div>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateTlsPolicy || showEditTlsPolicy
          })}
        >
          <div className="col">
            <h1>All TLS Policies</h1>
            <TlsPolicyList
              tlsPolicies={tlsPolicies}
              showCreateTlsPolicy={showCreateTlsPolicy}
              setShowCreateTlsPolicy={setShowCreateTlsPolicy}
              showEditTlsPolicy={showEditTlsPolicy}
              setShowEditTlsPolicy={setShowEditTlsPolicy}
            />
          </div>
          <div className="col">
            {showCreateTlsPolicy && (
              <>
                <h1>Create TLS Policy</h1>
                <TlsPolicyCreate
                  showCreateTlsPolicy={showCreateTlsPolicy}
                  setShowCreateTlsPolicy={setShowCreateTlsPolicy}
                />
              </>
            )}
            {showEditTlsPolicy && (
              <>
                <h1>Edit TlsPolicy</h1>
                <TlsPolicyEdit
                  showEditTlsPolicy={showEditTlsPolicy}
                  setShowEditTlsPolicy={setShowEditTlsPolicy}
                />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
