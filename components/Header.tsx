'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';
import { nav, site } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur">
      <div className="wrap flex h-[80px] items-center justify-between gap-4">
        <Link href="/" aria-label="Value World Ballymena, home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const active = item.href === '/' ? path === '/' : path?.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`rounded-full px-4 py-2.5 font-display text-[16px] font-bold transition-colors ${
                      active ? 'bg-brand-light text-brand' : 'text-ink hover:bg-paper-warm'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          {site.phone ? (
            <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn-brand hidden px-5 sm:inline-flex">
              <Phone size={18} aria-hidden="true" /> Call us
            </a>
          ) : (
            <a href={site.directions} target="_blank" rel="noopener" className="btn-brand hidden px-5 sm:inline-flex">
              <MapPin size={18} aria-hidden="true" /> Directions
            </a>
          )}
          <button
            type="button"
            className="grid h-12 w-12 place-items-center rounded-full border-2 border-ink/10 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-ink/10 bg-white lg:hidden">
          <ul className="wrap flex flex-col py-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3.5 font-display text-[19px] font-extrabold hover:bg-paper-warm"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 flex gap-2 px-1 pb-2">
              {site.phone && (
                <a href={`tel:${site.phone.replace(/\s/g, '')}`} className="btn-brand flex-1">
                  <Phone size={18} aria-hidden="true" /> Call
                </a>
              )}
              <a href={site.directions} target="_blank" rel="noopener" className="btn-sun flex-1">
                <MapPin size={18} aria-hidden="true" /> Directions
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
