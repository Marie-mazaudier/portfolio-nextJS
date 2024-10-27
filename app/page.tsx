import { GET_COMBINED_DATA } from './lib/graphQL/queries/combinedQueries';
import HomePage from '@/components/layout/homePage';
import client from './lib/apolloClient';
import Head from 'next/head';
import { GET_SETTINGS_DATA } from './lib/graphQL/queries/global/siteSettings';
export const revalidate = 10; // SSG avec revalidation toutes les 10 secondes

export default async function Page() {
  const { data } = await client.query({
    query: GET_COMBINED_DATA,
  });
  const settingsData = await client.query({
    query: GET_SETTINGS_DATA,
  });

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
}
