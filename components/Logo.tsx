// The Value World logo (public/logo.png, cut from the round badge Pat supplied).
export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-3">
      <img src="/logo.png" alt="Value World" width={60} height={60} className="h-[60px] w-[60px] shrink-0" />
      <span className={`text-[11px] font-bold uppercase tracking-[0.2em] ${light ? 'text-white/75' : 'text-ink-faint'}`}>
        Ballymena
      </span>
    </span>
  );
}
