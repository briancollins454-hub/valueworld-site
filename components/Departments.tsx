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

// Colour per tile, cycling through the brand palette.
const looks = [
  'bg-brand text-white',
  'bg-ink text-white',
  'bg-leaf text-white',
  'bg-sun text-ink',
  'bg-ink text-white',
  'bg-brand text-white',
  'bg-sun text-ink',
  'bg-leaf text-white',
];

export default function Departments() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {departments.map((d, i) => {
        const Icon = icons[d.key];
        // 0, 3, 4 and 7 span two columns on desktop so the grid fills three even rows.
        const big = i === 0 || i === 3 || i === 4 || i === 7;
        return (
          <li
            key={d.key}
            data-reveal
            style={{ ['--d' as string]: `${(i % 4) * 70}ms` }}
            className={`lift group relative isolate flex min-h-[190px] flex-col justify-end overflow-hidden rounded-[28px] p-5 sm:min-h-[240px] sm:p-7 ${looks[i]} ${
              big ? 'lg:col-span-2' : ''
            }`}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.4}
              className="absolute -right-6 -top-6 -z-10 h-40 w-40 opacity-20 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 sm:h-52 sm:w-52"
            />
            <span className="absolute left-5 top-5 font-display text-sm font-black opacity-70 sm:left-7 sm:top-7">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-display text-[22px] font-black leading-tight text-current sm:text-[28px]">{d.name}</h3>
            <p className="mt-1.5 max-w-xs text-[14px] leading-snug opacity-85 sm:text-[15px]">{d.blurb}</p>
          </li>
        );
      })}
    </ul>
  );
}
