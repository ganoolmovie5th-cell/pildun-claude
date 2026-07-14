import { Player, getTeamByCode } from '@/lib/data';

type Metric = 'goals' | 'assists' | 'yellowCards';

export default function StatLeaders({ title, players, metric }: { title: string; players: Player[]; metric: Metric }) {
  return (
    <div className="card rounded-lg overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-line bg-bg-elevated">
        <span className="w-1 h-5 accent-bar rounded-full" />
        <h3 className="font-display font-bold text-base uppercase">{title}</h3>
      </div>
      <ul>
        {players.map((p, i) => {
          const team = getTeamByCode(p.team);
          return (
            <li key={p.name} className="flex items-center gap-3 px-4 py-2.5 border-b border-line/50 last:border-0">
              <span className={`w-5 text-center text-xs font-bold tnum ${i < 3 ? 'text-accent' : 'text-text-dim'}`}>{i + 1}</span>
              <span className="text-lg leading-none">{team?.flag}</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{p.name}</p>
                <p className="text-[11px] text-text-dim">{team?.name}</p>
              </div>
              <span className="score-num text-xl text-text tabular-nums">{p[metric]}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
