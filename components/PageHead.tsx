export default function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-brand text-white">
      <div className="dots absolute inset-0 -z-10 opacity-50" />
      <div className="absolute -right-32 -top-48 -z-10 h-[420px] w-[420px] rounded-full bg-brand-logo" />
      <img src="/logo.png" alt="" aria-hidden="true" className="absolute -bottom-16 right-[6%] -z-10 hidden h-56 w-56 rotate-12 opacity-90 lg:block" />
      <div className="wrap py-14 sm:py-20">
        <p className="inline-flex animate-rise rounded-full bg-white/10 px-4 py-2 font-display text-[13px] font-extrabold uppercase tracking-[0.14em] ring-1 ring-white/25">
          {eyebrow}
        </p>
        <h1 className="mt-5 max-w-3xl animate-rise text-[44px] font-black leading-[0.98] tracking-tight text-white [animation-delay:.08s] sm:text-[64px]">
          {title}
        </h1>
        {intro && <p className="mt-5 max-w-2xl animate-rise text-lg leading-relaxed text-white/90 [animation-delay:.16s]">{intro}</p>}
      </div>
    </section>
  );
}
