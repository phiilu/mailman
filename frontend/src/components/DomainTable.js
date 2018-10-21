import React from "react";
import MUIDataTable from "mui-datatables";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import Loading from "./Loading";

import { humanReadableDataUnits } from "../lib/humanReadableDataUnits";
import { tableTheme } from "../lib/theme";

const DomainTableWrapper = styled.div`
  margin: 2rem 0;
`;

const GET_ACCOUNTS_FOR_DOMAIN_QUERY = gql`
  query GET_ACCOUNTS_FOR_DOMAIN_QUERY($id: Int!) {
    domain(id: $id) {
      accounts {
        nodes {
          id
          email
          quota
        }
      }
    }
  }
`;

const columns = [
  {
    name: "Email",
    options: {
      filter: false,
      sort: true
    }
  },
  "Quota"
];

const options = {
  print: false,
  selectableRows: true,
  responsive: "scroll",
  textLabels: {
    body: {
      noMatch: "No accounts found"
    }
  }
};

const transformData = accounts => {
  const transformedData = accounts.reduce((accu, account) => {
    accu = [...accu, [account.email, humanReadableDataUnits(account.quota)]];
    return accu;
  }, []);
  return transformedData;
};

const DomainTable = ({ domain }) => {
  return (
    <DomainTableWrapper>
      <Query
        query={GET_ACCOUNTS_FOR_DOMAIN_QUERY}
        variables={{ id: domain.id }}
      >
        {({ data: apolloData, loading, error }) => {
          if (loading) return <Loading />;
          const data = transformData(apolloData.domain.accounts.nodes);
          // no accounts for domain
          if (!data.length)
            return (
              <Typography>
                No Accounts yet for <strong>{domain.domain}</strong>
              </Typography>
            );
          return (
            <MuiThemeProvider theme={tableTheme}>
              <MUIDataTable
                title={domain.domain}
                data={data}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          );
        }}
      </Query>
    </DomainTableWrapper>
  );
};

export default DomainTable;
export { GET_ACCOUNTS_FOR_DOMAIN_QUERY };
