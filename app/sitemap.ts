import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', 'offers/', 'opening-hours/', 'about/', 'contact/'].map((p) => ({
    url: `${site.url}/${p}`,
    changeFrequency: p === 'offers/' ? 'weekly' : 'monthly',
  }));
}
