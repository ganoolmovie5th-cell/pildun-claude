import Link from 'next/link';
import { Team, CONFED_LABELS } from '@/lib/data';

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/teams/${team.code}`} className="block group">
      <div className="card card-hover rounded-lg p-4 flex items-center gap-3">
        <span className="text-3xl leading-none shrink-0">{team.flag}</span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold truncate group-hover:text-accent transition-colors">{team.name}</p>
          <p className="text-xs text-text-dim">{CONFED_LABELS[team.confederation]} {'\u00b7'} Grup {team.group}</p>
        </div>
        <span className="text-[11px] text-text-dim tnum shrink-0">#{team.fifaRank}</span>
      </div>
    </Link>
  );
}
