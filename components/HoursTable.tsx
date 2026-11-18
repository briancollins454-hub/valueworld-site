'use client';

import { useEffect, useState } from 'react';
import { site } from '@/lib/site';

// Highlights today's row once the page loads in the browser.
export default function HoursTable() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-GB', { weekday: 'long', timeZone: 'Europe/London' }));
  }, []);

  return (
    <table className="w-full text-left text-[17px]">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {site.hours.map((h) => {
          const isToday = h.day === today;
          return (
            <tr key={h.day} className={isToday ? 'bg-brand-light font-bold' : 'border-b border-ink/10 last:border-0'}>
              <th scope="row" className={`py-3.5 pl-4 font-semibold ${isToday ? 'rounded-l-2xl text-brand' : ''}`}>
                {h.day}
                {isToday && <span className="ml-2 text-sm font-bold uppercase tracking-wide">Today</span>}
              </th>
              <td className={`py-3.5 pr-4 text-right ${isToday ? 'rounded-r-2xl' : ''}`}>
                {h.open} to {h.close}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
