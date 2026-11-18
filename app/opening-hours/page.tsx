import type { Metadata } from 'next';
import { Landmark } from 'lucide-react';
import PageHead from '@/components/PageHead';
import HoursTable from '@/components/HoursTable';
import MapCard from '@/components/MapCard';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Opening hours and location',
  description: 'Value World Ballymena opening hours and directions to 155 Church Street, Ballymena BT43 6DG.',
};

export default function HoursPage() {
  return (
    <>
      <PageHead
        eyebrow="Hours & location"
        title="When we're open and where to find us"
        intro={`155 Church Street, Ballymena ${site.address.postcode}.`}
      />
      <section className="wrap grid gap-8 pt-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <div className="rounded-3xl border border-ink/10 bg-white p-4 sm:p-6">
            <h2 className="mb-3 px-4 text-2xl font-black">Opening hours</h2>
            <HoursTable />
          </div>
          {site.openingSoon && (
            <p className="mt-4 rounded-2xl bg-sun/30 px-5 py-4 text-[15px]">
              We open on <strong>{site.openingDate}</strong>. These are our regular hours from then on.
            </p>
          )}
          <p className="mt-4 px-1 text-[15px] text-ink-soft">Bank holiday and Christmas hours will be posted here and on our social pages.</p>
        </div>

        <div>
          <MapCard />
          <div className="mt-4 flex items-start gap-3 rounded-3xl bg-paper-warm p-5 sm:p-6">
            <Landmark size={22} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
            <p className="text-[15px] leading-relaxed">
              <strong className="font-display text-base font-extrabold">Finding us:</strong> we&apos;re in the old Bank of Ireland building on Church Street, beside the bandstand.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
