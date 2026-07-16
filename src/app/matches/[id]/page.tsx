import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { matches, getTeamByCode, STAGE_LABELS, formatDateShort } from '@/lib/data';
import { toWIB } from '@/lib/time';
import Crest from '@/components/Crest';
import MatchExtras from '@/components/MatchExtras';

export function generateStaticParams() {
  return matches.map((m) => ({ id: m.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);
  if (!match) return { title: 'Pertandingan Tidak Ditemukan' };
  const home = getTeamByCode(match.home);
  const away = getTeamByCode(match.away);
  return {
    title: `${home?.name} vs ${away?.name} - Piala Dunia 2026`,
    description: `Hasil ${home?.name} vs ${away?.name}, ${STAGE_LABELS[match.stage]} Piala Dunia 2026.`,
  };
}

export default async function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const match = matches.find((m) => m.id === id);
  if (!match) notFound();

  const home = getTeamByCode(match.home);
  const away = getTeamByCode(match.away);
  if (!home || !away) notFound();

  const finished = match.status === 'finished' && match.homeScore !== null && match.awayScore !== null;
  const live = match.status === 'live';
  const scheduled = match.status === 'scheduled';
  const kickoffISO = `${match.date}T${match.time}:00Z`;
  const dateFull = new Date(kickoffISO).toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
  });

  const h2h = matches.filter((m) =>
    m.id !== match.id && m.status === 'finished' &&
    ((m.home === match.home && m.away === match.away) || (m.home === match.away && m.away === match.home))
  );

  return (
    <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/matches" className="inline-flex items-center gap-2 text-text-muted hover:text-accent text-sm mb-6 uppercase tracking-wide transition-colors">
        {'\u2190'} Semua Pertandingan
      </Link>

      <div className="card rounded-lg overflow-hidden">
        <div className="flex items-center justify-center gap-2 px-4 py-2 border-b border-line bg-bg-elevated">
          <span className="text-xs uppercase tracking-wide text-text-dim font-semibold">
            {STAGE_LABELS[match.stage]}{match.group ? ` \u00b7 Grup ${match.group}` : ''}
          </span>
        </div>

        <div className="grid grid-cols-3 items-center gap-4 px-6 py-8">
          <Link href={`/teams/${home.code}`} className="flex flex-col items-center gap-3 group">
            <Crest src={home.crest} alt={home.name} size={64} />
            <span className="font-display font-bold text-lg text-center group-hover:text-accent transition-colors">{home.name}</span>
          </Link>

          <div className="text-center">
            {finished || live ? (
              <div className="score-num text-5xl tabular-nums">
                <span className={finished && match.homeScore! > match.awayScore! ? 'text-accent' : 'text-text'}>{match.homeScore}</span>
                <span className="text-text-dim mx-2">-</span>
                <span className={finished && match.awayScore! > match.homeScore! ? 'text-accent' : 'text-text'}>{match.awayScore}</span>
              </div>
            ) : (
              <div className="score-num text-3xl text-text-dim tabular-nums">{toWIB(match.date, match.time)}<span className="text-sm block text-text-dim">WIB</span></div>
            )}
            <span className={`inline-block mt-2 text-[10px] uppercase font-bold tracking-wide ${
              finished ? 'text-pitch' : live ? 'text-accent' : 'text-gold'
            }`}>
              {finished ? 'Selesai' : live ? 'Live' : 'Dijadwalkan'}
            </span>
          </div>

          <Link href={`/teams/${away.code}`} className="flex flex-col items-center gap-3 group">
            <Crest src={away.crest} alt={away.name} size={64} />
            <span className="font-display font-bold text-lg text-center group-hover:text-accent transition-colors">{away.name}</span>
          </Link>
        </div>

        <div className="px-6 py-4 border-t border-line text-center">
          <p className="text-sm text-text-muted">{dateFull}</p>
          <p className="text-xs text-text-dim mt-0.5">Kickoff {toWIB(match.date, match.time)} WIB</p>
        </div>
      </div>

      <MatchExtras matchId={match.id} home={home.name} away={away.name} kickoffISO={kickoffISO} scheduled={scheduled} finished={finished} actualHome={match.homeScore} actualAway={match.awayScore} />

      {h2h.length > 0 && (
        <div className="mt-6 card rounded-lg p-5">
          <p className="text-xs text-text-dim uppercase tracking-wide mb-3">Pertemuan Lain di Turnamen Ini</p>
          <ul className="space-y-2">
            {h2h.map((m) => {
              const h = getTeamByCode(m.home);
              const a = getTeamByCode(m.away);
              return (
                <li key={m.id}>
                  <Link href={`/matches/${m.id}`} className="flex items-center justify-between text-sm hover:text-accent transition-colors">
                    <span>{h?.name} <span className="score-num text-text">{m.homeScore} - {m.awayScore}</span> {a?.name}</span>
                    <span className="text-xs text-text-dim">{STAGE_LABELS[m.stage]} {'\u00b7'} {formatDateShort(m.date)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
