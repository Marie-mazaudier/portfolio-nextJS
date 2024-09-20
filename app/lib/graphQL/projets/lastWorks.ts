import { gql } from '@apollo/client';

export const LAST_WORKS_QUERY = gql`
  query GetLastWorks {
    projets(where: {status: PUBLISH}, first: 8) {
      nodes {
        id
        featuredImage {
          node {
            mediaItemUrl
            altText
          }
        }
        excerpt
        date
        typeDeProjets {
          nodes {
            name
            slug
          }
        }
        title
        slug
      }
    }
  }
`;
