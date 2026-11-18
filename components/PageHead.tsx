export default function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="bg-paper-warm">
      <div className="wrap py-12 sm:py-16">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-[40px] font-black leading-[1.02] tracking-tight sm:text-[56px]">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
      </div>
    </section>
  );
}
