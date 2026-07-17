'use client';

import { useState, useEffect } from 'react';
import { Player, getTeamByCode } from '@/lib/data';
import Crest from './Crest';

// Balapan Golden Boot: bar horizontal top skor, lebar animasi saat mount.
export default function GoldenBootRace({ players }: { players: Player[] }) {
  const [go, setGo] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  const top = [...players].sort((a, b) => b.goals - a.goals || b.assists - a.assists).slice(0, 10);
  const max = top[0]?.goals || 1;
  if (top.length === 0) return null;

  return (
    <div className="card rounded-lg p-5 mb-8">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-xl">{'\u{1F45F}'}</span>
        <h2 className="font-display font-bold text-lg uppercase">Balapan Golden Boot</h2>
      </div>
      <div className="space-y-2.5">
        {top.map((p, i) => {
          const team = getTeamByCode(p.team);
          const pct = go ? Math.max((p.goals / max) * 100, 6) : 0;
          return (
            <div key={`${p.name}-${p.team}`} className="flex items-center gap-3">
              <span className="score-num text-sm text-text-dim tabular-nums w-5 shrink-0 text-right">{i + 1}</span>
              <div className="flex items-center gap-1.5 w-32 sm:w-40 shrink-0 min-w-0">
                {team && <Crest src={team.crest} alt={team.name} size={16} />}
                <span className="text-sm font-medium truncate">{p.name}</span>
              </div>
              <div className="flex-1 h-6 rounded bg-bg-elevated overflow-hidden">
                <div
                  className="h-full rounded flex items-center justify-end px-2"
                  style={{
                    width: `${pct}%`,
                    background: 'linear-gradient(90deg, var(--color-accent), var(--color-gold))',
                    transition: 'width 900ms cubic-bezier(0.22,1,0.36,1)',
                    transitionDelay: `${i * 60}ms`,
                  }}
                >
                  <span className="score-num text-xs font-bold text-white tabular-nums">{p.goals}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
