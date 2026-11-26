'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { shops, shopUrl } from '@/lib/site';

// Sign colours match the shop tiles further down the page.
const looks: Record<string, { bg: string; fg: string }> = {
  grocery: { bg: '#16784f', fg: '#ffffff' },
  'non-grocery': { bg: '#14181b', fg: '#ffffff' },
  toys: { bg: '#e1061b', fg: '#ffffff' },
  poundshop: { bg: '#ffd200', fg: '#14181b' },
  stationery: { bg: '#14181b', fg: '#ffffff' },
  convenience: { bg: '#e1061b', fg: '#ffffff' },
  'card-and-gift': { bg: '#16784f', fg: '#ffffff' },
};

// The seven shops as a 3D ring you can spin. Tap a shop to open its page.
export default function ShopRing({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) {
      setFailed(true);
      return;
    }
    let stop: (() => void) | undefined;
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    Promise.all([import('@/lib/shopRing'), document.fonts?.load('800 80px "Bricolage Grotesque Variable"').catch(() => null)])
      .then(([m]) => {
        if (cancelled) return;
        const list = shops.map((s) => ({ slug: s.slug, name: s.name, ...(looks[s.slug] ?? { bg: '#e1061b', fg: '#ffffff' }) }));
        stop = m.startShopRing(el, list, (slug: string) => {
          const s = shops.find((x) => x.slug === slug);
          if (s) router.push(shopUrl(s));
        }, { reduced });
      })
      .catch(() => setFailed(true));
    return () => {
      cancelled = true;
      stop?.();
    };
  }, [router]);

  if (failed) {
    return (
      <div className={`grid place-items-center ${className}`} aria-hidden="true">
        <img src="/logo.png" alt="" className="w-1/2 max-w-[260px] rounded-full shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)]" />
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <div ref={host} className="absolute inset-0" role="img" aria-label="The seven Value World shops arranged in a ring: grocery, non grocery, toys, poundshop, stationery, convenience, and card and gift" />
      <p className="pointer-events-none absolute inset-x-0 bottom-1 text-center font-display text-[12px] font-extrabold uppercase tracking-[0.16em] text-white/75 sm:text-[13px]">
        Drag to spin · Tap a shop to look inside
      </p>
    </div>
  );
}
