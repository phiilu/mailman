import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import PageTitle from "../components/styles/PageTitle";

const ALL_DOMAINS_QUERY = gql`
  query ALL_DOMAINS_QUERY {
    domains {
      id
      domain
    }
  }
`;

class Dashboard extends React.Component {
  render() {
    return (
      <Query query={ALL_DOMAINS_QUERY}>
        {({ data, loading }) => {
          return (
            <>
              <PageTitle variant="h3" noWrap>
                Dashboard
              </PageTitle>
              {loading ? (
                "Loading ..."
              ) : (
                <ul>
                  {data.domains.map(domain => (
                    <li key={domain.id}>{domain.domain}</li>
                  ))}
                </ul>
              )}
            </>
          );
        }}
      </Query>
    );
  }
}

export default Dashboard;
export { ALL_DOMAINS_QUERY };
