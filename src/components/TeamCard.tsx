import Link from 'next/link';
import { Team } from '@/lib/data';
import Crest from './Crest';

export default function TeamCard({ team }: { team: Team }) {
  return (
    <Link href={`/teams/${team.code}`} className="block group">
      <div className="card card-hover rounded-lg p-4 flex items-center gap-3">
        <Crest src={team.crest} alt={team.name} size={34} />
        <div className="min-w-0 flex-1">
          <p className="font-semibold truncate group-hover:text-accent transition-colors">{team.name}</p>
          <p className="text-xs text-text-dim">Grup {team.group}</p>
        </div>
        <span className="text-[11px] text-text-dim tnum shrink-0">{team.code}</span>
      </div>
    </Link>
  );
}
