import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: `${process.env.WORDPRESS_SITE_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default client;