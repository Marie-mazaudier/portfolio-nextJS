"use client"; // Ce fichier est un Client Component

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import Script from "next/script";
import client from "@/app/lib/apolloClient";

// Extend the Window interface to include gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface ApolloClientWrapperProps {
  children: ReactNode;
}

// Ajoute ton ID de tracking GA4 ici
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID;

const ClientWrapper = ({ children }: ApolloClientWrapperProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}${
      searchParams?.toString() ? `?${searchParams.toString()}` : ""
    }`;

    if (window.gtag) {
      window.gtag("config", GA_TRACKING_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* Scripts Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* ApolloProvider pour ton client Apollo */}
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </>
  );
};

export default ClientWrapper;
