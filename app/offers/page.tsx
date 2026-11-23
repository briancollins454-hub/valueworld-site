import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import PageHead from '@/components/PageHead';
import Offers from '@/components/Offers';

export const metadata: Metadata = pageMeta({
  path: '/offers/',
  title: 'Offers and Deals',
  description:
    "This week's deals at Value World: big brand household, cleaning, toys, health and beauty, sweets and drinks at small prices, in store in Ballymena.",
});

export default function OffersPage() {
  return (
    <>
      <PageHead eyebrow="Offers" title="This week's deals" intro="Big brands at small prices. Offers change regularly, so check back or pop in to see what's new." />
      <section className="wrap pt-12">
        <Offers />
      </section>
    </>
  );
}
