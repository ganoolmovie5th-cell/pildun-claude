'use client';

import { useState, useMemo } from 'react';
import { teams, players, computeStandings, getTeamByCode } from '@/lib/data';
import Crest from '@/components/Crest';

interface TeamStat {
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
  goals: number;
  assists: number;
}

function statFor(code: string): TeamStat {
  const team = getTeamByCode(code);
  const row = team ? computeStandings(team.group).find((r) => r.team.code === code) : undefined;
  const teamPlayers = players.filter((p) => p.team === code);
  return {
    played: row?.played ?? 0,
    won: row?.won ?? 0,
    drawn: row?.drawn ?? 0,
    lost: row?.lost ?? 0,
    gf: row?.gf ?? 0,
    ga: row?.ga ?? 0,
    gd: row?.gd ?? 0,
    points: row?.points ?? 0,
    goals: teamPlayers.reduce((s, p) => s + p.goals, 0),
    assists: teamPlayers.reduce((s, p) => s + p.assists, 0),
  };
}

const ROWS: { key: keyof TeamStat; label: string; higher: boolean }[] = [
  { key: 'points', label: 'Poin', higher: true },
  { key: 'played', label: 'Main', higher: true },
  { key: 'won', label: 'Menang', higher: true },
  { key: 'drawn', label: 'Seri', higher: true },
  { key: 'lost', label: 'Kalah', higher: false },
  { key: 'gf', label: 'Gol Memasukkan', higher: true },
  { key: 'ga', label: 'Gol Kebobolan', higher: false },
  { key: 'gd', label: 'Selisih Gol', higher: true },
  { key: 'goals', label: 'Gol Pemain', higher: true },
  { key: 'assists', label: 'Assist Pemain', higher: true },
];

export default function ComparePage() {
  const sorted = useMemo(() => [...teams].sort((a, b) => a.name.localeCompare(b.name)), []);
  const [a, setA] = useState(sorted[0]?.code ?? '');
  const [b, setB] = useState(sorted[1]?.code ?? '');

  const teamA = getTeamByCode(a);
  const teamB = getTeamByCode(b);
  const statA = useMemo(() => statFor(a), [a]);
  const statB = useMemo(() => statFor(b), [b]);

  return (
    <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-6">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Bandingkan Tim</h1>
        <p className="text-text-muted">Adu statistik dua tim berdampingan: klasemen grup + kontribusi pemain.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <TeamPicker value={a} onChange={setA} teams={sorted} team={teamA} />
        <TeamPicker value={b} onChange={setB} teams={sorted} team={teamB} />
      </div>

      <div className="card rounded-lg overflow-hidden">
        {ROWS.map((r) => {
          const va = statA[r.key];
          const vb = statB[r.key];
          const aWin = va !== vb && (r.higher ? va > vb : va < vb);
          const bWin = va !== vb && (r.higher ? vb > va : vb < va);
          return (
            <div key={r.key} className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-line last:border-0">
              <div className={`score-num text-lg tabular-nums text-right px-4 py-2.5 ${aWin ? 'text-accent font-bold' : 'text-text-muted'}`}>{va}</div>
              <div className="text-[11px] uppercase tracking-wide text-text-dim text-center px-3 whitespace-nowrap">{r.label}</div>
              <div className={`score-num text-lg tabular-nums text-left px-4 py-2.5 ${bWin ? 'text-accent font-bold' : 'text-text-muted'}`}>{vb}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TeamPicker({ value, onChange, teams: list, team }: {
  value: string;
  onChange: (v: string) => void;
  teams: typeof teams;
  team: ReturnType<typeof getTeamByCode>;
}) {
  return (
    <div className="card rounded-lg p-4 flex flex-col items-center gap-3">
      {team && <Crest src={team.crest} alt={team.name} size={48} />}
      <span className="font-display font-bold text-base text-center truncate w-full">{team?.name ?? '-'}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="card rounded-md px-3 py-1.5 text-sm text-text-muted w-full focus:outline-none focus:ring-2 focus:ring-accent/40"
      >
        {list.map((t) => <option key={t.code} value={t.code}>{t.name}</option>)}
      </select>
    </div>
  );
}
