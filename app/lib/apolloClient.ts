// lib/apollo.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch'; // Utilisation de fetch pour les environnements serveur et client

const client = new ApolloClient({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // GraphQL endpoint
    fetch,
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Utilisation du token
    },
  }),
});

export default client;
