import Link from 'next/link';
import { ArrowRight, Clock, MapPin, Navigation, Tag } from 'lucide-react';
import Departments from '@/components/Departments';
import Offers from '@/components/Offers';
import MapCard from '@/components/MapCard';
import { site } from '@/lib/site';

export default function Home() {
  return (
    <>
      {/* Hero. Swap the right-hand panel for a photo of the shop front once Pat sends one. */}
      <section className="relative overflow-hidden bg-brand text-white">
        <div aria-hidden="true" className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-white/10" />
        <div aria-hidden="true" className="absolute -bottom-32 right-40 hidden h-[260px] w-[260px] rounded-full bg-sun/90 lg:block" />
        <div className="wrap relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          <div>
            <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-sun">
              {site.openingSoon ? `Opening ${site.openingDate}` : 'Now open on Church Street'}
            </p>
            <h1 className="mt-4 text-[46px] font-black leading-[0.98] tracking-tight text-white sm:text-[68px]">
              Big brands.
              <br />
              Small prices.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/90 sm:text-xl">
              Household, toys, stationery, health and beauty, sweets and fresh coffee, all under one roof at 155 Church Street, Ballymena.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/offers/" className="btn-sun">
                <Tag size={18} aria-hidden="true" /> See the offers
              </Link>
              <a href={site.directions} target="_blank" rel="noopener" className="btn border-2 border-white/40 text-white hover:bg-white/10">
                <Navigation size={18} aria-hidden="true" /> Get directions
              </a>
            </div>
          </div>

          <div className="relative hidden pb-10 lg:block">
            <div className="rotate-[-4deg] rounded-[28px] bg-white p-8 text-ink shadow-[0_24px_60px_-20px_rgba(0,0,0,0.45)]">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-brand">Find us</p>
              <p className="mt-3 font-display text-[34px] font-black leading-tight">155 Church Street</p>
              <p className="text-lg text-ink-soft">Ballymena {site.address.postcode}</p>
              <p className="mt-5 border-t border-ink/10 pt-5 text-[15px] text-ink-soft">
                In the old Bank of Ireland building, beside the bandstand.
              </p>
            </div>
            <div className="absolute -bottom-16 left-10 rotate-[4deg] rounded-2xl bg-sun px-6 py-4 font-display text-xl font-black text-ink shadow-lg">
              Mon to Sat {site.hours[0].open} to {site.hours[0].close}
            </div>
          </div>
        </div>
      </section>

      {/* Quick facts strip */}
      <section className="border-b border-ink/10 bg-white">
        <ul className="wrap grid gap-px py-2 sm:grid-cols-2">
          <li className="flex items-center gap-3 py-4">
            <Clock size={22} className="shrink-0 text-brand" aria-hidden="true" />
            <span>
              <span className="font-display font-extrabold">Mon to Sat</span> {site.hours[0].open} to {site.hours[0].close}
              <span className="mx-2 text-ink-faint">·</span>
              <span className="font-display font-extrabold">Sun</span> {site.hours[6].open} to {site.hours[6].close}
            </span>
          </li>
          <li className="flex items-center gap-3 py-4 sm:justify-end">
            <MapPin size={22} className="shrink-0 text-brand" aria-hidden="true" />
            <span>
              <span className="font-display font-extrabold">{site.address.line1}</span>, {site.address.town}
            </span>
          </li>
        </ul>
      </section>

      {/* Offers */}
      <section className="wrap pt-16 sm:pt-20">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">This week</p>
            <h2 className="mt-2 text-[34px] font-black leading-tight sm:text-[44px]">Offers</h2>
          </div>
          <Link href="/offers/" className="hidden items-center gap-1.5 font-display font-extrabold text-brand hover:underline sm:inline-flex">
            All offers <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <Offers limit={6} />
      </section>

      {/* Departments */}
      <section className="wrap pt-16 sm:pt-20">
        <p className="eyebrow">In store</p>
        <h2 className="mt-2 max-w-2xl text-[34px] font-black leading-tight sm:text-[44px]">What you&apos;ll find</h2>
        <p className="mb-8 mt-3 max-w-2xl text-lg text-ink-soft">Everyday essentials and treats, laid out so you can find what you need fast.</p>
        <Departments />
      </section>

      {/* Visit */}
      <section className="wrap pt-16 sm:pt-20">
        <p className="eyebrow">Visit us</p>
        <h2 className="mb-8 mt-2 text-[34px] font-black leading-tight sm:text-[44px]">Right on Church Street</h2>
        <MapCard />
      </section>
    </>
  );
}
