import { GET_COMBINED_DATA } from './lib/graphQL/queries/combinedQueries';
import HomePage from '@/components/layout/homePage';
import client from './lib/apolloClient';
import Head from 'next/head';
import { SiteSetting } from './lib/graphQL/types/settingsTypes';
import { GET_SETTINGS_DATA } from './lib/graphQL/queries/global/siteSettings';
export const revalidate = 10; // SSG avec revalidation toutes les 10 secondes

export default async function Page() {
  try {
    console.log('Début de la requête GET_COMBINED_DATA');
    const { data } = await client.query({
      query: GET_COMBINED_DATA,
    });
    console.log('Données combinées récupérées :', data);

    console.log('Début de la requête GET_SETTINGS_DATA');
    const settingsData = await client.query({
      query: GET_SETTINGS_DATA,
    });
    console.log('Données des paramètres récupérées :', settingsData);

    const homeData = data.home.data.attributes;
    const projectsData = data.projects.data;
    const skillsData = data.skills.data;
    const settings = settingsData.data.siteSetting.data.attributes.header;
    const logo = settings.logo.image.data.attributes.url;

    return (
      <>
        <Head>
          <title>Portfolio Développeuse web à Toulouse | Marie Mazaudier</title>
          <meta name='description' content='' />
        </Head>
        <main className='overflow-x-hidden'>
          <HomePage
            skillsData={skillsData}
            homeData={homeData}
            projectsData={projectsData}
            globalData={settings}
            logo={logo}
          />
        </main>
      </>
    );
  } catch (error) {
    console.error('Erreur lors de la récupération des données :', error);
    return (
      <div>
        <p>
          Une erreur est survenue lors du chargement de la page. Veuillez
          réessayer plus tard.
        </p>
      </div>
    );
  }
}
