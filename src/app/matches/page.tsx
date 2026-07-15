'use client';

import { useState, useMemo } from 'react';
import { matches } from '@/lib/data';
import MatchCard from '@/components/MatchCard';

const STAGE_FILTERS: { value: string; label: string }[] = [
  { value: '', label: 'Semua' },
  { value: 'live', label: '\u25cf Live' },
  { value: 'group', label: 'Fase Grup' },
  { value: 'round32', label: '32 Besar' },
  { value: 'round16', label: '16 Besar' },
  { value: 'quarter', label: 'Perempat' },
  { value: 'semi', label: 'Semifinal' },
  { value: 'final', label: 'Final' },
];

export default function MatchesPage() {
  const [stage, setStage] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const dates = useMemo(() => [...new Set(matches.map((m) => m.date))].sort(), []);

  const filtered = useMemo(() => {
    let list = matches;
    if (stage === 'live') list = list.filter((m) => m.status === 'live');
    else if (stage) list = list.filter((m) => m.stage === stage);
    if (date) list = list.filter((m) => m.date === date);
    return [...list].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
  }, [stage, date]);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Pertandingan</h1>
        <p className="text-text-muted">102 pertandingan Piala Dunia 2026, dari fase grup hingga final.</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {STAGE_FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setStage(f.value)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium uppercase tracking-wide transition-all active:scale-95 ${
              stage === f.value
                ? 'bg-accent text-white'
                : f.value === 'live' ? 'card card-hover text-accent' : 'card card-hover text-text-muted'
            }`}
          >
            {f.label}
          </button>
        ))}

        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="card rounded-md px-3 py-1.5 text-sm text-text-muted focus:outline-none focus:ring-2 focus:ring-accent/40 ml-auto"
        >
          <option value="">Semua Tanggal</option>
          {dates.map((d) => (
            <option key={d} value={d}>
              {new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 flex items-center gap-3 text-sm text-text-dim tnum">
        <span>Menampilkan {filtered.length} pertandingan</span>
        {(stage || date) && (
          <button onClick={() => { setStage(''); setDate(''); }} className="text-accent hover:underline">
            reset filter
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((match) => <MatchCard key={match.id} match={match} />)}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-text-muted">Tidak ada pertandingan untuk filter ini.</div>
      )}
    </div>
  );
}
