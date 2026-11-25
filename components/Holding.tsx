import { Mail, MapPin, Navigation } from 'lucide-react';
import Countdown from '@/components/Countdown';
import OpenSwitch from '@/components/OpenSwitch';
import { site, stores } from '@/lib/site';

// The single page shown while the full site is held back.
export default function Holding() {
  const s = stores[0];
  return (
    <div className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-brand text-white">
      <div className="dots absolute inset-0 -z-10 opacity-50" />
      <div className="absolute -bottom-40 -right-40 -z-10 h-[520px] w-[520px] rounded-full bg-brand-dark/70" />
      <div className="absolute -left-32 -top-32 -z-10 h-80 w-80 rounded-full bg-brand-logo" />

      <main id="main" className="wrap flex flex-1 flex-col items-center justify-center py-12 text-center">
        <div className="relative h-36 w-36 sm:h-44 sm:w-44">
          <div className="absolute -inset-2.5 animate-spinslow rounded-full border-2 border-dashed border-white/35" aria-hidden="true" />
          <img src="/logo.png" alt="Value World" className="h-full w-full animate-pop rounded-full shadow-[0_24px_50px_-20px_rgba(0,0,0,.6)]" />
        </div>

        <p className="mt-8 inline-flex animate-rise items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-display text-[12px] font-extrabold uppercase tracking-[0.14em] ring-1 ring-white/25 sm:text-[13px]">
          <span className="h-2 w-2 rounded-full bg-sun" aria-hidden="true" />
          <OpenSwitch at={s.openingAt} before={<>New store · {s.town}</>} after={<>Now open · {s.town}</>} />
        </p>

        <h1 className="mt-4 animate-rise font-display text-[46px] text-white font-black leading-[0.92] tracking-[-0.03em] [animation-delay:.08s] sm:text-[72px]">
          Big brands.
          <br />
          <span className="text-sun">Small prices.</span>
        </h1>

        <p className="mt-5 max-w-md animate-rise text-[17px] leading-snug text-white/90 [animation-delay:.16s] sm:text-lg">
          <OpenSwitch
            at={s.openingAt}
            before={<>Value World {s.town} opens on {s.openingDate}. Our full website is on the way.</>}
            after={<>Value World {s.town} is now open. Our full website is on the way.</>}
          />
        </p>

        <div className="mt-6 flex animate-rise justify-center [animation-delay:.24s]">
          <Countdown store={s} />
        </div>

        <p className="mt-7 flex animate-rise items-start justify-center gap-2 text-white/90 [animation-delay:.28s]">
          <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {s.address.line1}, {s.address.town} {s.address.postcode}
        </p>

        <div className="mt-5 flex animate-rise flex-wrap justify-center gap-2.5 [animation-delay:.32s]">
          <a href={s.directions} target="_blank" rel="noopener" className="btn-sun">
            <Navigation size={18} aria-hidden="true" /> Directions
          </a>
          <a href={`mailto:${site.email}`} className="btn-ghost">
            <Mail size={18} aria-hidden="true" /> Email us
          </a>
        </div>
      </main>

      <footer className="wrap pb-6 text-center text-[12px] leading-relaxed text-white/65">
        Value World is a trading name of {site.company.name}, registered in {site.company.registeredIn}, company number {site.company.number}. Registered office: {site.company.registeredOffice}.
        <br />
        Website by{" "}
        <a href="https://www.thesupportsdesk.com" className="underline underline-offset-2 hover:text-white">
          The Supports Desk
        </a>
      </footer>
    </div>
  );
}
