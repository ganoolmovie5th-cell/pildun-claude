'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#f5c518', '#e11d2a', '#16a34a', '#0A3161', '#ffffff'];

export default function Confetti({ count = 80 }: { count?: number }) {
  const [show, setShow] = useState(true);
  // Generate posisi acak sekali saja — Math.random() tidak boleh dipanggil saat render
  const [pieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 2.5,
      dur: 2.5 + Math.random() * 2.5,
      color: COLORS[i % COLORS.length],
    })),
  );

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="confetti-piece rounded-sm"
          style={{
            left: `${p.left}%`,
            background: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
