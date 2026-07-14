import { Metadata } from 'next';
import BracketView from '@/components/BracketView';
import MatchCard from '@/components/MatchCard';
import { getMatchesByStage, getChampion } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Bracket Knockout',
  description: 'Bracket lengkap babak gugur Piala Dunia 2026: 32 besar, 16 besar, perempat final, semifinal, hingga final.',
};

export default function BracketPage() {
  const thirdPlace = getMatchesByStage('third-place')[0];
  const champion = getChampion();

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Bracket Knockout</h1>
          <p className="text-text-muted">Dari 32 besar hingga final. Geser ke samping untuk melihat seluruh babak.</p>
        </div>
        {champion && (
          <div className="inline-flex items-center gap-3 card rounded-lg px-4 py-2.5">
            <span className="text-[11px] uppercase tracking-widest text-gold font-bold">Juara</span>
            <span className="text-2xl leading-none">{champion.flag}</span>
            <span className="font-display font-bold text-xl">{champion.name}</span>
          </div>
        )}
      </div>

      <BracketView />

      {thirdPlace && (
        <div className="mt-10 max-w-sm">
          <h2 className="font-display font-bold text-lg uppercase mb-3 text-text-muted">Perebutan Juara 3</h2>
          <MatchCard match={thirdPlace} />
        </div>
      )}
    </div>
  );
}
