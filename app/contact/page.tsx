import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import { site, storeUrl, stores } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Value World.',
};

export default function ContactPage() {
  return (
    <>
      <PageHead eyebrow="Contact" title="Get in touch" intro="Questions about stock, opening times or anything else? Send us a message and we'll get back to you." />
      <section className="wrap grid gap-10 pt-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
          <ContactForm />
        </div>
        <div className="space-y-4">
          <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-3xl bg-paper-warm p-6 hover:bg-sun/30">
            <Mail size={26} className="shrink-0 text-brand" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold uppercase tracking-wide text-ink-faint">Email</span>
              <span className="block break-all font-display text-lg font-extrabold">{site.email}</span>
            </span>
          </a>
          <div className="rounded-3xl border border-ink/10 bg-white p-6">
            <h2 className="font-display text-lg font-extrabold">Our stores</h2>
            <ul className="mt-3 divide-y divide-ink/10">
              {stores.map((s) => (
                <li key={s.slug} className="flex items-center justify-between gap-4 py-3">
                  <span>
                    <span className="block font-display text-lg font-extrabold">{s.town}</span>
                    <span className="text-[15px] text-ink-soft">
                      {s.address.line1}, {s.address.postcode}
                    </span>
                    {s.phone && (
                      <a href={`tel:${s.phone.replace(/\s/g, '')}`} className="mt-1 flex items-center gap-1.5 text-[15px] font-semibold text-brand">
                        <Phone size={15} aria-hidden="true" /> {s.phone}
                      </a>
                    )}
                  </span>
                  <Link href={storeUrl(s)} className="inline-flex shrink-0 items-center gap-1 font-display font-extrabold text-brand hover:underline">
                    Details <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-ink/10 bg-white p-6 text-[15px] leading-relaxed">
            <h2 className="font-display text-lg font-extrabold">Company details</h2>
            <dl className="mt-3 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-ink-soft">
              <dt className="font-semibold text-ink">Company</dt>
              <dd>{site.company.name}</dd>
              <dt className="font-semibold text-ink">Company no.</dt>
              <dd>{site.company.number}</dd>
              <dt className="font-semibold text-ink">Registered in</dt>
              <dd>{site.company.registeredIn}</dd>
              <dt className="font-semibold text-ink">Registered office</dt>
              <dd>{site.company.registeredOffice}</dd>
              {site.company.vatNumber && (
                <>
                  <dt className="font-semibold text-ink">VAT no.</dt>
                  <dd>{site.company.vatNumber}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
