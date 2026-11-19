import Link from 'next/link';
import { Navigation, Tag } from 'lucide-react';
import Countdown from './Countdown';
import { site } from '@/lib/site';

const tags = [
  { label: 'Toys', cls: 'left-[2%] top-[14%] bg-sun text-ink', r: '-10deg', d: '0s' },
  { label: 'Household', cls: 'right-[0%] top-[8%] bg-white text-brand', r: '8deg', d: '1.2s' },
  { label: 'Coffee to go', cls: 'left-[-2%] bottom-[16%] bg-leaf text-white', r: '6deg', d: '0.6s' },
  { label: 'Big brands', cls: 'right-[2%] bottom-[8%] bg-sun text-ink', r: '-7deg', d: '1.8s' },
];

export default function Hero() {
  const photo = site.photos.hero;
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      {/* Background: the shop-front photo once supplied, otherwise a branded pattern */}
      {photo ? (
        <>
          <img src={photo} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep/95 via-brand/85 to-brand/40" />
        </>
      ) : (
        <>
          <div className="dots absolute inset-0 -z-10 opacity-60" />
          <div className="absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full bg-brand-logo" />
          <div className="absolute -bottom-56 -left-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand-deep/60" />
        </>
      )}

      <div className="wrap grid items-center gap-12 pb-16 pt-12 sm:pb-24 sm:pt-16 lg:grid-cols-[1.1fr_1fr] lg:pb-28">
        <div>
          <p className="inline-flex animate-rise items-center gap-2 rounded-full bg-white/10 px-4 py-2 font-display text-[13px] font-extrabold uppercase tracking-[0.14em] ring-1 ring-white/25">
            <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />
            {site.openingSoon ? `Grand opening · ${site.openingDate}` : 'Now open · Church Street, Ballymena'}
          </p>

          <h1 className="mt-6 animate-rise text-[56px] font-black leading-[0.92] tracking-[-0.03em] text-white [animation-delay:.08s] sm:text-[84px] lg:text-[96px]">
            Big brands.
            <br />
            <span className="relative inline-block">
              <span className="relative z-10">Small prices.</span>
              <svg className="absolute -bottom-3 left-0 z-0 w-full text-sun" height="18" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
                <path d="M3 12 C 80 2, 200 2, 297 10" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-8 max-w-xl animate-rise text-lg leading-relaxed text-white/90 [animation-delay:.16s] sm:text-xl">
            Household, toys, stationery, health and beauty, sweets and fresh coffee, all under one roof at 155 Church Street, Ballymena.
          </p>

          <div className="mt-8 animate-rise [animation-delay:.24s]">
            <Countdown />
          </div>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:.32s] sm:flex-row">
            <Link href="/offers/" className="btn-sun">
              <Tag size={18} aria-hidden="true" /> See the offers
            </Link>
            <a href={site.directions} target="_blank" rel="noopener" className="btn-ghost">
              <Navigation size={18} aria-hidden="true" /> Get directions
            </a>
          </div>
        </div>

        {/* Logo badge with floating tags */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[500px] lg:block" aria-hidden="true">
          <div className="absolute inset-[6%] animate-spinslow rounded-full border-[3px] border-dashed border-white/30" />
          <div className="absolute inset-[14%] animate-pop rounded-full bg-white/10 p-5 shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] ring-1 ring-white/25 [animation-delay:.2s]">
            <img src="/logo.png" alt="" className="h-full w-full animate-float rounded-full" />
          </div>
          {tags.map((t) => (
            <span
              key={t.label}
              style={{ ['--r' as string]: t.r, animationDelay: t.d }}
              className={`tag absolute animate-float py-3 pl-9 pr-5 font-display text-lg font-black shadow-[0_18px_30px_-14px_rgba(0,0,0,.5)] ${t.cls}`}
            >
              {t.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
