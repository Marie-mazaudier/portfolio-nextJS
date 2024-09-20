import client from './lib/apolloClient';
import { LAST_WORKS_QUERY } from './lib/graphQL/projets/lastWorks';
import { work } from './lib/graphQL/types/lastWorks';
import Portfolio from '@/components/organisms/Portfolio/Portfolio';
import BioSection from '@/components/organisms/Bio/BioSection';
import Contact from '@/components/organisms/Contact/Contact';
export const revalidate = 10; // Régénérer toutes les 10 secondes

export default async function Page() {
  const { data } = await client.query({
    query: LAST_WORKS_QUERY,
  });

  if (!data) {
    return <div>No project available</div>;
  }

  const recentWorks: work[] = data.projets.nodes;

  return (
    <div className='overflow-x-hidden'>
      <BioSection />
      <Portfolio />
      <Contact />
    </div>
  );
}
