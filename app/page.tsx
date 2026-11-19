import Link from 'next/link';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import Hero from '@/components/Hero';
import Ticker from '@/components/Ticker';
import Departments from '@/components/Departments';
import Offers from '@/components/Offers';
import BrandBand from '@/components/BrandBand';
import Gallery from '@/components/Gallery';
import HoursTable from '@/components/HoursTable';
import MapCard from '@/components/MapCard';
import { site } from '@/lib/site';

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

      {/* Visit */}
      <section className="wrap pt-24 sm:pt-32">
        <p data-reveal className="eyebrow">Visit us</p>
        <h2 data-reveal style={{ ['--d' as string]: '60ms' }} className="h-section mt-2">
          Right on Church Street
        </h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <div data-reveal className="flex flex-col rounded-[28px] border border-ink/10 bg-white p-4 sm:p-6">
            <h3 className="flex items-center gap-2 px-4 pt-2 text-2xl font-black">
              <Clock size={22} className="text-brand" aria-hidden="true" /> Opening hours
            </h3>
            <div className="mt-3">
              <HoursTable />
            </div>
            <p className="mt-auto flex items-start gap-2 px-4 pb-2 pt-4 text-[15px] text-ink-soft">
              <MapPin size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
              In the old Bank of Ireland building, beside the bandstand on {site.address.line1.replace('155 ', '')}.
            </p>
          </div>
          <div data-reveal style={{ ['--d' as string]: '100ms' }}>
            <MapCard />
          </div>
        </div>
      </section>
    </>
  );
}
