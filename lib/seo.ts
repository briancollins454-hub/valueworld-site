import type { Metadata } from 'next';
import { site } from './site';

// Builds a page's title, description, main address (canonical) and share preview in one go.
export function pageMeta({ path, title, description, absoluteTitle }: { path: string; title: string; description: string; absoluteTitle?: boolean }): Metadata {
  const shareTitle = absoluteTitle ? title : `${title} | ${site.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      siteName: site.name,
      url: path,
      title: shareTitle,
      description,
      images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Value World: Big brands. Small prices.' }],
    },
    twitter: { card: 'summary_large_image', title: shareTitle, description, images: ['/og.png'] },
  };
}
