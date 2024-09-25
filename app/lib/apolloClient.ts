// lib/apollo.ts
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import fetch from 'cross-fetch'; // Utilisation de fetch pour les environnements serveur et client

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}/graphql`, // GraphQL endpoint
    fetch, // Utilisation de cross-fetch pour les requêtes HTTP
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`, // Utilisation du token API
    },
  }),
});

export default client;
