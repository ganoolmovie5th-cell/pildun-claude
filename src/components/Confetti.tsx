'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#f5c518', '#e11d2a', '#16a34a', '#0A3161', '#ffffff'];

export default function Confetti({ count = 80 }: { count?: number }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 2.5;
        const dur = 2.5 + Math.random() * 2.5;
        const color = COLORS[i % COLORS.length];
        return (
          <span
            key={i}
            className="confetti-piece rounded-sm"
            style={{
              left: `${left}%`,
              background: color,
              animationDelay: `${delay}s`,
              animationDuration: `${dur}s`,
            }}
          />
        );
      })}
    </div>
  );
}
