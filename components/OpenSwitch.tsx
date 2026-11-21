'use client';

import { useEffect, useState, type ReactNode } from 'react';

// Shows `before` until the opening time, then `after`, with no rebuild needed.
// Flips live if someone has the page open at the moment the doors open.
export default function OpenSwitch({ at, before, after = null }: { at?: string; before: ReactNode; after?: ReactNode }) {
  const target = at ? Date.parse(at) : NaN;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    const left = target - Date.now();
    if (left <= 0) {
      setOpen(true);
      return;
    }
    // setTimeout can't wait longer than ~24 days; check again daily until then.
    const t = setTimeout(() => setOpen(Date.now() >= target), Math.min(left, 86_400_000));
    return () => clearTimeout(t);
  }, [target, open]);

  return <>{open ? after : before}</>;
}
