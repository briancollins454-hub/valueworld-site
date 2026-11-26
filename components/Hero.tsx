import Link from 'next/link';
import { MapPin, Tag } from 'lucide-react';
import Countdown from './Countdown';
import { nextOpening, shortDate, site } from '@/lib/site';
import OpenSwitch from '@/components/OpenSwitch';
import ShopRing from '@/components/ShopRing';


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

      <div className="wrap grid items-center gap-10 pb-8 pt-6 sm:pb-12 sm:pt-10 lg:grid-cols-[1.15fr_1fr] lg:pb-14">
        <div className="relative">
          {/* Phones: badge in its own row with the opening label beside it */}
          <div className="relative z-10 flex items-center gap-3.5 sm:block">
            <div className="relative h-[76px] w-[76px] shrink-0 sm:hidden" aria-hidden="true">
              <div className="absolute -inset-1.5 animate-spinslow rounded-full border-2 border-dashed border-white/35" />
              <div className="h-full w-full animate-pop rounded-full bg-white/10 p-1 shadow-[0_14px_30px_-14px_rgba(0,0,0,.6)] ring-1 ring-white/25">
                <img src="/logo.png" alt="" className="h-full w-full rounded-full" />
              </div>
            </div>
            <p className="inline-flex animate-rise flex-wrap items-center gap-x-2 gap-y-0.5 rounded-2xl bg-white/10 px-3.5 py-1.5 font-display text-[12px] font-extrabold uppercase tracking-[0.14em] ring-1 ring-white/25 sm:rounded-full sm:text-[13px]">
              <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />
              {nextOpening && nextOpening.openingDate ? (
                <OpenSwitch
                  at={nextOpening.openingAt}
                  before={
                    <>
                      <span className="sm:hidden">New store · {nextOpening.town}</span>
                      <span className="basis-full pl-4 text-sun sm:hidden">Opens {shortDate(nextOpening.openingDate)}</span>
                      <span className="hidden sm:inline">
                        New store · {nextOpening.town} · {nextOpening.openingDate}
                      </span>
                    </>
                  }
                  after={
                    <>
                      <span className="sm:hidden">New store · {nextOpening.town}</span>
                      <span className="basis-full pl-4 text-sun sm:hidden">Now open</span>
                      <span className="hidden sm:inline">Now open · Value World {nextOpening.town}</span>
                    </>
                  }
                />
              ) : (
                'Value World · Big brands, small prices'
              )}
            </p>
          </div>

          <h1 className="relative z-10 mt-4 animate-rise text-[44px] font-black leading-[0.92] tracking-[-0.03em] text-white [animation-delay:.08s] sm:text-[64px] lg:text-[76px]">
            Big brands.
            <br />
            <span className="relative inline-block pb-[0.32em]">
              <span className="relative z-10">Small prices.</span>
              {/* Underline sits below the letters' descenders so it never crosses the "p" */}
              <svg className="absolute bottom-0 left-0 z-0 h-[0.16em] w-full text-sun" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true">
                <path d="M4 9 C 80 3, 200 3, 296 7" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="mt-5 max-w-xl animate-rise text-[16px] leading-snug text-white/90 [animation-delay:.16s] sm:text-lg">
            Seven shops under one roof: grocery, household, toys, a pound shop, stationery, convenience and a card and gift shop.
            {nextOpening && (
              <OpenSwitch
                at={nextOpening.openingAt}
                before={` Our new ${nextOpening.town} store opens on ${nextOpening.address.line1}.`}
                after={` Our new ${nextOpening.town} store is now open on ${nextOpening.address.line1}.`}
              />
            )}
          </p>

          <ShopRing className="-mx-5 mt-3 h-[360px] animate-rise [animation-delay:.2s] sm:mx-0 sm:h-[440px] lg:hidden" />

          <div className="mt-5 animate-rise [animation-delay:.24s]">
            <Countdown />
          </div>

          <div className="mt-5 flex animate-rise gap-2.5 [animation-delay:.32s] sm:gap-3 [&>a]:min-h-[48px] [&>a]:flex-1 [&>a]:whitespace-nowrap [&>a]:px-3 [&>a]:text-[15px] sm:[&>a]:flex-none sm:[&>a]:px-7 sm:[&>a]:text-[17px]">
            <Link href="/offers/" className="btn-sun">
              <Tag size={18} aria-hidden="true" className="shrink-0" /> See offers
            </Link>
            <Link href="/stores/" className="btn-ghost">
              <MapPin size={18} aria-hidden="true" className="shrink-0" /> Find a store
            </Link>
          </div>
        </div>

        {/* The seven shops in 3D */}
        <ShopRing className="hidden aspect-[5/4] w-full max-w-[680px] justify-self-center lg:block" />
      </div>
    </section>
  );
}
