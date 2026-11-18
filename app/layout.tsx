import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/nunito';
import '@fontsource-variable/inter';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OpeningBanner from '@/components/OpeningBanner';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Value World Ballymena | Big brands, small prices on Church Street',
    template: '%s | Value World Ballymena',
  },
  description:
    'Value World Ballymena at 155 Church Street: household, cleaning, health and beauty, toys, art and stationery, cards, sweets, drinks and hot food and coffee, all at low prices.',
  openGraph: { type: 'website', locale: 'en_GB', siteName: 'Value World Ballymena', images: ['/logo.png'] },
  icons: { icon: '/icon.png', apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = { themeColor: '#e1061b' };

const storeSchema = {
  '@context': 'https://schema.org',
  '@type': 'Store',
  name: 'Value World Ballymena',
  url: site.url,
  email: site.email,
  ...(site.phone ? { telephone: site.phone } : {}),
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: site.address.town,
    postalCode: site.address.postcode,
    addressCountry: site.address.country,
  },
  openingHoursSpecification: site.hoursSchema.map((h) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: h.days,
    opens: h.opens,
    closes: h.closes,
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <OpeningBanner />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
      </body>
    </html>
  );
}
