import Link from 'next/link';
import { Clock, Navigation, Phone } from 'lucide-react';
import { site } from '@/lib/site';

// Sticky action bar on phones: directions, call, hours.
export default function MobileBar() {
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[12px] font-bold';
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="flex">
        <a href={site.directions} target="_blank" rel="noopener" className={`${item} text-brand`}>
          <Navigation size={20} aria-hidden="true" /> Directions
        </a>
        {site.phone && (
          <a href={`tel:${site.phone.replace(/\s/g, '')}`} className={`${item} text-ink`}>
            <Phone size={20} aria-hidden="true" /> Call
          </a>
        )}
        <Link href="/opening-hours/" className={`${item} text-ink`}>
          <Clock size={20} aria-hidden="true" /> Hours
        </Link>
      </div>
    </nav>
  );
}
