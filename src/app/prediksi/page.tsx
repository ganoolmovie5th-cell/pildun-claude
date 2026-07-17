'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { matches, getTeamByCode } from '@/lib/data';
import ChampionPicker from '@/components/ChampionPicker';

interface Row {
  matchId: string;
  home: string;
  away: string;
  predHome: number;
  predAway: number;
  actHome: number;
  actAway: number;
  points: number;
}

function outcome(h: number, a: number) {
  return h > a ? 'H' : h < a ? 'A' : 'D';
}

export default function PrediksiPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const out: Row[] = [];
    for (const m of matches) {
      if (m.status !== 'finished' || m.homeScore === null || m.awayScore === null) continue;
      const raw = localStorage.getItem(`pred:${m.id}`);
      if (!raw) continue;
      const p = JSON.parse(raw);
      const pts = p.home === m.homeScore && p.away === m.awayScore
        ? 3
        : outcome(p.home, p.away) === outcome(m.homeScore, m.awayScore) ? 1 : 0;
      out.push({
        matchId: m.id, home: m.home, away: m.away,
        predHome: p.home, predAway: p.away,
        actHome: m.homeScore, actAway: m.awayScore, points: pts,
      });
    }
    setRows(out);
    setLoaded(true);
  }, []);

  const total = rows.reduce((s, r) => s + r.points, 0);
  const exact = rows.filter((r) => r.points === 3).length;

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Poin Prediksi Kamu</h1>
        <p className="text-text-muted">Prediksi disimpan di browser ini. Skor pas +3, tebak hasil benar +1.</p>
      </div>

      <div className="mb-8"><ChampionPicker /></div>

      {!loaded ? (
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[0, 1, 2].map((i) => <div key={i} className="card rounded-lg h-20 skeleton" />)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <Stat value={String(total)} label="Total Poin" gold />
            <Stat value={String(rows.length)} label="Diprediksi" />
            <Stat value={String(exact)} label="Skor Tepat" />
          </div>

          {rows.length === 0 ? (
            <div className="card rounded-lg p-8 text-center">
              <p className="text-text-muted mb-3">Belum ada prediksi yang selesai dinilai.</p>
              <Link href="/matches" className="text-accent hover:underline text-sm uppercase tracking-wide">Prediksi match {'\u2192'}</Link>
            </div>
          ) : (
            <div className="card rounded-lg overflow-hidden">
              {rows.map((r) => {
                const h = getTeamByCode(r.home);
                const a = getTeamByCode(r.away);
                const c = r.points === 3 ? 'text-pitch' : r.points === 1 ? 'text-gold' : 'text-text-dim';
                return (
                  <Link key={r.matchId} href={`/matches/${r.matchId}`}
                    className="flex items-center gap-3 px-4 py-3 border-b border-line/50 last:border-0 hover:bg-surface-2 transition-colors">
                    <div className="flex-1 min-w-0 text-sm">
                      <span className="truncate">{h?.name} vs {a?.name}</span>
                      <span className="text-text-dim ml-2 text-xs">
                        tebak {r.predHome}-{r.predAway} {'\u00b7'} hasil {r.actHome}-{r.actAway}
                      </span>
                    </div>
                    <span className={`score-num text-lg shrink-0 ${c}`}>+{r.points}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function Stat({ value, label, gold }: { value: string; label: string; gold?: boolean }) {
  return (
    <div className="card rounded-lg p-4 text-center">
      <p className="score-num text-3xl" style={gold ? { color: 'var(--color-gold)' } : undefined}>{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-text-dim mt-0.5">{label}</p>
    </div>
  );
}
