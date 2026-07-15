import { Metadata } from 'next';
import Link from 'next/link';
import { matches, getTeamByCode, STAGE_LABELS, Stage } from '@/lib/data';
import Crest from '@/components/Crest';

export const metadata: Metadata = {
  title: 'Jalur ke Final',
  description: 'Jalur menuju final Piala Dunia 2026 untuk tiap tim yang masih bertahan di babak knockout.',
};

const ORDER: Stage[] = ['round32', 'round16', 'quarter', 'semi', 'final'];

interface Path {
  code: string;
  matchesWon: typeof matches;
  reached: Stage;
  eliminated: boolean;
}

export default function RoadPage() {
  const knockout = matches.filter((m) => ORDER.includes(m.stage));

  const map = new Map<string, Path>();
  for (const m of knockout) {
    for (const code of [m.home, m.away]) {
      if (!map.has(code)) map.set(code, { code, matchesWon: [], reached: 'round32', eliminated: false });
    }
  }

  for (const m of knockout) {
    if (m.homeScore === null || m.awayScore === null) continue;
    const winner = m.homeScore > m.awayScore ? m.home : m.away;
    const loser = m.homeScore > m.awayScore ? m.away : m.home;
    const w = map.get(winner);
    const l = map.get(loser);
    if (w) { w.matchesWon.push(m); if (ORDER.indexOf(m.stage) >= ORDER.indexOf(w.reached)) w.reached = m.stage; }
    if (l) l.eliminated = true;
  }

  const alive = [...map.values()]
    .filter((p) => !p.eliminated)
    .sort((a, b) => ORDER.indexOf(b.reached) - ORDER.indexOf(a.reached) || a.code.localeCompare(b.code));

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Jalur ke Final</h1>
        <p className="text-text-muted">{alive.length} tim masih bertahan. Lihat perjalanan mereka di babak knockout.</p>
      </div>

      {alive.length === 0 ? (
        <p className="text-text-muted">Babak knockout belum dimulai.</p>
      ) : (
        <div className="space-y-4">
          {alive.map((p) => {
            const team = getTeamByCode(p.code);
            if (!team) return null;
            return (
              <div key={p.code} className="card rounded-lg p-5">
                <div className="flex items-center gap-3 mb-4">
                  <Crest src={team.crest} alt={team.name} size={32} />
                  <Link href={`/teams/${team.code}`} className="font-display font-bold text-lg hover:text-accent transition-colors">{team.name}</Link>
                  <span className="ml-auto text-[11px] uppercase tracking-wide text-pitch font-bold">
                    Lolos {STAGE_LABELS[p.reached]}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.matchesWon.sort((a, b) => ORDER.indexOf(a.stage) - ORDER.indexOf(b.stage)).map((m) => {
                    const opp = getTeamByCode(m.home === p.code ? m.away : m.home);
                    const ownScore = m.home === p.code ? m.homeScore : m.awayScore;
                    const oppScore = m.home === p.code ? m.awayScore : m.homeScore;
                    return (
                      <Link key={m.id} href={`/matches/${m.id}`}
                        className="bg-bg-elevated hover:bg-surface-2 rounded px-3 py-2 text-xs transition-colors">
                        <span className="text-text-dim uppercase tracking-wide block text-[10px] mb-0.5">{STAGE_LABELS[m.stage]}</span>
                        <span className="font-medium">v {opp?.name} </span>
                        <span className="score-num text-accent">{ownScore}-{oppScore}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
