import { GraphQLServer } from "graphql-yoga";

import Mutation from "resolvers/Mutation";
import Query from "resolvers/Query";
import Account from "resolvers/Account";
import AccountList from "resolvers/AccountList";
import Domain from "resolvers/Domain";
import DomainList from "resolvers/DomainList";
import Alias from "resolvers/Alias";
import AliasList from "resolvers/AliasList";
import TlsPolicyList from "resolvers/TlsPolicyList";

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query,
      Account,
      AccountList,
      Domain,
      DomainList,
      Alias,
      AliasList,
      TlsPolicyList
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });
}

export default createServer;
