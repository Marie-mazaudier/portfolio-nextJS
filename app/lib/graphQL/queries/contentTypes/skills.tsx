// app/lib/graphQL/queries/contentTypes/skills.ts
import { gql } from '@apollo/client';

export const SKILLS_FRAGMENT = gql`
  fragment SkillsData on SkillEntity {
    attributes {
      title
      subtitle
      techno {
        data {
          id
          attributes {
            techno {
              name
              percent
            }
          }
        }
      }
    }
  }
`;

export const GET_SKILLS_DATA = gql`
  query skillsQuery {
    skills {
      data {
        ...SkillsData
      }
    }
  }
  ${SKILLS_FRAGMENT}
`;
