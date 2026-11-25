import { departments, site, stores } from '@/lib/site';

// A full-width band: the shop-floor photo once supplied, otherwise a bold brand statement.
export default function BrandBand() {
  const photo = site.photos.band;
  return (
    <section className="relative isolate mt-24 overflow-hidden bg-ink text-white">
      {photo ? (
        <>
          <img src={photo} alt="Inside a Value World store" className="absolute inset-0 -z-20 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
        </>
      ) : (
        <div className="dots absolute inset-0 -z-10 opacity-40" />
      )}
      <div className={`wrap flex flex-col justify-end ${photo ? 'min-h-[520px] py-14' : 'py-20 sm:py-28'}`}>
        <p data-reveal className="font-display text-sm font-extrabold uppercase tracking-[0.16em] text-sun">
          Proudly local
        </p>
        <p data-reveal style={{ ['--d' as string]: '80ms' }} className="mt-4 max-w-4xl font-display text-[40px] font-black leading-[1] tracking-tight sm:text-[72px]">
          Everyday essentials, big-name brands, <span className={photo ? 'text-sun' : 'text-brand-logo'}>prices that make sense.</span>
        </p>
        <div data-reveal style={{ ['--d' as string]: '160ms' }} className="mt-10 grid max-w-3xl grid-cols-3 gap-4 border-t border-white/15 pt-8">
          <div>
            <p className="font-display text-3xl font-black sm:text-5xl">{departments.length}</p>
            <p className="mt-1 text-sm text-white/70 sm:text-base">shops under one roof</p>
          </div>
          <div>
            <p className="font-display text-3xl font-black sm:text-5xl">{stores.length}</p>
            <p className="mt-1 text-sm text-white/70 sm:text-base">{stores.length === 1 ? 'store, with more on the way' : 'stores and growing'}</p>
          </div>
          <div>
            <p className="font-display text-3xl font-black sm:text-5xl">{Math.min(...stores.map((s) => s.hours.length))}</p>
            <p className="mt-1 text-sm text-white/70 sm:text-base">days a week</p>
          </div>
        </div>
      </div>
    </section>
  );
}
