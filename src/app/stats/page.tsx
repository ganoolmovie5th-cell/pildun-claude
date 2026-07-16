'use client';

import { useState, useMemo } from 'react';
import { players, getTeamByCode, GROUPS } from '@/lib/data';
import StatLeaders from '@/components/StatLeaders';

export default function StatsPage() {
  const [group, setGroup] = useState<string>('');

  const filtered = useMemo(() => {
    if (!group) return players;
    return players.filter((p) => getTeamByCode(p.team)?.group === group);
  }, [group]);

  const scorers = [...filtered].sort((a, b) => b.goals - a.goals || b.assists - a.assists).slice(0, 15);
  const assists = [...filtered].sort((a, b) => b.assists - a.assists || b.goals - a.goals).slice(0, 15);
  const penalties = [...filtered].sort((a, b) => b.penalties - a.penalties).slice(0, 15);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Statistik Pemain</h1>
        <p className="text-text-muted">Pencetak gol, assist, dan penalti terbanyak sepanjang turnamen.</p>
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

      {filtered.length === 0 ? (
        <p className="text-text-muted text-center py-12">Belum ada statistik pemain untuk grup ini.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatLeaders title="Top Skor" players={scorers} metric="goals" />
          <StatLeaders title="Assist Terbanyak" players={assists} metric="assists" />
          <StatLeaders title="Gol Penalti" players={penalties} metric="penalties" />
        </div>
      )}
    </div>
  );
}
