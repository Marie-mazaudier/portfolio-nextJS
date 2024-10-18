import { gql } from '@apollo/client';

export const GET_SETTINGS_DATA = gql`
  query settingsQuery {
    siteSetting {
      data {
        attributes {
          seo {
            favicon {
              data {
                attributes {
                  url
                }
              }
            }
            img_OG {
              data {
                attributes {
                  url
                }
              }
            }
            meta_description
            website_url
            meta_title
            site_name
          }
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
            logo {
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              link
            }
            github {
              icon {
                data {
                  attributes {
                    url
                  }
                }
              }
              link
            }
            linkedin {
              icon {
                data {
                  attributes {
                    url
                  }
                }
              }
              link
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
