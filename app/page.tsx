import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Departments from '@/components/Departments';
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
    'Value World is a discount shop on Church Street, Ballymena. Big brands at small prices: household, cleaning, toys, health and beauty, sweets, drinks and fresh coffee.',
});

export default function Home() {
  return (
    <>
      <Hero />
      <Ticker />

      {/* Offers */}
      <section className="wrap pt-20 sm:pt-28">
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

      {/* Departments */}
      <section className="wrap pt-24 sm:pt-32">
        <div className="mb-10 grid gap-4 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p data-reveal className="eyebrow">In store</p>
            <h2 data-reveal style={{ ['--d' as string]: '60ms' }} className="h-section mt-2">
              Everything you need, under one roof
            </h2>
          </div>
          <p data-reveal style={{ ['--d' as string]: '120ms' }} className="text-lg text-ink-soft lg:pb-2">
            Eight departments laid out so you can find what you need fast, from the weekly cleaning shop to a birthday present and a coffee on the way out.
          </p>
        </div>
        <Departments />
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
