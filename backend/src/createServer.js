import { GraphQLServer } from "graphql-yoga";
import Mutation from "./resolvers/Mutation";
import Query from "./resolvers/Query";
import Account from "./resolvers/Account";
import Domain from "./resolvers/Domain";

// Create the GraphQL Yoga Server

function createServer() {
  return new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers: {
      Mutation,
      Query,
      Account,
      Domain
    },
    resolverValidationOptions: {
      requireResolversForResolveType: false
    }
  });
}

export default createServer;
