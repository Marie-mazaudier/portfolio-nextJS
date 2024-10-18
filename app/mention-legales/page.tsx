import client from '../lib/apolloClient';
import { GET_TERMS_DATA } from '../lib/graphQL/queries/pages/terms';
import TermsPage from '@/components/layout/termsPage';
import Head from 'next/head';
export async function generateMetadata() {
  return {
    title: 'Mentions légales | Marie Mazaudier Portfolio',
    description: 'Page des mentions légales.',
    robots: 'noindex, nofollow', // Ajouter noindex et nofollow pour les moteurs de recherche
  };
}
export default async function Page() {
  const termsData = await client.query({
    query: GET_TERMS_DATA,
  });
  const termsTitle = termsData.data.mentionsLegale.data.attributes.title;
  const termsText = termsData.data.mentionsLegale.data.attributes.text;

  //console.log('termsData', terms);
  return (
    <div>
      <TermsPage title={termsTitle} text={termsText} />
    </div>
  );
}
