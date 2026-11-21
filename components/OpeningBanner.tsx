import Link from 'next/link';
import OpenSwitch from '@/components/OpenSwitch';
import { nextOpening, shortDate, storeUrl } from '@/lib/site';

export default function OpeningBanner() {
  const s = nextOpening;
  if (!s || !s.openingDate) return null;
  return (
    <div className="bg-leaf text-white">
      <p className="wrap py-1.5 text-center font-display text-[13px] font-extrabold sm:text-[14px]">
        <Link href={storeUrl(s)} className="underline-offset-4 hover:underline">
          <OpenSwitch
            at={s.openingAt}
            before={
              <>
                <span className="sm:hidden">
                  New store: {s.town} opens {shortDate(s.openingDate)}
                </span>
                <span className="hidden sm:inline">
                  New store: Value World {s.town} opens {s.openingDate}, {s.address.line1}
                </span>
              </>
            }
            after={
              <>
                <span className="sm:hidden">Now open: Value World {s.town}</span>
                <span className="hidden sm:inline">
                  Now open: Value World {s.town}, {s.address.line1}
                </span>
              </>
            }
          />
        </Link>
      </p>
    </div>
  );
}
