import ApolloClient from "apollo-boost";
import { endpoint, prodEndpoint } from "../config";

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

export default client;
