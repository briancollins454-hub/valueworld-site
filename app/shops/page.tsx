import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import Shops from '@/components/Shops';
import { pageMeta } from '@/lib/seo';
import { shops, stores } from '@/lib/site';

const town = stores[0].town;

export const metadata: Metadata = pageMeta({
  path: '/shops/',
  title: '7 Shops Under One Roof',
  description: `Value World ${town} is seven shops in one: ${shops.map((s) => s.name).join(', ')}. Big brands at small prices.`,
});

export default function ShopsPage() {
  return (
    <>
      <PageHead
        eyebrow="Our shops"
        title="7 shops. 1 store."
        intro="Every Value World is seven shops under one roof, so you can do the weekly shop, pick up a present and grab a coffee in one trip."
      />
      <section className="wrap pt-12">
        <Shops />
      </section>
    </>
  );
}
