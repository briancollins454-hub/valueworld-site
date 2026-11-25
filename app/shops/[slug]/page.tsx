import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight, Check, MapPin } from 'lucide-react';
import Offers from '@/components/Offers';
import Shops, { shopIcon, shopLooks } from '@/components/Shops';
import { pageMeta } from '@/lib/seo';
import { offers, shops, storeUrl, stores } from '@/lib/site';

export const dynamicParams = false;
export function generateStaticParams() {
  return shops.map((s) => ({ slug: s.slug }));
}

const town = stores[0].town;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = shops.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({
    path: `/shops/${s.slug}/`,
    title: `${s.seoTitle} in ${town} | Value World`,
    absoluteTitle: true,
    description: `${s.blurb} ${s.items.slice(0, 4).join(', ')} and more at Value World, ${stores[0].address.line1}, ${town}.`,
  });
}

export default async function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = shops.find((x) => x.slug === slug);
  if (!s) notFound();
  const Icon = shopIcon(s.slug);
  const hasOffers = offers.some((o) => o.shop === s.slug);

  return (
    <>
      <section className={`relative isolate overflow-hidden ${shopLooks[s.slug]}`}>
        <div className="dots absolute inset-0 -z-10 opacity-40" />
        <Icon aria-hidden="true" strokeWidth={1.2} className="absolute -right-10 -top-10 -z-10 h-72 w-72 opacity-15 sm:h-96 sm:w-96" />
        <div className="wrap py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="animate-rise text-[14px] opacity-75">
            <Link href="/shops/" className="hover:underline">
              Our shops
            </Link>{' '}
            / {s.name}
          </nav>
          <p className="mt-6 animate-rise font-display text-sm font-extrabold uppercase tracking-[0.16em] opacity-80">
            Shop {String(shops.indexOf(s) + 1).padStart(2, '0')} of 7 at Value World
          </p>
          <h1 className="mt-2 animate-rise font-display text-[44px] font-black leading-[0.95] tracking-tight text-current sm:text-[72px]">{s.name}</h1>
          <p className="mt-4 max-w-xl animate-rise text-lg opacity-90 sm:text-xl">{s.blurb}</p>
        </div>
      </section>

      <section className="wrap grid gap-10 pt-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <h2 className="font-display text-[28px] font-black leading-tight sm:text-[34px]">What you&apos;ll find</h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {s.items.map((it) => (
              <li key={it} className="flex items-center gap-3 rounded-2xl border border-ink/10 bg-white px-4 py-3.5 font-semibold">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-light text-brand">
                  <Check size={18} aria-hidden="true" />
                </span>
                {it}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          {stores.map((st) => (
            <Link key={st.slug} href={storeUrl(st)} className="lift flex items-start gap-4 rounded-3xl bg-paper-warm p-6">
              <MapPin size={24} className="mt-1 shrink-0 text-brand" aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold uppercase tracking-wide text-ink-faint">Find it at</span>
                <span className="block font-display text-xl font-extrabold">Value World {st.town}</span>
                <span className="block text-ink-soft">
                  {st.address.line1}, {st.address.postcode}
                </span>
                <span className="mt-2 inline-flex items-center gap-1 font-display font-extrabold text-brand">
                  Hours and directions <ArrowRight size={16} aria-hidden="true" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {hasOffers && (
        <section className="wrap pt-16">
          <h2 className="mb-8 font-display text-[28px] font-black leading-tight sm:text-[34px]">{s.name} offers</h2>
          <Offers shop={s.slug} />
        </section>
      )}

      <section className="wrap pt-16">
        <h2 className="mb-8 font-display text-[28px] font-black leading-tight sm:text-[34px]">The other six shops</h2>
        <Shops exclude={s.slug} />
      </section>
    </>
  );
}
