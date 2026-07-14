import { Match, getTeamByCode, STAGE_LABELS, formatDateShort } from '@/lib/data';

export default function MatchCard({ match }: { match: Match }) {
  const home = getTeamByCode(match.home);
  const away = getTeamByCode(match.away);
  if (!home || !away) return null;

  const finished = match.status === 'finished' && match.homeScore !== null && match.awayScore !== null;
  const homeWin = finished && match.homeScore! > match.awayScore!;
  const awayWin = finished && match.awayScore! > match.homeScore!;

  return (
    <div className="card card-hover rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-line bg-bg-elevated">
        <span className="text-[11px] uppercase tracking-wide text-text-dim font-semibold">
          {STAGE_LABELS[match.stage]}{match.group ? ` \u00b7 Grup ${match.group}` : ''}
        </span>
        <span className="text-[11px] text-text-dim tnum">{formatDateShort(match.date)}</span>
      </div>

      <div className="px-4 py-3">
        <TeamRow flag={home.flag} name={home.name} score={match.homeScore} win={homeWin} dim={!finished} />
        <div className="my-1.5 h-px bg-line/60" />
        <TeamRow flag={away.flag} name={away.name} score={match.awayScore} win={awayWin} dim={!finished} />
      </div>

      <div className="px-4 py-1.5 border-t border-line flex items-center justify-between">
        <span className="text-[11px] text-text-dim truncate">{match.stadium}, {match.city}</span>
        {finished
          ? <span className="text-[10px] uppercase font-bold text-pitch tracking-wide">FT</span>
          : <span className="text-[10px] uppercase font-bold text-gold tracking-wide tnum">{match.time}</span>}
      </div>
    </div>
  );
}

function TeamRow({ flag, name, score, win, dim }: { flag: string; name: string; score: number | null; win: boolean; dim: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="text-xl leading-none shrink-0">{flag}</span>
        <span className={`text-sm font-medium truncate ${win ? 'text-text' : 'text-text-muted'}`}>{name}</span>
      </div>
      <span className={`score-num text-lg tabular-nums shrink-0 ${win ? 'text-accent' : dim ? 'text-text-dim' : 'text-text'}`}>
        {score === null ? '\u2013' : score}
      </span>
    </div>
  );
}
