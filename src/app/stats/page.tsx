import { Metadata } from 'next';
import { getTopScorers, getTopAssists, players } from '@/lib/data';
import StatLeaders from '@/components/StatLeaders';

export const metadata: Metadata = {
  title: 'Statistik Pemain',
  description: 'Top skor, assist terbanyak, dan kartu kuning di Piala Dunia 2026.',
};

export default function StatsPage() {
  const scorers = getTopScorers(15);
  const assists = getTopAssists(15);
  const cards = [...players].sort((a, b) => b.yellowCards - a.yellowCards).slice(0, 15);

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Statistik Pemain</h1>
        <p className="text-text-muted">Pencetak gol, assist, dan kartu terbanyak sepanjang turnamen.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <StatLeaders title="Top Skor" players={scorers} metric="goals" />
        <StatLeaders title="Assist Terbanyak" players={assists} metric="assists" />
        <StatLeaders title="Kartu Kuning" players={cards} metric="yellowCards" />
      </div>
    </div>
  );
}
