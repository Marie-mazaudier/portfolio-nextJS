import { GET_HOME_DATA } from './lib/graphQL/queries/pages/home';
import { GET_PROJECTS_DATA } from './lib/graphQL/queries/contentTypes/projects';
import HomePage from '@/components/layout/homePage';
import client from './lib/apolloClient';

export const revalidate = 10; // SSG avec revalidation toutes les 10 secondes

export default async function Page() {
  // Récupérer les données home
  const { data: homeResponse } = await client.query({
    query: GET_HOME_DATA,
  });
  // Récupérer les données projets
  const { data: projectsResponse } = await client.query({
    query: GET_PROJECTS_DATA,
  });

  const homeData = homeResponse.home.data.attributes;
  const projectsData = projectsResponse.projects.data;

  return (
    <div className='overflow-x-hidden'>
      <HomePage homeData={homeData} projectsData={projectsData} />
    </div>
  );
}
