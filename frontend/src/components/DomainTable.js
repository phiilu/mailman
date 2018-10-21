import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import styled from "styled-components";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { humanReadableDataUnits } from "../lib/humanReadableDataUnits";

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

const columns = ["Email", "Quota"];
const options = {
  print: false,
  selectableRows: true,
  textLabels: {
    body: {
      noMatch: "No accounts found"
    }
  }
};

const getData = accounts => {
  const transformedData = accounts.reduce((accu, account) => {
    accu = [...accu, [account.email, humanReadableDataUnits(account.quota)]];
    return accu;
  }, []);
  return transformedData;
};

class DomainTable extends Component {
  getMuiTheme = () =>
    createMuiTheme({
      palette: {
        primary: {
          light: "#555767",
          main: "#2B2D42",
          dark: "#1e1f2e",
          contrastText: "#fff"
        },
        secondary: {
          light: "#f73378",
          main: "#f50057",
          dark: "#ab003c",
          contrastText: "#fff"
        }
      },
      typography: {
        useNextVariants: true
      },
      overrides: {
        MUIDataTableSelectCell: {
          checked: { color: "#2B2D42 !important" }
        },
        MUIDataTableToolbar: {
          root: {
            background: "#eee"
          },
          iconActive: {
            color: "#2B2D42 !important"
          }
        },
        MuiSwitchBase: {
          input: {
            color: "#2B2D42 !important"
          }
        },
        MUIDataTableFilter: {
          resetLink: {
            color: "#2B2D42 !important",
            "&:hover": {
              color: "#f50057 !important"
            }
          }
        },
        MuiButtonBase: {
          root: {
            color: "#2B2D42 !important",
            "&:hover": {
              color: "#2B2D42 !important"
            }
          }
        },
        MuiInputBase: {
          root: {
            "&:hover, &:focus": {
              color: "#2B2D42 !important"
            }
          },
          focused: {
            color: "#2B2D42 !important"
          },
          formControl: {
            color: "#2B2D42 !important"
          }
        }
      }
    });

  render() {
    const { domain } = this.props;

    return (
      <DomainTableWrapper>
        <Query
          query={GET_ACCOUNTS_FOR_DOMAIN_QUERY}
          variables={{ id: domain.id }}
        >
          {({ data: apolloData, loading, error }) => {
            if (loading) return "loading ...";
            const data = getData(apolloData.domain.accounts.nodes);
            return (
              <MuiThemeProvider theme={this.getMuiTheme()}>
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
  }
}

export default DomainTable;
