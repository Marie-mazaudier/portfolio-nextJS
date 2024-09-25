// components/ApolloClientWrapper.tsx
"use client"; // Ce fichier est un Client Component

import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import client from "@/app/lib/apolloClient";

interface ApolloClientWrapperProps {
  children: ReactNode;
}

const ApolloClientWrapper = ({ children }: ApolloClientWrapperProps) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientWrapper;
