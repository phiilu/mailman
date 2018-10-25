import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";

import { FETCH_ALL_DOMAINS_QUERY } from "../pages/Dashboard";
import { GET_ACCOUNTS_FOR_DOMAIN_QUERY } from "../components/AccountList";

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "development" ? endpoint : prodEndpoint,
  request: operation => {
    operation.setContext({
      fetchOptions: {
        credentials: "include"
      }
    });
  }
});

const updateDomainsCache = (cache, { domainId, account, increase = true }) => {
  // get domains from cache
  const { domains } = cache.readQuery({
    query: FETCH_ALL_DOMAINS_QUERY
  });

  let newDomains;
  if (domainId) {
    // increment the count of the accounts in the domain from the user
    newDomains = domains.filter(domain => domain.id !== domainId);
  }

  if (account) {
    // get the domain from the accounts email address
    const [, accountDomain] = account.email.split("@");
    // increment the count of the accounts in the domain from the user
    newDomains = domains.map(domain => {
      if (domain.domain === accountDomain) {
        if (increase) {
          domain.accounts.count++;
        } else {
          domain.accounts.count--;
        }
      }
      return domain;
    });
  }

  // write the change back to the cache
  cache.writeQuery({
    query: FETCH_ALL_DOMAINS_QUERY,
    data: { domains: newDomains }
  });
};

const updateAccountsCacheAfterDelete = (cache, account, domainId) => {
  try {
    // get domain from cache
    const { domain } = cache.readQuery({
      query: GET_ACCOUNTS_FOR_DOMAIN_QUERY,
      variables: { id: domainId }
    });
    // remove the account from the existing accounts
    domain.accounts.nodes = domain.accounts.nodes.filter(
      a => a.id !== account.id
    );
    // write the change back to the cache
    cache.writeQuery({
      query: GET_ACCOUNTS_FOR_DOMAIN_QUERY,
      data: { domain }
    });
  } catch (error) {
    // Probably the data was not fetched before, so the cache throws an error
    // nothing to worry about :D
  }
};

export default client;
export { updateDomainsCache, updateAccountsCacheAfterDelete };
