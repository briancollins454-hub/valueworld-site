const items = ['Big brands', 'Small prices', 'Toys & games', 'Household', 'Health & beauty', 'Art & stationery', 'Coffee to go', 'Sweets & snacks', 'Cards & gifts', 'Church Street, Ballymena'];

function Row() {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap px-5 font-display text-[20px] font-black uppercase tracking-wide sm:text-[24px]">
          <svg width="22" height="18" viewBox="0 0 22 18" className="mr-5 text-leaf" aria-hidden="true">
            <path d="M2 10l6 6L20 2" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Ticker({ tone = 'sun' }: { tone?: 'sun' | 'ink' }) {
  return (
    <div className={`overflow-hidden py-4 ${tone === 'sun' ? 'bg-sun text-ink' : 'bg-ink text-white'}`}>
      <p className="sr-only">Big brands and small prices: toys, household, health and beauty, art and stationery, coffee to go, sweets, cards and gifts.</p>
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
