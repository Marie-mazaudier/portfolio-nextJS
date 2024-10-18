import { gql } from '@apollo/client';

export const GET_TERMS_DATA = gql`
  query termsQuery {
    mentionsLegale {
      data {
        attributes {
          title
          text
        }
      }
    }
  }
`;
