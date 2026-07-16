'use client';

import { useEffect, useState } from 'react';

function diff(t: number) {
  const d = t - Date.now();
  if (d <= 0) return null;
  return {
    d: Math.floor(d / 86400000),
    h: Math.floor((d % 86400000) / 3600000),
    m: Math.floor((d % 3600000) / 60000),
    s: Math.floor((d % 60000) / 1000),
  };
}

export default function Countdown({ targetISO }: { targetISO: string }) {
  const target = new Date(targetISO).getTime();
  const [c, setC] = useState<ReturnType<typeof diff>>(null);

  useEffect(() => {
    setC(diff(target));
    const id = setInterval(() => setC(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (!c) return null;

  return (
    <div className="grid grid-cols-4 gap-1 mt-3">
      {[
        { v: c.d, l: 'Hari' },
        { v: c.h, l: 'Jam' },
        { v: c.m, l: 'Mnt' },
        { v: c.s, l: 'Dtk' },
      ].map(({ v, l }) => (
        <div key={l} className="bg-bg-elevated rounded py-1.5">
          <p className="score-num text-base tabular-nums" style={{ color: 'var(--color-gold)' }}>{String(v).padStart(2, '0')}</p>
          <p className="text-[9px] text-text-dim">{l}</p>
        </div>
      ))}
    </div>
  );
}
