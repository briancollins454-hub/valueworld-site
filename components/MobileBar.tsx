import Link from 'next/link';
import { LayoutGrid, Mail, MapPin, Tag } from 'lucide-react';

// Sticky action bar on phones.
export default function MobileBar() {
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[12px] font-bold';
  return (
    <nav aria-label="Quick actions" className="fixed inset-x-0 bottom-0 z-40 border-t border-ink/10 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
      <div className="flex">
        <Link href="/stores/" className={`${item} text-brand`}>
          <MapPin size={20} aria-hidden="true" /> Stores
        </Link>
        <Link href="/shops/" className={`${item} text-ink`}>
          <LayoutGrid size={20} aria-hidden="true" /> Shops
        </Link>
        <Link href="/offers/" className={`${item} text-ink`}>
          <Tag size={20} aria-hidden="true" /> Offers
        </Link>
        <Link href="/contact/" className={`${item} text-ink`}>
          <Mail size={20} aria-hidden="true" /> Contact
        </Link>
      </div>
    </nav>
  );
}
