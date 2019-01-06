import React, { useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import AliasList from "components/Alias/AliasList";
import AliasCreate from "components/Alias/AliasCreate";
import AliasEdit from "components/Alias/AliasEdit";

import Content from "components/util/Content";
import Loading from "components/util/Loading";

import classNames from "classnames";
import { row, withForm } from "styles/global.module.scss";

// GraphQL Queries
const ALL_ALIASES_QUERY = gql`
  query ALL_ALIASES_QUERY($email: String) {
    aliases(email: $email) {
      id
      sourceEmail
      sourceUsername
      sourceDomain {
        id
        domain
      }
      destinationEmail
      destinationUsername
      destinationDomain
      enabled
    }
  }
`;

export default function Aliases({ email }) {
  const [showCreateAlias, setShowCreateAlias] = useState(true);
  const [showEditAlias, setShowEditAlias] = useState(false);
  const { data, loading, error } = useQuery(ALL_ALIASES_QUERY, {
    suspend: false,
    variables: { email }
  });
  if (error) return `Error! ${error.message}`;
  if (loading) return <Loading />;

  const { aliases } = data;

  if (!aliases.length) {
    return "Todo: show add alias view!";
  }

  return (
    <div>
      <Content>
        <div
          className={classNames({
            [row]: true,
            [withForm]: showCreateAlias || showEditAlias
          })}
        >
          <div className="col">
            <h1>All Aliases</h1>
            <AliasList
              aliases={aliases}
              showCreateAlias={showCreateAlias}
              setShowCreateAlias={setShowCreateAlias}
              showEditAlias={showEditAlias}
              setShowEditAlias={setShowEditAlias}
            />
          </div>
          <div className="col">
            {showCreateAlias && (
              <>
                <h1>Create Alias</h1>
                <AliasCreate
                  showCreateAlias={showCreateAlias}
                  setShowCreateAlias={setShowCreateAlias}
                />
              </>
            )}
            {showEditAlias && (
              <>
                <h1>Edit Alias</h1>
                <AliasEdit
                  showEditAlias={showEditAlias}
                  setShowEditAlias={setShowEditAlias}
                />
              </>
            )}
          </div>
        </div>
      </Content>
    </div>
  );
}
