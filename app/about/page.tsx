import type { Metadata } from 'next';
import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Departments from '@/components/Departments';

export const metadata: Metadata = {
  title: 'About us',
  description: 'Value World brings big brands at small prices to Church Street, Ballymena.',
};

// TODO: replace the story paragraphs with Pat's own words about Value World and the Ballymena shop,
// and add photos of the team and shop floor.
export default function AboutPage() {
  return (
    <>
      <PageHead eyebrow="About us" title="Big brands, small prices, right in the town centre" />
      <section className="wrap grid gap-10 pt-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            Value World is a discount store packed with the brands you know at prices that make the weekly shop go further. Our Ballymena shop sits at 155 Church Street, in the old Bank of Ireland building beside the bandstand.
          </p>
          <p>
            Inside you&apos;ll find household and cleaning essentials, health and beauty, toys, art and stationery, cards, sweets and cold drinks, plus fresh bean-to-cup coffee and hot food to go.
          </p>
          <p>We&apos;re a local team serving local people, and we&apos;re here seven days a week.</p>
          <div className="pt-2">
            <Link href="/opening-hours/" className="btn-brand">
              Opening hours and directions
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Photo slots: shop front, team, shop floor, toy section */}
          {['Shop front', 'The team', 'Shop floor', 'Toy section'].map((label, i) => (
            <div
              key={label}
              className={`grid aspect-square place-items-center rounded-3xl text-center font-display text-sm font-extrabold uppercase tracking-wide ${
                i % 3 === 0 ? 'bg-brand text-white/80' : 'bg-sun/60 text-ink/60'
              }`}
            >
              {label}
              <span className="sr-only"> photo coming soon</span>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap pt-16">
        <h2 className="mb-8 text-[34px] font-black leading-tight sm:text-[40px]">What we stock</h2>
        <Departments />
      </section>
    </>
  );
}
