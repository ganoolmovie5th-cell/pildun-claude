'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// Klasemen live-refresh: re-fetch server component tiap interval saat ada match live.
// ponytail: router.refresh() cukup — Next re-render RSC tanpa full reload.
export default function LiveRefresh({ intervalMs = 60000 }: { intervalMs?: number }) {
  const router = useRouter();
  const [last, setLast] = useState<Date>(() => new Date());

  useEffect(() => {
    const t = setInterval(() => {
      router.refresh();
      setLast(new Date());
    }, intervalMs);
    return () => clearInterval(t);
  }, [router, intervalMs]);

  const time = last.toLocaleTimeString('id-ID', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  return (
    <span className="inline-flex items-center gap-2 text-xs text-text-dim">
      <span className="w-2 h-2 rounded-full bg-pitch animate-pulse" />
      Auto-refresh {'\u00b7'} {time} WIB
    </span>
  );
}
