// app/lib/graphQL/queries/combinedQueries.ts
import { gql } from '@apollo/client';
import { HOME_FRAGMENT } from './pages/home';
import { PROJECTS_FRAGMENT } from './contentTypes/projects';
import { SKILLS_FRAGMENT } from './contentTypes/skills';

export const GET_COMBINED_DATA = gql`
  query combinedQuery {
    home {
      data {
        ...HomeData
      }
    }
    projects {
      data {
        ...ProjectsData
      }
    }
    skills {
      data {
        ...SkillsData
      }
    }
  }
  ${HOME_FRAGMENT}
  ${PROJECTS_FRAGMENT}
  ${SKILLS_FRAGMENT}
`;
