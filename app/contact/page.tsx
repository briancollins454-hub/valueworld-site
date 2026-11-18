import type { Metadata } from 'next';
import { Mail, Phone } from 'lucide-react';
import PageHead from '@/components/PageHead';
import ContactForm from '@/components/ContactForm';
import MapCard from '@/components/MapCard';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Value World Ballymena, 155 Church Street, Ballymena BT43 6DG.',
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
          {site.phone && (
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 rounded-3xl bg-brand p-6 text-white hover:bg-brand-dark">
              <Phone size={26} aria-hidden="true" />
              <span>
                <span className="block text-sm font-semibold uppercase tracking-wide text-white/75">Call the shop</span>
                <span className="font-display text-2xl font-black">{site.phone}</span>
              </span>
            </a>
          )}
          <a href={`mailto:${site.email}`} className="flex items-center gap-4 rounded-3xl bg-paper-warm p-6 hover:bg-sun/30">
            <Mail size={26} className="shrink-0 text-brand" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block text-sm font-semibold uppercase tracking-wide text-ink-faint">Email</span>
              <span className="block break-all font-display text-lg font-extrabold">{site.email}</span>
            </span>
          </a>
          <MapCard />
        </div>
      </section>
    </>
  );
}
