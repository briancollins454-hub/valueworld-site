import type { Metadata } from 'next';
import { pageMeta } from '@/lib/seo';
import Link from 'next/link';
import PageHead from '@/components/PageHead';
import Shops from '@/components/Shops';
import { site } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  path: '/about/',
  title: 'About Us',
  description:
    'Value World is a discount shop bringing big brands at small prices to local high streets, starting with Church Street, Ballymena.',
});

// TODO: replace the story paragraphs with Pat's own words. The right-hand panel switches to the
// first four gallery photos once they're added in lib/site.ts.
export default function AboutPage() {
  return (
    <>
      <PageHead eyebrow="About us" title="Big brands, small prices, right in the town centre" />
      <section className="wrap grid gap-10 pt-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            Value World is a discount store packed with the brands you know at prices that make the weekly shop go further. Every store looks and feels the same, so you always know what you&apos;ll find.
          </p>
          <p>
            Every store is seven shops under one roof: Grocery, Non Grocery, Toys, a Poundshop, Stationery, Convenience with fresh coffee and hot food to go, and a Card and Gift Shop.
          </p>
          <p>Each store is run by a local team serving local people. {site.comingSoonNote}</p>
          <div className="pt-2">
            <Link href="/stores/" className="btn-brand">
              Find your nearest store
            </Link>
          </div>
        </div>

        {site.photos.gallery.length >= 4 ? (
          <div className="grid grid-cols-2 gap-3">
            {site.photos.gallery.slice(0, 4).map((p) => (
              <img key={p.src} src={p.src} alt={p.alt} className="aspect-square w-full rounded-3xl object-cover" />
            ))}
          </div>
        ) : (
          <div data-reveal className="relative isolate grid min-h-[340px] place-items-center overflow-hidden rounded-[32px] bg-brand">
            <div className="dots absolute inset-0 -z-10 opacity-60" />
            <div className="absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-brand-logo" />
            <img src="/logo.png" alt="" aria-hidden="true" className="h-56 w-56 animate-float rounded-full shadow-[0_30px_60px_-25px_rgba(0,0,0,.6)] sm:h-64 sm:w-64" />
            <span className="tag absolute left-6 top-8 rotate-[-8deg] bg-sun py-2.5 pl-8 pr-4 font-display font-black text-ink">Big brands</span>
            <span className="tag absolute bottom-8 right-6 rotate-[6deg] bg-white py-2.5 pl-8 pr-4 font-display font-black text-brand">Small prices</span>
          </div>
        )}
      </section>

      <section className="wrap pt-16">
        <h2 className="mb-8 text-[34px] font-black leading-tight sm:text-[40px]">Seven shops under one roof</h2>
        <Shops />
      </section>
    </>
  );
}
