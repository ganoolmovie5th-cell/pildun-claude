import { Stage, getMatchesByStage, getTeamByCode, STAGE_LABELS, Match } from '@/lib/data';
import Crest from './Crest';

const ROUNDS: Stage[] = ['round32', 'round16', 'quarter', 'semi', 'final'];

function BracketMatch({ match }: { match: Match }) {
  const home = getTeamByCode(match.home);
  const away = getTeamByCode(match.away);
  if (!home || !away) return null;
  const hs = match.homeScore;
  const as = match.awayScore;
  const homeWin = hs !== null && as !== null && hs > as;
  const awayWin = hs !== null && as !== null && as > hs;

  return (
    <div className="card rounded-md overflow-hidden w-52 shrink-0">
      <Row crest={home.crest} name={home.name} score={hs} win={homeWin} />
      <div className="h-px bg-line" />
      <Row crest={away.crest} name={away.name} score={as} win={awayWin} />
    </div>
  );
}

function Row({ crest, name, score, win }: { crest: string; name: string; score: number | null; win: boolean }) {
  return (
    <div className={`flex items-center gap-2 px-2.5 py-1.5 ${win ? 'bg-accent/10' : ''}`}>
      <Crest src={crest} alt={name} size={18} />
      <span className={`text-xs font-medium truncate flex-1 ${win ? 'text-text' : 'text-text-muted'}`}>{name}</span>
      <span className={`score-num text-sm tabular-nums ${win ? 'text-accent' : 'text-text-dim'}`}>{score === null ? '\u2013' : score}</span>
    </div>
  );
}

export default function BracketView() {
  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-6 min-w-max">
        {ROUNDS.map((stage) => {
          const stageMatches = getMatchesByStage(stage);
          return (
            <div key={stage} className="flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-wide text-text-dim font-semibold text-center">
                {STAGE_LABELS[stage]}
              </p>
              <div className="flex flex-col justify-around gap-4 flex-1">
                {stageMatches.map((match) => <BracketMatch key={match.id} match={match} />)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
