import Link from 'next/link';
import { Facebook, Instagram, Mail, MapPin } from 'lucide-react';
import Logo from './Logo';
import { nav, site, storeUrl, stores, shortDate } from '@/lib/site';
import OpenSwitch from '@/components/OpenSwitch';

export default function Footer() {
  const companies = Array.from(new Map(stores.map((s) => [s.company.number, s.company])).values());
  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.2fr_1.6fr_1fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs font-display text-2xl font-black leading-tight">{site.tagline}</p>
          {(site.social.facebook || site.social.instagram) && (
            <div className="mt-5 flex gap-2">
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

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-sun">Our stores</h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2">
            {stores.map((s) => (
              <li key={s.slug}>
                <Link href={storeUrl(s)} className="group block">
                  <span className="flex items-center gap-2 font-display text-lg font-extrabold group-hover:underline">
                    <MapPin size={16} className="text-brand-logo" aria-hidden="true" /> {s.town}
                  </span>
                  <span className="mt-1 block text-[14px] leading-relaxed text-white/75">
                    {s.address.line1}, {s.address.postcode}
                    {s.status === 'opening-soon' && s.openingDate && (
                      <OpenSwitch
                        at={s.openingAt}
                        before={<span className="mt-1 block font-semibold text-sun">Opens {shortDate(s.openingDate)}</span>}
                        after={<span className="mt-1 block font-semibold text-sun">Open now</span>}
                      />
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[14px] text-white/60">{site.comingSoonNote}</p>
        </div>

        <div>
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.12em] text-sun">Get in touch</h2>
          <a href={`mailto:${site.email}`} className="mt-4 inline-flex items-start gap-2 break-all text-[15px] text-white/85 hover:text-white">
            <Mail size={16} aria-hidden="true" className="mt-1 shrink-0" /> {site.email}
          </a>
          <Link href="/contact/" className="mt-3 block font-semibold text-white underline-offset-4 hover:underline">
            Contact us
          </Link>
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
          <p>
            © {new Date().getFullYear()} {site.company.name} · Website by{" "}
            <a href="https://www.thesupportsdesk.com" className="underline underline-offset-2 hover:text-white">
              The Supports Desk
            </a>
          </p>
        </div>
        <div className="wrap space-y-1 pb-24 text-[12px] leading-relaxed text-white/50 lg:pb-6">
          {companies.map((c) => (
            <p key={c.number}>
              Value World is a trading name of {c.name}, registered in {c.registeredIn}, company number {c.number}. Registered office: {c.registeredOffice}.
              {c.vatNumber && ` VAT number ${c.vatNumber}.`}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}
