import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import StoreCard, { ComingSoonCard } from '@/components/StoreCard';
import { site, stores } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Our stores',
  description: `Find your nearest Value World store: ${stores.map((s) => s.town).join(', ')}. Opening hours, addresses and directions.`,
};

export default function StoresPage() {
  return (
    <>
      <PageHead eyebrow="Our stores" title="Find your nearest Value World" intro="Opening hours, directions and details for every store." />
      <section className="wrap pt-12">
        <ul className="grid gap-4 md:grid-cols-2">
          {stores.map((s, i) => (
            <StoreCard key={s.slug} store={s} i={i} />
          ))}
          <ComingSoonCard note={site.comingSoonNote} />
        </ul>
      </section>
    </>
  );
}
