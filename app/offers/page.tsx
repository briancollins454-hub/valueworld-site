import type { Metadata } from 'next';
import PageHead from '@/components/PageHead';
import Offers from '@/components/Offers';

export const metadata: Metadata = {
  title: 'Offers',
  description: "This week's deals at Value World Ballymena, 155 Church Street.",
};

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
