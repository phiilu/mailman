import React from "react";
import { Link } from "@reach/router";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";

import ChevronLeftIcon from "components/icons/ChevronLeft";
import ChevronRightIcon from "components/icons/ChevronRight";

import { PER_PAGE } from "config";
import { ALL_DOMAINS_QUERY } from "pages/Domains";

import styles from "./Pagination.module.scss";

export const COUNT_QUERY = gql`
  query COUNT_QUERY {
    domainCount
    accountsCount
    aliasesCount
    tlsPoliciesCount
  }
`;

export default function Pagination({ type = "domains", page }) {
  const { data, loading } = useQuery(COUNT_QUERY, {
    refetchQueris: [{ query: ALL_DOMAINS_QUERY }]
  });

  if (loading) return "Loading ...";
  console.log(data);

  let count;
  switch (type) {
    case "domains":
      count = data.domainCount;
      break;
    default:
      count = data.domainCount;
  }
  const pages = Math.ceil(count / PER_PAGE);

  return (
    <ul className={styles.pagination}>
      <li>
        <Link to={`/${type}?page=${page - 1 < 1 ? 1 : page - 1}`}>
          <ChevronLeftIcon primary />
        </Link>
      </li>
      <li>
        Page <span>{page}</span> of <span>{pages}</span>
      </li>
      <li>
        <Link to={`/${type}?page=${page + 1 > pages ? pages : page + 1}`}>
          <ChevronRightIcon primary />
        </Link>
      </li>
    </ul>
  );
}
