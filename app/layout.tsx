import { ReactNode } from 'react';
import './globals.css';
import Footer from '@/components/organisms/Footer/Footer';
import Header from '@/components/organisms/header/header';
import { CsrfProvider } from '@/app/lib/utils/CsrfContext'; // Import du CsrfProvider
import { GET_SETTINGS_DATA } from './lib/graphQL/queries/global/siteSettings';
import ApolloClientWrapper from '@/components/ClientWrapper';
import client from './lib/apolloClient';
interface RootLayoutProps {
  children: ReactNode;
}
export const revalidate = 10; // SSG avec revalidation toutes les 10 secondes

export default async function RootLayout({ children }: RootLayoutProps) {
  // Récupérer les données projets
  const { data: settingsResponse } = await client.query({
    query: GET_SETTINGS_DATA,
  });

  const globalData = settingsResponse.siteSetting.data.attributes;
  return (
    <html lang='fr'>
      <body className='overflow-x-hidden relative'>
        <ApolloClientWrapper>
          <CsrfProvider>
            <Header globalData={globalData} />
            {children}
            <Footer globalData={globalData} />
          </CsrfProvider>
        </ApolloClientWrapper>
      </body>
    </html>
  );
}
