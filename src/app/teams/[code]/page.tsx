import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { teams, getTeamByCode, getMatchesByTeam, computeStandings, players, CONFED_LABELS } from '@/lib/data';
import MatchCard from '@/components/MatchCard';

export function generateStaticParams() {
  return teams.map((t) => ({ code: t.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const team = getTeamByCode(code);
  if (!team) return { title: 'Tim Tidak Ditemukan' };
  return {
    title: `${team.name} - Piala Dunia 2026`,
    description: `Jadwal, hasil, dan statistik ${team.name} di Piala Dunia 2026. Grup ${team.group}, ${CONFED_LABELS[team.confederation]}.`,
  };
}

export default async function TeamDetailPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const team = getTeamByCode(code);
  if (!team) notFound();

  const teamMatches = getMatchesByTeam(team.code);
  const standings = computeStandings(team.group);
  const rank = standings.findIndex((r) => r.team.code === team.code) + 1;
  const row = standings.find((r) => r.team.code === team.code);
  const teamPlayers = players.filter((p) => p.team === team.code).sort((a, b) => b.goals - a.goals);

  return (
    <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/teams" className="inline-flex items-center gap-2 text-text-muted hover:text-accent text-sm mb-6 uppercase tracking-wide transition-colors">
        {'\u2190'} Semua Tim
      </Link>

      <div className="card rounded-lg p-6 sm:p-8 mb-8 flex items-center gap-5">
        <span className="text-6xl sm:text-7xl leading-none">{team.flag}</span>
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase leading-none mb-2">{team.name}</h1>
          <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wide">
            <span className="card rounded px-2.5 py-1 text-text-muted">Grup {team.group}</span>
            <span className="card rounded px-2.5 py-1 text-text-muted">{CONFED_LABELS[team.confederation]}</span>
            <span className="card rounded px-2.5 py-1 text-text-muted tnum">Rank FIFA #{team.fifaRank}</span>
          </div>
        </div>
      </div>

      {row && (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
          <StatBox label="Posisi Grup" value={`#${rank}`} highlight={rank <= 2} />
          <StatBox label="Main" value={String(row.played)} />
          <StatBox label="Menang" value={String(row.won)} />
          <StatBox label="Seri" value={String(row.drawn)} />
          <StatBox label="Kalah" value={String(row.lost)} />
          <StatBox label="Poin" value={String(row.points)} />
        </div>
      )}

      {teamPlayers.length > 0 && (
        <div className="mb-8">
          <h2 className="font-display font-bold text-xl uppercase mb-3">Pemain Kunci</h2>
          <div className="card rounded-lg overflow-hidden">
            {teamPlayers.map((p) => (
              <div key={p.name} className="flex items-center gap-3 px-4 py-2.5 border-b border-line/50 last:border-0">
                <span className="font-medium flex-1">{p.name}</span>
                <span className="text-xs text-text-dim uppercase tracking-wide">{p.goals} Gol {'\u00b7'} {p.assists} Assist</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="font-display font-bold text-xl uppercase mb-3">Jadwal & Hasil</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teamMatches.map((match) => <MatchCard key={match.id} match={match} />)}
      </div>
    </div>
  );
}

function StatBox({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="card rounded-lg p-3 text-center">
      <p className={`score-num text-2xl ${highlight ? 'text-pitch' : 'text-text'}`}>{value}</p>
      <p className="text-[10px] uppercase tracking-wide text-text-dim mt-0.5">{label}</p>
    </div>
  );
}
