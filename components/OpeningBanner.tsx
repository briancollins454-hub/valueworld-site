import { site } from '@/lib/site';

export default function OpeningBanner() {
  if (!site.openingSoon) return null;
  return (
    <div className="bg-leaf text-white">
      <p className="wrap py-2.5 text-center font-display text-[15px] font-extrabold sm:text-base">
        Opening soon: {site.openingDate} on Church Street, Ballymena
      </p>
    </div>
  );
}
