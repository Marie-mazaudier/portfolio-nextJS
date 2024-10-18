// app/lib/graphQL/queries/contentTypes/projects.ts
import { gql } from '@apollo/client';

export const PROJECTS_FRAGMENT = gql`
  fragment ProjectsData on ProjectEntity {
    attributes {
      title
      description_project
      stacks {
        id
        text
      }
      Client
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
`;

export const GET_PROJECTS_DATA = gql`
  query projectsQuery {
    projects {
      data {
        ...ProjectsData
      }
    }
  }
  ${PROJECTS_FRAGMENT}
`;
