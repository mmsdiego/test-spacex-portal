'use client';

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const apolloCSR = new ApolloClient({
  ssrMode: false,
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_SPACEX_GRAPHQL,
  }),
  cache: new InMemoryCache(),
});