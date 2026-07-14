'use client';

import { useState, useMemo } from 'react';
import { matches } from '@/lib/data';
import MatchCard from '@/components/MatchCard';

const STAGE_FILTERS: { value: string; label: string }[] = [
  { value: '', label: 'Semua' },
  { value: 'group', label: 'Fase Grup' },
  { value: 'round32', label: '32 Besar' },
  { value: 'round16', label: '16 Besar' },
  { value: 'quarter', label: 'Perempat' },
  { value: 'semi', label: 'Semifinal' },
  { value: 'final', label: 'Final' },
];

export default function MatchesPage() {
  const [stage, setStage] = useState<string>('');

  const filtered = useMemo(() => {
    const list = stage ? matches.filter((m) => m.stage === stage) : matches;
    return [...list].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [stage]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Pertandingan</h1>
        <p className="text-text-muted">104 pertandingan Piala Dunia 2026, dari fase grup hingga final.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {STAGE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStage(f.value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium uppercase tracking-wide transition-all active:scale-95 ${
              stage === f.value ? 'bg-accent text-white' : 'card card-hover text-text-muted'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mb-4 text-sm text-text-dim tnum">Menampilkan {filtered.length} pertandingan</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((match) => <MatchCard key={match.id} match={match} />)}
      </div>
    </div>
  );
}
