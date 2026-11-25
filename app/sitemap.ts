import type { MetadataRoute } from 'next';
import { shops, site, stores } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', 'shops/', ...shops.map((s) => `shops/${s.slug}/`), 'offers/', 'stores/', ...stores.map((s) => `stores/${s.slug}/`), 'about/', 'contact/'].map((p) => ({
    url: `${site.url}/${p}`,
    changeFrequency: p === 'offers/' ? 'weekly' : 'monthly',
  }));
}
