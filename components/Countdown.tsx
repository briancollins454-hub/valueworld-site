'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

function parts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hrs: Math.floor((s % 86400) / 3600), mins: Math.floor((s % 3600) / 60), secs: s % 60 };
}

export default function Countdown() {
  const target = Date.parse(site.openingAt);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!site.openingSoon) return null;

  if (now !== null && now >= target) {
    return (
      <p className="inline-flex items-center gap-3 rounded-2xl bg-white/10 px-5 py-3 font-display text-xl font-black text-white ring-1 ring-white/20">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sun opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-sun" />
        </span>
        Now open on Church Street
      </p>
    );
  }

  const p = now === null ? null : parts(target - now);
  const cells: [string, number | undefined][] = [
    ['Days', p?.days],
    ['Hours', p?.hrs],
    ['Mins', p?.mins],
    ['Secs', p?.secs],
  ];

  return (
    <div>
      <p className="font-display text-sm font-extrabold uppercase tracking-[0.14em] text-white/80">Doors open in</p>
      <div className="mt-3 flex gap-2 sm:gap-3" role="timer" aria-label={`Opening ${site.openingDate}`}>
        {cells.map(([label, v]) => (
          <div key={label} className="w-[68px] rounded-2xl bg-white/10 py-3 text-center ring-1 ring-white/20 backdrop-blur sm:w-[78px]">
            <span className="block font-display text-[30px] font-black leading-none tabular-nums text-white sm:text-[36px]" aria-hidden="true">
              {v === undefined ? '--' : String(v).padStart(2, '0')}
            </span>
            <span className="mt-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-white/70" aria-hidden="true">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
