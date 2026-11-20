import { MapPin, Navigation } from 'lucide-react';
import type { Store } from '@/lib/site';

export default function MapCard({ store }: { store: Store }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
      <iframe
        title={`Map showing Value World ${store.town}, ${store.address.line1}`}
        src={store.mapEmbed}
        className="block h-[300px] w-full sm:h-[380px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="flex items-start gap-3">
          <MapPin size={22} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" />
          <span>
            <span className="block font-display text-lg font-extrabold">{store.address.line1}</span>
            <span className="text-ink-soft">
              {store.address.town} {store.address.postcode}
            </span>
          </span>
        </p>
        <a href={store.directions} target="_blank" rel="noopener" className="btn-brand">
          <Navigation size={18} aria-hidden="true" /> Get directions
        </a>
      </div>
    </div>
  );
}
