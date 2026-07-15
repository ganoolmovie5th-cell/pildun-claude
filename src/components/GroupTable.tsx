import Link from 'next/link';
import { computeStandings } from '@/lib/data';
import Crest from './Crest';

export default function GroupTable({ group }: { group: string }) {
  const rows = computeStandings(group);

  return (
    <div className="card rounded-lg overflow-hidden">
      <div className="flex items-center gap-2.5 px-4 py-2.5 border-b border-line bg-bg-elevated">
        <span className="w-1 h-5 accent-bar rounded-full" />
        <h3 className="font-display font-bold text-base">GRUP {group}</h3>
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-[11px] uppercase tracking-wide text-text-dim border-b border-line">
            <th className="text-left font-semibold px-3 py-2">Tim</th>
            <th className="w-10 text-center font-semibold py-2">Main</th>
            <th className="w-8 text-center font-semibold py-2 hidden sm:table-cell">M</th>
            <th className="w-8 text-center font-semibold py-2 hidden sm:table-cell">S</th>
            <th className="w-8 text-center font-semibold py-2 hidden sm:table-cell">K</th>
            <th className="w-10 text-center font-semibold py-2">SG</th>
            <th className="w-12 text-center font-semibold py-2 text-text-muted">Poin</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.team.code} className={`border-b border-line/50 last:border-0 ${i < 2 ? 'bg-pitch/5' : ''}`}>
              <td className="px-3 py-2.5">
                <Link href={`/teams/${r.team.code}`} className="flex items-center gap-2.5 group">
                  <span className={`w-5 text-center text-xs font-bold tnum ${i < 2 ? 'text-pitch' : 'text-text-dim'}`}>{i + 1}</span>
                  <Crest src={r.team.crest} alt={r.team.name} size={20} />
                  <span className="font-medium group-hover:text-accent transition-colors truncate">{r.team.name}</span>
                </Link>
              </td>
              <td className="text-center tnum text-text-muted">{r.played}</td>
              <td className="text-center tnum text-text-muted hidden sm:table-cell">{r.won}</td>
              <td className="text-center tnum text-text-muted hidden sm:table-cell">{r.drawn}</td>
              <td className="text-center tnum text-text-muted hidden sm:table-cell">{r.lost}</td>
              <td className={`text-center tnum ${r.gd > 0 ? 'text-pitch' : r.gd < 0 ? 'text-text-dim' : 'text-text-muted'}`}>{r.gd > 0 ? '+' : ''}{r.gd}</td>
              <td className="text-center score-num text-base text-text">{r.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
