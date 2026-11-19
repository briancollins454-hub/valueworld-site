import { site } from '@/lib/site';

export default function OpeningBanner() {
  if (!site.openingSoon) return null;
  return (
    <div className="bg-leaf text-white">
      <p className="wrap py-1.5 text-center font-display text-[13px] font-extrabold sm:text-[14px]">
        <span className="sm:hidden">Opening {site.openingDate.replace('Wednesday', 'Wed').replace('November', 'Nov')}</span>
        <span className="hidden sm:inline">Opening soon: {site.openingDate} on Church Street, Ballymena</span>
      </p>
    </div>
  );
}
