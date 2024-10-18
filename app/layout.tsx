import React, { Suspense, ReactElement } from 'react';
import './globals.css';
import Footer from '@/components/organisms/Footer/Footer';
import Header from '@/components/organisms/header/header';
import { CsrfProvider } from '@/app/lib/utils/CsrfContext';
import { GET_SETTINGS_DATA } from './lib/graphQL/queries/global/siteSettings';
import { GET_MENU_DATA } from './lib/graphQL/queries/global/menu';
import ClientWrapper from '@/components/ClientWrapper'; // Apollo et GA4
import client from './lib/apolloClient';

interface ChildComponentProps {
  globalData?: any;
  menu?: any;
}

interface RootLayoutProps {
  children: ReactElement<ChildComponentProps>;
}

export const revalidate = 10; // SSG avec revalidation toutes les 10 secondes

export async function generateMetadata() {
  // Récupérer les données des paramètres globaux
  const { data: settingsResponse } = await client.query({
    query: GET_SETTINGS_DATA,
  });

  // Extraire les données SEO du site
  const globalData = settingsResponse?.siteSetting?.data?.attributes || {};
  const seo = globalData.seo;

  return {
    title: seo.meta_title || 'Titre par défaut',
    description: seo.meta_description || 'Description par défaut',
    icons: {
      icon: '/favicon-red.png',
    },
    openGraph: {
      title: seo.og_title || 'Titre OpenGraph par défaut',
      description: seo.og_description || 'Description OpenGraph par défaut',
      url: 'https://www.votresite.com',
      type: 'website',
      images: [
        {
          url:
            seo.og_image?.url ||
            'https://www.votresite.com/images/default-og-image.jpg',
          width: 800,
          height: 600,
          alt: seo.og_image?.alt || 'Image OpenGraph par défaut',
        },
      ],
      // Ajouter ici la balise de vérification Google
      meta: [
        {
          name: 'google-site-verification',
          content: 'votre-code-de-vérification', // Remplacer par le code fourni par Google
        },
      ],
      locale: 'fr_FR',
      site_name: 'Marie Mazaudier Portfolio',
    },
  };
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Récupérer les données des paramètres globaux
  const { data: settingsResponse } = await client.query({
    query: GET_SETTINGS_DATA,
  });

  // Récupérer les données du menu
  const { data: menuResponse } = await client.query({
    query: GET_MENU_DATA,
  });

  const globalData = settingsResponse?.siteSetting?.data?.attributes || {};
  const menu = menuResponse?.menusMenus?.data || [];
  const logo = globalData.header.logo.image.data.attributes.url;
  return (
    <html lang='fr'>
      <body className='overflow-x-hidden relative'>
        <Suspense fallback={<div>Loading...</div>}>
          <ClientWrapper>
            <CsrfProvider>
              <Header logo={logo} globalData={globalData} menu={menu} />
              {React.isValidElement(children)
                ? React.cloneElement(children, { globalData })
                : children}
              <Footer globalData={globalData} />
            </CsrfProvider>
          </ClientWrapper>
        </Suspense>
      </body>
    </html>
  );
}
