import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Shops from '@/components/Shops';
import Offers from '@/components/Offers';
import BrandBand from '@/components/BrandBand';
import Gallery from '@/components/Gallery';
import StoreCard, { ComingSoonCard } from '@/components/StoreCard';
import { site, stores } from '@/lib/site';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  path: '/',
  title: 'Value World | Discount Shop in Ballymena',
  absoluteTitle: true,
  description:
    'Value World is a discount shop on Church Street, Ballymena. Seven shops under one roof: grocery, household, toys, a pound shop, stationery, convenience with hot food and coffee, and a card and gift shop.',
});

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />

      {/* The seven shops */}
      <section className="wrap pt-20 sm:pt-28">
        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p data-reveal className="eyebrow">7 shops. 1 store.</p>
            <h2 data-reveal style={{ ['--d' as string]: '60ms' }} className="h-section mt-2">
              Seven shops under one roof
            </h2>
          </div>
          <p data-reveal style={{ ['--d' as string]: '120ms' }} className="text-lg text-ink-soft lg:pb-2">
            Grocery, household, toys, a pound shop, stationery, convenience and a card and gift shop. Do the weekly shop, pick up a present and grab a coffee in one trip.
          </p>
        </div>
        <Shops />
      </section>

      {/* Offers */}
      <section className="wrap pt-24 sm:pt-32">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p data-reveal className="eyebrow">This week</p>
            <h2 data-reveal style={{ ['--d' as string]: '60ms' }} className="h-section mt-2">
              Deals worth the trip
            </h2>
          </div>
          <Link href="/offers/" className="inline-flex items-center gap-1.5 font-display text-lg font-extrabold text-brand hover:underline">
            All offers <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
        <div data-reveal style={{ ['--d' as string]: '120ms' }}>
          <Offers limit={6} />
        </div>
      </section>

      <BrandBand />
      <Gallery />

      {/* Stores */}
      <section className="wrap pt-24 sm:pt-32">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p data-reveal className="eyebrow">Our stores</p>
            <h2 data-reveal style={{ ['--d' as string]: '60ms' }} className="h-section mt-2">
              Find your nearest Value World
            </h2>
          </div>
          <Link href="/stores/" className="inline-flex items-center gap-1.5 font-display text-lg font-extrabold text-brand hover:underline">
            All stores <ArrowRight size={20} aria-hidden="true" />
          </Link>
        </div>
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
