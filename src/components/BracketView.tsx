import { Stage, getMatchesByStage, getTeamByCode, getChampion, STAGE_LABELS, Match } from '@/lib/data';
import Crest from './Crest';

const ROUNDS: Stage[] = ['round32', 'round16', 'quarter', 'semi', 'final'];

function Row({ crest, name, score, win, decided }: { crest: string; name: string; score: number | null; win: boolean; decided: boolean }) {
  return (
    <div className={`relative flex items-center gap-2 px-3 py-2 transition-colors ${win ? 'bg-accent/12' : ''}`}>
      {win && <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent" />}
      <Crest src={crest} alt={name} size={20} />
      <span className={`text-xs truncate flex-1 ${win ? 'font-bold text-text' : decided ? 'font-medium text-text-dim' : 'font-medium text-text-muted'}`}>
        {name}
      </span>
      {win && <span className="text-accent text-[10px]">{'\u2713'}</span>}
      <span className={`score-num text-sm tabular-nums w-4 text-right ${win ? 'text-accent' : 'text-text-dim'}`}>
        {score === null ? '\u2013' : score}
      </span>
    </div>
  );
}

function BracketMatch({ match }: { match: Match }) {
  const home = getTeamByCode(match.home);
  const away = getTeamByCode(match.away);
  if (!home || !away) return null;
  const hs = match.homeScore;
  const as = match.awayScore;
  const decided = hs !== null && as !== null;
  const homeWin = decided && hs > as;
  const awayWin = decided && as > hs;

  return (
    <div className="relative flex items-center">
      <div className={`card rounded-lg overflow-hidden w-56 shrink-0 ${decided ? '' : 'border-dashed border-line/70'}`}>
        <Row crest={home.crest} name={home.name} score={hs} win={homeWin} decided={decided} />
        <div className="h-px bg-line/70" />
        <Row crest={away.crest} name={away.name} score={as} win={awayWin} decided={decided} />
      </div>
      <span className="hidden lg:block w-6 h-px bg-line shrink-0" />
    </div>
  );
}

export default function BracketView() {
  const champion = getChampion();

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex gap-3 min-w-max items-stretch">
        {ROUNDS.map((stage) => {
          const stageMatches = getMatchesByStage(stage);
          return (
            <div key={stage} className="flex flex-col">
              <div className="flex items-center gap-2 justify-center mb-4 px-2">
                <span className="w-1 h-4 accent-bar rounded-full" />
                <p className="text-[11px] uppercase tracking-wider text-text-dim font-bold whitespace-nowrap">
                  {STAGE_LABELS[stage]}
                </p>
              </div>
              <div className="flex flex-col justify-around gap-3 flex-1">
                {stageMatches.map((match) => <BracketMatch key={match.id} match={match} />)}
              </div>
            </div>
          );
        })}

        <div className="flex flex-col">
          <div className="flex items-center gap-2 justify-center mb-4 px-2">
            <span className="w-1 h-4 rounded-full" style={{ background: 'var(--color-gold)' }} />
            <p className="text-[11px] uppercase tracking-wider font-bold whitespace-nowrap" style={{ color: 'var(--color-gold)' }}>Juara</p>
          </div>
          <div className="flex-1 flex items-center">
            {champion ? (
              <div className="card rounded-lg w-48 shrink-0 p-5 text-center" style={{ borderColor: 'var(--color-gold)' }}>
                <span className="text-2xl block mb-2">{'\u{1F3C6}'}</span>
                <Crest src={champion.crest} alt={champion.name} size={48} />
                <p className="font-display font-bold text-lg mt-2">{champion.name}</p>
              </div>
            ) : (
              <div className="card rounded-lg border-dashed border-line/70 w-48 shrink-0 p-5 text-center">
                <span className="text-2xl block mb-2 opacity-40">{'\u{1F3C6}'}</span>
                <p className="text-xs text-text-dim">Menanti hasil final</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
