"use client";

import { HttpLink, NormalizedCacheObject } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";
import { PropsWithChildren } from "react";

function makeClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });
}

export default function ApolloProvider({ children }: PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
