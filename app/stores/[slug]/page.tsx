import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, Landmark, Mail, Navigation, Phone, Tag } from 'lucide-react';
import Countdown from '@/components/Countdown';
import OpenSwitch from '@/components/OpenSwitch';
import HoursTable from '@/components/HoursTable';
import MapCard from '@/components/MapCard';
import Departments from '@/components/Departments';
import Offers from '@/components/Offers';
import { shortDate, stores } from '@/lib/site';
import { storeSchema } from '@/lib/schema';
import { pageMeta } from '@/lib/seo';

export const dynamicParams = false;
export function generateStaticParams() {
  return stores.map((s) => ({ slug: s.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const s = stores.find((x) => x.slug === slug);
  if (!s) return {};
  return pageMeta({
    path: `/stores/${s.slug}/`,
    title: `Value World ${s.town} | Discount Shop, ${s.address.line1}`,
    absoluteTitle: true,
    description: `Value World ${s.town} is a discount shop at ${s.address.line1}, ${s.address.town} ${s.address.postcode}${s.landmark ? ', ' + s.landmark.replace(/^In /, 'in ').replace(/\.$/, '') : ''}. Big brands at small prices. Opening hours, directions and offers.`,
  });
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;
  const s = stores.find((x) => x.slug === slug);
  if (!s) notFound();
  const pics = s.photos.gallery;

  return (
    <>
      {/* Store hero */}
      <section className="relative isolate overflow-hidden bg-brand text-white">
        {s.photos.hero ? (
          <>
            <img src={s.photos.hero} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-deep/95 via-brand/85 to-brand/40" />
          </>
        ) : (
          <>
            <div className="dots absolute inset-0 -z-10 opacity-50" />
            <div className="absolute -right-32 -top-48 -z-10 h-[460px] w-[460px] rounded-full bg-brand-logo" />
            <img src="/logo.png" alt="" aria-hidden="true" className="absolute -bottom-10 right-[5%] -z-10 hidden h-60 w-60 rotate-12 lg:block" />
          </>
        )}
        <div className="wrap py-10 sm:py-14">
          <nav aria-label="Breadcrumb" className="animate-rise text-[14px] text-white/75">
            <Link href="/stores/" className="hover:text-white hover:underline">
              Stores
            </Link>{' '}
            / <span className="text-white">{s.town}</span>
          </nav>
          <h1 className="mt-3 animate-rise text-[48px] font-black leading-[0.95] tracking-tight text-white [animation-delay:.08s] sm:text-[72px]">
            Value World <span className="text-sun">{s.town}</span>
          </h1>
          <p className="mt-3 animate-rise text-lg text-white/90 [animation-delay:.12s]">
            {s.address.line1}, {s.address.town} {s.address.postcode}
          </p>
          {s.status === 'opening-soon' && (
            <div className="mt-6 animate-rise [animation-delay:.16s]">
              <Countdown store={s} label={s.openingDate ? `Opening ${shortDate(s.openingDate)} · doors open in` : undefined} />
            </div>
          )}
          <div className="mt-6 flex animate-rise flex-wrap gap-2.5 [animation-delay:.2s]">
            <a href={s.directions} target="_blank" rel="noopener" className="btn-sun">
              <Navigation size={18} aria-hidden="true" /> Directions
            </a>
            {s.phone && (
              <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="btn-ghost">
                <Phone size={18} aria-hidden="true" /> Call
              </a>
            )}
            <Link href="/offers/" className="btn-ghost">
              <Tag size={18} aria-hidden="true" /> Offers
            </Link>
          </div>
        </div>
      </section>

      {/* Hours and map */}
      <section className="wrap grid gap-5 pt-14 lg:grid-cols-[1fr_1.4fr]">
        <div data-reveal className="flex flex-col rounded-[28px] border border-ink/10 bg-white p-4 sm:p-6">
          <h2 className="flex items-center gap-2 px-4 pt-2 text-2xl font-black">
            <Clock size={22} className="text-brand" aria-hidden="true" /> Opening hours
          </h2>
          <div className="mt-3">
            <HoursTable store={s} />
          </div>
          {s.status === 'opening-soon' && s.openingDate && (
            <OpenSwitch
              at={s.openingAt}
              before={
                <p className="mx-4 mt-4 rounded-2xl bg-sun/30 px-4 py-3 text-[15px]">
                  We open on <strong>{s.openingDate}</strong>. These are our regular hours from then on.
                </p>
              }
            />
          )}
          {s.landmark && (
            <p className="mt-auto flex items-start gap-2 px-4 pb-2 pt-4 text-[15px] text-ink-soft">
              <Landmark size={18} className="mt-0.5 shrink-0 text-brand" aria-hidden="true" /> {s.landmark}
            </p>
          )}
        </div>
        <div data-reveal style={{ ['--d' as string]: '100ms' }}>
          <MapCard store={s} />
        </div>
      </section>

      {/* Store photos, once supplied */}
      {pics.length > 0 && (
        <section className="wrap pt-20">
          <h2 data-reveal className="h-section">Inside the {s.town} store</h2>
          <ul className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:grid-cols-4">
            {pics.slice(0, 7).map((p, i) => (
              <li key={p.src} data-reveal className={`overflow-hidden rounded-[24px] ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Offers */}
      <section className="wrap pt-20">
        <p data-reveal className="eyebrow">In {s.town}</p>
        <h2 data-reveal className="h-section mb-8 mt-2">
          Offers
        </h2>
        <Offers limit={6} store={s.slug} />
      </section>

      {/* Departments */}
      <section className="wrap pt-20">
        <p data-reveal className="eyebrow">In store</p>
        <h2 data-reveal className="h-section mb-8 mt-2">
          What you&apos;ll find
        </h2>
        <Departments />
      </section>

      {/* Store contact and company */}
      <section className="wrap grid gap-4 pt-20 md:grid-cols-2">
        <div data-reveal className="rounded-[28px] bg-paper-warm p-6 sm:p-8">
          <h2 className="text-2xl font-black">Contact the {s.town} store</h2>
          <ul className="mt-4 space-y-3 text-[16px]">
            {s.phone && (
              <li>
                <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 font-semibold hover:underline">
                  <Phone size={18} className="text-brand" aria-hidden="true" /> {s.phone}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${s.email}`} className="inline-flex items-center gap-2 break-all font-semibold hover:underline">
                <Mail size={18} className="shrink-0 text-brand" aria-hidden="true" /> {s.email}
              </a>
            </li>
          </ul>
        </div>
        <div data-reveal style={{ ['--d' as string]: '80ms' }} className="rounded-[28px] border border-ink/10 bg-white p-6 text-[15px] sm:p-8">
          <h2 className="text-2xl font-black">Company details</h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-ink-soft">
            <dt className="font-semibold text-ink">Run by</dt>
            <dd>{s.company.name}</dd>
            <dt className="font-semibold text-ink">Company no.</dt>
            <dd>{s.company.number}</dd>
            <dt className="font-semibold text-ink">Registered office</dt>
            <dd>{s.company.registeredOffice}</dd>
            {s.company.vatNumber && (
              <>
                <dt className="font-semibold text-ink">VAT no.</dt>
                <dd>{s.company.vatNumber}</dd>
              </>
            )}
          </dl>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema(s)) }} />
    </>
  );
}
