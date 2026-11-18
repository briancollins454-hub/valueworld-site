import { Candy, Coffee, CupSoda, Gift, Palette, Sparkles, SprayCan, ToyBrick } from 'lucide-react';
import { departments } from '@/lib/site';

const icons = {
  coffee: Coffee,
  chilled: CupSoda,
  household: SprayCan,
  beauty: Sparkles,
  toys: ToyBrick,
  stationery: Palette,
  cards: Gift,
  sweets: Candy,
} as const;

const tints = ['bg-brand-light text-brand', 'bg-[#fff6cc] text-[#8a6d00]'];

export default function Departments() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {departments.map((d, i) => {
        const Icon = icons[d.key];
        return (
          <li key={d.key} className="rounded-3xl border border-ink/10 bg-white p-5 sm:p-6">
            <span className={`grid h-12 w-12 place-items-center rounded-2xl ${tints[i % 2]}`}>
              <Icon size={24} aria-hidden="true" />
            </span>
            <h3 className="mt-4 text-[17px] font-extrabold leading-tight sm:text-[19px]">{d.name}</h3>
            <p className="mt-1.5 text-[14px] leading-snug text-ink-soft sm:text-[15px]">{d.blurb}</p>
          </li>
        );
      })}
    </ul>
  );
}
