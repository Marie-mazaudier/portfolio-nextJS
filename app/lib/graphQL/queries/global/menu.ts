import { gql } from '@apollo/client';

export const GET_MENU_DATA = gql`
  query menuQuery {
    menusMenus {
      data {
        attributes {
          items {
            data {
              id
              attributes {
                title
                url
                parent {
                  data {
                    attributes {
                      title
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
