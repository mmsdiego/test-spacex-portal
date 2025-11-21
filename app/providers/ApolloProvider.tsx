'use client';

import { ApolloProvider } from '@apollo/client/react';
import { createApolloClient } from '@/lib/apollo-client';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  const client = createApolloClient();
  
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}