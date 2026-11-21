import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/bricolage-grotesque';
import '@fontsource-variable/albert-sans';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OpeningBanner from '@/components/OpeningBanner';
import MobileBar from '@/components/MobileBar';
import RevealInit from '@/components/RevealInit';
import Holding from '@/components/Holding';
import { holding, site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Value World | Big brands, small prices',
    template: '%s | Value World',
  },
  description:
    'Value World discount stores: household, cleaning, health and beauty, toys, art and stationery, cards, sweets, drinks and hot food and coffee, all at low prices.',
  openGraph: { type: 'website', locale: 'en_GB', siteName: 'Value World', images: ['/logo.png'] },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },
  // Keep search engines from indexing the holding page.
  ...(holding ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = { themeColor: '#e1061b' };

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Value World',
  legalName: site.company.name,
  identifier: { '@type': 'PropertyValue', propertyID: 'Companies House (Northern Ireland)', value: site.company.number },
  url: site.url,
  logo: `${site.url}/logo.png`,
  email: site.email,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body className={holding ? '' : 'pb-[68px] lg:pb-0'}>
        {holding ? (
          <Holding />
        ) : (
          <>
            <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
              Skip to content
            </a>
            <OpeningBanner />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <MobileBar />
            <RevealInit />
          </>
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      </body>
    </html>
  );
}
