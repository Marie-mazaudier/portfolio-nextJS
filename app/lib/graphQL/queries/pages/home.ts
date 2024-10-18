// app/lib/graphQL/queries/pages/home.ts
import { gql } from '@apollo/client';

export const HOME_FRAGMENT = gql`
  fragment HomeData on HomeEntity {
    attributes {
      main_title
      bio
      button {
        id
        text
        link
      }
      logo {
        data {
          id
          attributes {
            alternativeText
            width
            height
            size
            url
          }
        }
      }
      tags {
        id
        text
      }
      projects_title
      contact_title
      text_contact
      logo_contact {
        data {
          id
          attributes {
            alternativeText
            width
            height
            size
            url
          }
        }
      }
      contact_photo {
        data {
          id
          attributes {
            name
            alternativeText
            caption
            width
            height
            size
            url
          }
        }
      }
      list_icon {
        id
        text
        link_text
        icon {
          data {
            id
            attributes {
              url
            }
          }
        }
      }
      createdAt
      updatedAt
      publishedAt
    }
  }
`;

export const GET_HOME_DATA = gql`
  query homeQuery {
    home {
      data {
        ...HomeData
      }
    }
  }
  ${HOME_FRAGMENT}
`;
