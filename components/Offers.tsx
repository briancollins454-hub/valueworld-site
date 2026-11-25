import { Tag, UtensilsCrossed } from 'lucide-react';
import OpenSwitch from '@/components/OpenSwitch';
import { nextOpening, offers, offersValidUntil } from '@/lib/site';

export default function Offers({ limit, store, shop }: { limit?: number; store?: string; shop?: string }) {
  const forStore = (store ? offers.filter((o) => !o.stores || o.stores.includes(store)) : offers).filter((o) => !shop || o.shop === shop);
  const list = limit ? forStore.slice(0, limit) : forStore;

  if (list.length === 0) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-brand/30 bg-brand-light/50 px-6 py-10 text-center sm:px-10">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white">
          <Tag size={26} aria-hidden="true" />
        </span>
        <OpenSwitch
          at={nextOpening?.openingAt}
          before={
            nextOpening ? (
              <>
                <h3 className="mt-4 text-2xl font-black">Opening offers coming soon</h3>
                <p className="mx-auto mt-2 max-w-md text-ink-soft">
                  Our {nextOpening.town} store opens on {nextOpening.openingDate}. Opening deals will be posted here first.
                </p>
              </>
            ) : (
              <EmptyOpen />
            )
          }
          after={<EmptyOpen />}
        />
      </div>
    );
  }

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {list.map((o) => (
          <li key={o.name} className="overflow-hidden rounded-3xl border border-ink/10 bg-white">
            <div className="relative aspect-[4/3] bg-paper-warm">
              {o.image ? (
                <img src={o.image} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="relative grid h-full w-full place-items-center overflow-hidden bg-brand text-white">
                  <div className="dots absolute inset-0 opacity-50" />
                  <UtensilsCrossed size={44} className="relative" aria-hidden="true" />
                </div>
              )}
              {o.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-sun px-3 py-1 font-display text-[13px] font-extrabold">
                  {o.badge}
                </span>
              )}
            </div>
            <div className="p-4 sm:p-5">
              <h3 className="text-[16px] font-extrabold leading-snug sm:text-lg">{o.name}</h3>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-3xl font-black text-brand">{o.price}</span>
                {o.was && <span className="text-sm text-ink-faint line-through">{o.was}</span>}
              </p>
              {o.note && <p className="mt-1 text-sm text-ink-soft">{o.note}</p>}
            </div>
          </li>
        ))}
      </ul>
      {offersValidUntil && <p className="mt-4 text-sm text-ink-soft">Offers run until {offersValidUntil}, while stocks last.</p>}
    </>
  );
}

function EmptyOpen() {
  return (
    <>
      <h3 className="mt-4 text-2xl font-black">This week&apos;s offers are on the way</h3>
      <p className="mx-auto mt-2 max-w-md text-ink-soft">Pop in to see what&apos;s on the shelves today.</p>
    </>
  );
}
