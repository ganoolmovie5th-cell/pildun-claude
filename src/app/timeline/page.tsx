import { Metadata } from 'next';
import { matches } from '@/lib/data';
import MatchCard from '@/components/MatchCard';

export const metadata: Metadata = {
  title: 'Timeline Turnamen',
  description: 'Kronologi lengkap pertandingan Piala Dunia 2026 hari demi hari.',
};

export default function TimelinePage() {
  const byDate = new Map<string, typeof matches>();
  for (const m of [...matches].sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time))) {
    if (!byDate.has(m.date)) byDate.set(m.date, []);
    byDate.get(m.date)!.push(m);
  }

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Timeline Turnamen</h1>
        <p className="text-text-muted">Kronologi pertandingan Piala Dunia 2026, hari demi hari.</p>
      </div>

      <div className="space-y-10">
        {[...byDate.entries()].map(([date, list]) => (
          <div key={date}>
            <div className="flex items-center gap-3 mb-4 sticky top-16 bg-bg/90 backdrop-blur-md py-2 z-10">
              <span className="w-1 h-6 accent-bar rounded-full" />
              <h2 className="font-display font-bold text-lg uppercase">
                {new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </h2>
              <span className="text-xs text-text-dim tnum">{list.length} match</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {list.map((m) => <MatchCard key={m.id} match={m} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
