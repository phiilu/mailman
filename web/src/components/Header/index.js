import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import Content from "components/util/Content";
import Stats, { Stat } from "components/util/Stats";
import { well } from "./Header.module.scss";

export const GET_STATS_QUERY = gql`
  query GET_STATS_QUERY {
    domainCount
    accountsCount
    tlsPoliciesCount
    aliasesCount
  }
`;

export default function Header() {
  const { data, loading, error } = useQuery(GET_STATS_QUERY, {
    suspend: false
  });
  if (error) return `Error! ${error.message}`;

  const { domainCount, accountsCount, tlsPoliciesCount, aliasesCount } = data;

  return (
    <header className={well}>
      <Content>
        <Stats>
          <Stat title={"Domains"}>{loading ? 0 : domainCount}</Stat>
          <Stat title={"Users"}>{loading ? 0 : accountsCount}</Stat>
          <Stat title={"Aliases"}>{loading ? 0 : aliasesCount}</Stat>
          <Stat title={"TLS Policies"}>{loading ? 0 : tlsPoliciesCount}</Stat>
        </Stats>
      </Content>
    </header>
  );
}
