import Link from 'next/link';
import { ArrowRight, Clock, MapPin } from 'lucide-react';
import { shortDate, storeUrl, type Store } from '@/lib/site';

export default function StoreCard({ store, i = 0 }: { store: Store; i?: number }) {
  const weekday = store.hours[0];
  const sunday = store.hours.find((h) => h.day === 'Sunday');
  return (
    <li data-reveal style={{ ['--d' as string]: `${i * 80}ms` }}>
      <Link
        href={storeUrl(store)}
        className="lift group relative isolate flex h-full flex-col overflow-hidden rounded-[28px] bg-brand p-6 text-white sm:p-8"
      >
        <div className="dots absolute inset-0 -z-10 opacity-40" />
        <div className="absolute -right-16 -top-16 -z-10 h-48 w-48 rounded-full bg-brand-logo" />
        <img src="/logo.png" alt="" aria-hidden="true" className="absolute right-5 top-5 h-16 w-16 rotate-6 transition-transform duration-500 group-hover:rotate-0 sm:h-20 sm:w-20" />

        {store.status === 'opening-soon' && store.openingDate && (
          <span className="self-start rounded-full bg-sun px-3 py-1 font-display text-[13px] font-extrabold text-ink">
            Opens {shortDate(store.openingDate)}
          </span>
        )}
        {store.status === 'open' && <span className="self-start rounded-full bg-leaf px-3 py-1 font-display text-[13px] font-extrabold">Open now</span>}
        {store.status === 'coming-soon' && <span className="self-start rounded-full bg-white/15 px-3 py-1 font-display text-[13px] font-extrabold">Coming soon</span>}

        <h3 className="mt-5 font-display text-[36px] font-black leading-none text-white sm:text-[44px]">{store.town}</h3>
        <p className="mt-3 flex items-start gap-2 text-white/90">
          <MapPin size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
          {store.address.line1}, {store.address.town} {store.address.postcode}
        </p>
        {weekday && (
          <p className="mt-1.5 flex items-start gap-2 text-white/90">
            <Clock size={18} className="mt-0.5 shrink-0" aria-hidden="true" />
            Mon to Sat {weekday.open} to {weekday.close}
            {sunday ? `, Sun ${sunday.open} to ${sunday.close}` : ''}
          </p>
        )}
        <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 font-display font-extrabold text-brand transition-transform group-hover:translate-x-1">
          Store details <ArrowRight size={18} aria-hidden="true" />
        </span>
      </Link>
    </li>
  );
}

// Placeholder card for future stores.
export function ComingSoonCard({ note }: { note: string }) {
  return (
    <li data-reveal style={{ ['--d' as string]: '80ms' }} className="flex min-h-[260px] flex-col justify-end rounded-[28px] border-2 border-dashed border-ink/15 bg-paper-warm p-6 sm:p-8">
      <span className="self-start rounded-full bg-ink px-3 py-1 font-display text-[13px] font-extrabold text-white">Coming soon</span>
      <p className="mt-5 font-display text-[28px] font-black leading-tight">More stores on the way</p>
      <p className="mt-2 text-ink-soft">{note}</p>
    </li>
  );
}
