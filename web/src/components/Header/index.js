import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import Content from "components/util/Content";
import Stats, { Stat } from "components/util/Stats";
import { well } from "./Header.module.scss";

import { COUNT_QUERY } from "components/Pagination";

export default function Header() {
  const { data, loading, error } = useQuery(COUNT_QUERY, {
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
