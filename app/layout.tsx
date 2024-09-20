'use client';
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './lib/apolloClient';
import './globals.css';
import Footer from '@/components/organisms/Footer/Footer';
import Header from '@/components/organisms/header/header';
import { CsrfProvider } from '@/app/lib/utils/CsrfContext'; // Import du CsrfProvider

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='fr'>
      <body className='overflow-x-hidden relative'>
        <ApolloProvider client={client}>
          <CsrfProvider>
            <Header />
            {children}
            <Footer />
          </CsrfProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
