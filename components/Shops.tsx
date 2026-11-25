import Link from 'next/link';
import { ArrowUpRight, Coffee, Gift, PencilRuler, PoundSterling, ShoppingBasket, SprayCan, ToyBrick } from 'lucide-react';
import { shopUrl, shops } from '@/lib/site';

const icons: Record<string, typeof Coffee> = {
  grocery: ShoppingBasket,
  'non-grocery': SprayCan,
  toys: ToyBrick,
  poundshop: PoundSterling,
  stationery: PencilRuler,
  convenience: Coffee,
  'card-and-gift': Gift,
};

// One colour per shop, used on the tiles and on each shop's own page.
export const shopLooks: Record<string, string> = {
  grocery: 'bg-leaf text-white',
  'non-grocery': 'bg-ink text-white',
  toys: 'bg-brand text-white',
  poundshop: 'bg-sun text-ink',
  stationery: 'bg-ink text-white',
  convenience: 'bg-brand text-white',
  'card-and-gift': 'bg-leaf text-white',
};
export const shopIcon = (slug: string) => icons[slug] ?? ShoppingBasket;

// The seven shops as linked tiles. The first tile spans two columns so seven fill an even grid.
export default function Shops({ exclude }: { exclude?: string }) {
  const list = shops.filter((s) => s.slug !== exclude);
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {list.map((s, i) => {
        const Icon = shopIcon(s.slug);
        const big = list.length === 7 && i === 0;
        return (
          <li key={s.slug} data-reveal style={{ ['--d' as string]: `${(i % 4) * 70}ms` }} className={big ? 'col-span-2' : ''}>
            <Link
              href={shopUrl(s)}
              className={`lift group relative isolate flex h-full min-h-[190px] flex-col justify-end overflow-hidden rounded-[28px] p-4 sm:min-h-[240px] sm:p-7 ${shopLooks[s.slug]}`}
            >
              <Icon
                aria-hidden="true"
                strokeWidth={1.4}
                className="absolute -right-6 -top-6 -z-10 h-40 w-40 opacity-20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-52 sm:w-52"
              />
              <span className="absolute left-5 top-5 font-display text-sm font-black opacity-70 sm:left-7 sm:top-7">
                {String(shops.indexOf(s) + 1).padStart(2, '0')}
              </span>
              <ArrowUpRight size={22} aria-hidden="true" className="absolute right-5 top-5 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:right-7 sm:top-7" />
              <h3 className="font-display text-[clamp(17px,4.8vw,22px)] font-black leading-tight text-current sm:text-[28px]">{s.name}</h3>
              <p className="mt-1.5 max-w-xs text-[14px] leading-snug opacity-85 sm:text-[15px]">{s.tagline}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
