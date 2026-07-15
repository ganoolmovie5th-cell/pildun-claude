'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { teams } from '@/lib/data';
import Crest from './Crest';

function search(q: string) {
  if (!q.trim()) return [];
  const lower = q.toLowerCase();
  return teams
    .filter((t) => t.name.toLowerCase().includes(lower) || t.code.toLowerCase().includes(lower))
    .slice(0, 8);
}

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const results = search(query);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!open) return null;

  function go(code: string) {
    router.push(`/teams/${code}`);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-bg/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg card rounded-xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-line">
          <span className="text-text-dim">{'\u{1F50D}'}</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari tim..."
            className="flex-1 bg-transparent text-text placeholder-text-dim text-sm outline-none"
          />
          <kbd className="text-[10px] text-text-dim card px-1.5 py-0.5 rounded">Esc</kbd>
        </div>

        {query.trim() ? (
          <div className="max-h-80 overflow-y-auto">
            {results.length === 0 ? (
              <p className="text-sm text-text-dim text-center py-8">Tidak ada tim untuk &ldquo;{query}&rdquo;</p>
            ) : (
              results.map((t) => (
                <button key={t.code} onClick={() => go(t.code)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-2 transition-colors text-left">
                  <Crest src={t.crest} alt={t.name} size={24} />
                  <span className="text-sm font-medium text-text flex-1">{t.name}</span>
                  <span className="text-[11px] text-text-dim card px-2 py-0.5 rounded">Grup {t.group}</span>
                </button>
              ))
            )}
          </div>
        ) : (
          <p className="text-xs text-text-dim text-center py-6">Ketik nama negara peserta Piala Dunia 2026</p>
        )}
      </div>
    </div>
  );
}
