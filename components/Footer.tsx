import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Logo from './Logo';
import { nav, site } from '@/lib/site';

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-white/75">{site.tagline}</p>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-sun">Visit</h2>
          <address className="mt-4 space-y-1 text-[15px] not-italic leading-relaxed text-white/85">
            <span className="block">{site.address.line1}</span>
            <span className="block">
              {site.address.town} {site.address.postcode}
            </span>
          </address>
          <a href={site.directions} target="_blank" rel="noopener" className="mt-3 inline-flex items-center gap-2 font-semibold text-white underline-offset-4 hover:underline">
            <MapPin size={16} aria-hidden="true" /> Get directions
          </a>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-sun">Opening hours</h2>
          <ul className="mt-4 space-y-1 text-[15px] text-white/85">
            <li>Mon to Sat: {site.hours[0].open} to {site.hours[0].close}</li>
            <li>Sunday: {site.hours[6].open} to {site.hours[6].close}</li>
          </ul>
          <Link href="/opening-hours/" className="mt-3 inline-block font-semibold text-white underline-offset-4 hover:underline">
            Full hours
          </Link>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-sun">Get in touch</h2>
          <ul className="mt-4 space-y-2 text-[15px] text-white/85">
            {site.phone && (
              <li>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-white">
                  <Phone size={16} aria-hidden="true" /> {site.phone}
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 break-all hover:text-white">
                <Mail size={16} aria-hidden="true" className="shrink-0" /> {site.email}
              </a>
            </li>
          </ul>
          {(site.social.facebook || site.social.instagram) && (
            <div className="mt-4 flex gap-2">
              {site.social.facebook && (
                <a href={site.social.facebook} target="_blank" rel="noopener" aria-label="Value World on Facebook" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <Facebook size={20} aria-hidden="true" />
                </a>
              )}
              {site.social.instagram && (
                <a href={site.social.instagram} target="_blank" rel="noopener" aria-label="Value World on Instagram" className="grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20">
                  <Instagram size={20} aria-hidden="true" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>© {new Date().getFullYear()} Value World NI Ltd</p>
        </div>
      </div>
    </footer>
  );
}
