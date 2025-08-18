import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Automatiza tu negocio con IA | Checklist gratis',
    template: '%s | Automatiza tu negocio con IA',
  },
  description:
    'Descarga una checklist gratuita con 3 automatizaciones de IA listas para implementar hoy y recupera 5+ horas a la semana.',
  openGraph: {
    title: 'Automatiza tu negocio con IA | Checklist gratis',
    description:
      'Descarga una checklist gratuita con 3 automatizaciones de IA listas para implementar hoy y recupera 5+ horas a la semana.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const gaId = process.env.GA_MEASUREMENT_ID;
  const pixelId = process.env.META_PIXEL_ID;

  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {gaId ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);} 
                  gtag('js', new Date());
                  gtag('config', '${gaId}');
                `,
              }}
            />
          </>
        ) : null}
        {pixelId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${pixelId}');
              `,
            }}
          />
        ) : null}
        {/* JSON-LD Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              name: 'Automatiza tu negocio con IA',
              potentialAction: {
                '@type': 'SearchAction',
                target: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
        {/* WhatsApp floating button */}
        <a
          href={process.env.NEXT_PUBLIC_WHATSAPP_LINK || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-5 right-5 inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-soft focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
          aria-label="Abrir WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0012.02 0C5.4 0 .05 5.35.05 11.97c0 2.11.55 4.17 1.6 5.99L0 24l6.2-1.62a12 12 0 005.82 1.49h.01c6.62 0 12.02-5.35 12.02-11.97a11.86 11.86 0 00-3.53-8.42zM12.03 21.4a9.45 9.45 0 01-4.82-1.32l-.35-.2-3.68.96.98-3.58-.23-.37a9.43 9.43 0 01-1.44-4.96c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.93.99 6.72 2.79a9.41 9.41 0 012.78 6.7c0 5.23-4.26 9.49-9.48 9.49zm5.4-7.09c-.29-.15-1.71-.84-1.98-.94-.27-.1-.46-.15-.66.15-.2.29-.76.94-.93 1.13-.17.2-.34.22-.63.07-.29-.15-1.23-.45-2.34-1.45-.86-.76-1.44-1.7-1.61-1.98-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.2.05-.36-.02-.51-.07-.15-.66-1.58-.91-2.17-.24-.58-.49-.5-.66-.51h-.56c-.2 0-.51.07-.78.36-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.09 4.49.71.31 1.27.49 1.7.62.71.23 1.35.2 1.86.12.57-.08 1.71-.7 1.95-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34z"/></svg>
        </a>
        {/* Meta Pixel noscript image for fallback */}
        {pixelId ? (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img height="1" width="1" style={{ display: 'none' }} alt="" src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`} />
          </noscript>
        ) : null}
      </body>
    </html>
  );
}

