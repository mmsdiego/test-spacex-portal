import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const apolloSSR = new ApolloClient({
  link: new HttpLink({
    uri: process.env.SPACEX_GRAPHQL,
    fetch,
  }),
  cache: new InMemoryCache(),
});