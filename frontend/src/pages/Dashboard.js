import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import Domain from "../components/Domain";
import PageTitle from "../components/styles/PageTitle";
import DomainTable from "../components/DomainTable";

const DomainCards = styled.div`
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
`;

const ALL_DOMAINS_QUERY = gql`
  query ALL_DOMAINS_QUERY {
    domains {
      id
      domain
      accounts {
        count
      }
    }
  }
`;

class Dashboard extends React.Component {
  state = {
    domain: null
  };

  handleDomainClick = domain => e => {
    this.setState({ domain });
  };

  render() {
    return (
      <Query query={ALL_DOMAINS_QUERY}>
        {({ data, loading, error }) => {
          if (error) {
            return (
              <Typography variant="h5">
                There was an error: <code>${error.message}</code>
              </Typography>
            );
          }
          return (
            <>
              <PageTitle variant="h3" noWrap>
                Dashboard
              </PageTitle>
              {loading ? (
                "Loading ..."
              ) : (
                <>
                  <DomainCards>
                    {data.domains.map(domain => (
                      <Domain
                        key={domain.id}
                        domain={domain}
                        handleDomainClick={this.handleDomainClick}
                      />
                    ))}
                  </DomainCards>
                  <DomainTable domain={this.state.domain || data.domains[0]} />
                </>
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
