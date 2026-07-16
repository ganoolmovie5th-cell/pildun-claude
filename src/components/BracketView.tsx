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

function MatchCard({ match }: { match: Match }) {
  const home = getTeamByCode(match.home);
  const away = getTeamByCode(match.away);
  if (!home || !away) return null;
  const hs = match.homeScore;
  const as = match.awayScore;
  const decided = hs !== null && as !== null;
  return (
    <div className={`card rounded-lg overflow-hidden w-56 ${decided ? '' : 'border-dashed border-line/70'}`}>
      <Row crest={home.crest} name={home.name} score={hs} win={decided && hs > as} decided={decided} />
      <div className="h-px bg-line/70" />
      <Row crest={away.crest} name={away.name} score={as} win={decided && as > hs} decided={decided} />
    </div>
  );
}

function chunk2<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}

export default function BracketView() {
  const champion = getChampion();

  return (
    <div className="overflow-x-auto pb-4">
      <div className="flex min-w-max items-stretch">
        {ROUNDS.map((stage, idx) => {
          const stageMatches = getMatchesByStage(stage);
          const isFinal = idx === ROUNDS.length - 1;

          return (
            <div key={stage} className="flex flex-col">
              <div className="flex items-center gap-2 justify-center mb-4 px-2 h-6">
                <span className="w-1 h-4 accent-bar rounded-full" />
                <p className="text-[11px] uppercase tracking-wider text-text-dim font-bold whitespace-nowrap">
                  {STAGE_LABELS[stage]}
                </p>
              </div>

              <div className="flex flex-col justify-around flex-1">
                {isFinal
                  ? stageMatches.map((m) => (
                      <div key={m.id} className="flex items-center">
                        <MatchCard match={m} />
                        <span className="hidden lg:block w-6 h-0.5 bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                      </div>
                    ))
                  : chunk2(stageMatches).map((pair, i) => (
                      <div key={i} className="flex-1 flex items-stretch">
                        {/* dua match, terisi 25% & 75% slot */}
                        <div className="flex-1 flex flex-col justify-around">
                          {pair.map((m) => <MatchCard key={m.id} match={m} />)}
                        </div>
                        {/* connector: vertical join + horizontal keluar, menyala */}
                        <div className="relative w-6 hidden lg:block shrink-0">
                          <span className="absolute left-0 top-1/4 bottom-1/4 w-0.5 bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                          <span className="absolute left-0 right-0 top-1/2 h-0.5 bg-accent shadow-[0_0_8px_var(--color-accent)]" />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          );
        })}

        {/* Kolom Juara */}
        <div className="flex flex-col pl-2">
          <div className="flex items-center gap-2 justify-center mb-4 px-2 h-6">
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
