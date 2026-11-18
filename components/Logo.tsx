// Placeholder wordmark until Pat sends the Value World logo file.
// To swap: put the logo in /public/logo.svg and replace this with <img src="/logo.svg" alt="Value World" />.
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className={`grid h-10 w-10 place-items-center rounded-xl font-display text-xl font-black ${
          light ? 'bg-white text-brand' : 'bg-brand text-white'
        }`}
      >
        V
      </span>
      <span className="leading-none">
        <span className={`block font-display text-[22px] font-black tracking-tight ${light ? 'text-white' : 'text-brand'}`}>
          Value World
        </span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.18em] ${light ? 'text-white/75' : 'text-ink-faint'}`}>
          Ballymena
        </span>
      </span>
    </span>
  );
}
