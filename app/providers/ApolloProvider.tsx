'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloCSR } from '@/lib/apollo-client';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={apolloCSR}>{children}</ApolloProvider>;
}