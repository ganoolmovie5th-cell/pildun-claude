import Link from 'next/link';
import { Match, getTeamByCode, STAGE_LABELS, formatDateShort } from '@/lib/data';
import { formatTime, TIME_ZONES, TZKey } from '@/lib/time';
import Crest from './Crest';

export default function MatchCard({ match, tz = 'WIB' }: { match: Match; tz?: TZKey }) {
  const home = getTeamByCode(match.home);
  const away = getTeamByCode(match.away);
  if (!home || !away) return null;

  const finished = match.status === 'finished' && match.homeScore !== null && match.awayScore !== null;
  const live = match.status === 'live';
  const homeWin = finished && match.homeScore! > match.awayScore!;
  const awayWin = finished && match.awayScore! > match.homeScore!;

  return (
    <Link href={`/matches/${match.id}`} className="block">
      <div className="card card-hover rounded-lg overflow-hidden">
        <div className="flex items-center justify-between px-3 py-1.5 border-b border-line bg-bg-elevated">
          <span className="text-[11px] uppercase tracking-wide text-text-dim font-semibold">
            {STAGE_LABELS[match.stage]}{match.group ? ` \u00b7 Grup ${match.group}` : ''}
          </span>
          <span className="text-[11px] text-text-dim tnum">{formatDateShort(match.date)}</span>
        </div>

        <div className="px-4 py-3">
          <TeamRow crest={home.crest} name={home.name} score={match.homeScore} win={homeWin} dim={!finished} />
          <div className="my-1.5 h-px bg-line/60" />
          <TeamRow crest={away.crest} name={away.name} score={match.awayScore} win={awayWin} dim={!finished} />
        </div>

        <div className="px-4 py-1.5 border-t border-line flex items-center justify-end">
          {finished
            ? <span className="text-[10px] uppercase font-bold text-pitch tracking-wide">Selesai</span>
            : live
            ? <span className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-accent tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />Live
              </span>
            : <span className="text-[10px] uppercase font-bold text-gold tracking-wide tnum">{formatTime(match.date, match.time, tz)} {TIME_ZONES[tz].label}</span>}
        </div>
      </div>
    </Link>
  );
}

function TeamRow({ crest, name, score, win, dim }: { crest: string; name: string; score: number | null; win: boolean; dim: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5 min-w-0">
        <Crest src={crest} alt={name} size={22} />
        <span className={`text-sm font-medium truncate ${win ? 'text-text' : 'text-text-muted'}`}>{name}</span>
      </div>
      <span className={`score-num text-lg tabular-nums shrink-0 ${win ? 'text-accent' : dim ? 'text-text-dim' : 'text-text'}`}>
        {score === null ? '\u2013' : score}
      </span>
    </div>
  );
}
