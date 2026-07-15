'use client';

import { useState } from 'react';
import { teams, GROUPS } from '@/lib/data';
import TeamCard from '@/components/TeamCard';

export default function TeamsPage() {
  const [group, setGroup] = useState<string>('');

  const shown = group ? GROUPS.filter((g) => g === group) : GROUPS;

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">48 Tim Peserta</h1>
        <p className="text-text-muted">Edisi pertama dengan 48 tim. Klik tim untuk lihat skuad, jadwal, dan hasil.</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button onClick={() => setGroup('')}
          className={`px-4 py-1.5 rounded-md text-sm font-medium uppercase tracking-wide transition-all active:scale-95 ${
            group === '' ? 'bg-accent text-white' : 'card card-hover text-text-muted'
          }`}>
          Semua
        </button>
        {GROUPS.map((g) => (
          <button key={g} onClick={() => setGroup(g)}
            className={`px-4 py-1.5 rounded-md text-sm font-medium uppercase tracking-wide transition-all active:scale-95 ${
              group === g ? 'bg-accent text-white' : 'card card-hover text-text-muted'
            }`}>
            Grup {g}
          </button>
        ))}
      </div>

      <div className="space-y-8">
        {shown.map((g) => (
          <div key={g}>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-1 h-5 accent-bar rounded-full" />
              <h2 className="font-display font-bold text-lg uppercase">Grup {g}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {teams.filter((t) => t.group === g).map((t) => <TeamCard key={t.code} team={t} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
