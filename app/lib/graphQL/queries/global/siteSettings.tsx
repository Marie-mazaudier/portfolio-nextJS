import { gql } from '@apollo/client';

export const GET_SETTINGS_DATA = gql`
  query settingsQuery {
    siteSetting {
      data {
        attributes {
          contact_info {
            address
            email
            id
            phone
          }
          footer {
            copyright
            id
            links {
              id
              link
              text
            }
          }
          header {
            github {
              icon {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
            id
            menu {
              link
              icon {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
          site_name
        }
      }
    }
  }
`;
