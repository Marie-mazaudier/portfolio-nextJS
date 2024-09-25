import { gql } from '@apollo/client';

export const GET_PROJECTS_DATA = gql`
  query projectsQuery {
    projects {
      data {
        attributes {
          title
          description
          stacks {
            id
            text
          }
          button {
            id
            text
            link
          }
          featured_image {
            data {
              id
              attributes {
                url
                width
                height
                alternativeText
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;
