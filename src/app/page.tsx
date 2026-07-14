import Link from 'next/link';
import { getChampion, getRecentResults, getTopScorers, matches, getMatchesByStage } from '@/lib/data';
import MatchCard from '@/components/MatchCard';
import StatLeaders from '@/components/StatLeaders';

export default function HomePage() {
  const champion = getChampion();
  const recent = getRecentResults(6);
  const topScorers = getTopScorers(5);
  const final = getMatchesByStage('final')[0];
  const totalFinished = matches.filter((m) => m.status === 'finished').length;

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://picsum.photos/seed/worldcup2026stadium/1600/900)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/90 to-bg/70" />

        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="inline-flex items-center gap-2 mb-5 rise">
            <span className="w-2 h-2 rounded-full bg-pitch animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-text-muted font-semibold">
              11 Juni {'\u2013'} 19 Juli 2026 {'\u00b7'} USA {'\u00b7'} Meksiko {'\u00b7'} Kanada
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] mb-4 rise rise-1">
            HASIL PIALA DUNIA
            <br />
            <span className="text-accent">FIFA 2026</span>
          </h1>

          <p className="text-base sm:text-lg text-text-muted max-w-xl mb-8 rise rise-2">
            Klasemen fase grup, bracket knockout, 104 pertandingan, dan statistik pemain. Semua hasil dalam satu tempat.
          </p>

          <div className="flex flex-wrap gap-3 rise rise-3">
            <Link href="/matches" className="bg-accent hover:bg-accent-hover active:scale-95 text-white font-semibold px-6 py-2.5 rounded-md text-sm uppercase tracking-wide transition-all">
              Lihat Semua Hasil
            </Link>
            <Link href="/bracket" className="card card-hover text-text font-medium px-6 py-2.5 rounded-md text-sm uppercase tracking-wide">
              Bracket Knockout
            </Link>
          </div>

          {champion && final && (
            <div className="mt-10 inline-flex items-center gap-4 card rounded-lg px-5 py-3 rise rise-4">
              <span className="text-[11px] uppercase tracking-widest text-gold font-bold">Juara</span>
              <span className="text-3xl leading-none">{champion.flag}</span>
              <span className="font-display font-bold text-2xl">{champion.name}</span>
            </div>
          )}
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-line bg-bg-elevated">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 divide-x divide-line">
          <Stat value="48" label="Tim" />
          <Stat value="104" label="Pertandingan" />
          <Stat value={String(totalFinished)} label="Selesai" />
          <Stat value="16" label="Stadion" />
        </div>
      </section>

      {/* RECENT RESULTS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-end justify-between mb-6">
          <h2 className="font-display font-bold text-2xl sm:text-3xl uppercase">Hasil Terbaru</h2>
          <Link href="/matches" className="text-sm text-accent hover:text-accent-hover font-medium uppercase tracking-wide">
            Semua {'\u2192'}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recent.map((match) => <MatchCard key={match.id} match={match} />)}
        </div>
      </section>

      {/* TOP SCORER + QUICK LINKS */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display font-bold text-2xl uppercase mb-6">Top Skor</h2>
          <StatLeaders title="Pencetak Gol Terbanyak" players={topScorers} metric="goals" />
        </div>
        <div>
          <h2 className="font-display font-bold text-2xl uppercase mb-6">Jelajahi</h2>
          <div className="grid grid-cols-2 gap-4">
            <QuickLink href="/groups" title="Klasemen Grup" desc="12 grup" />
            <QuickLink href="/bracket" title="Bracket" desc="32 besar ke final" />
            <QuickLink href="/teams" title="48 Tim" desc="Profil & skuad" />
            <QuickLink href="/stats" title="Statistik" desc="Gol, assist, kartu" />
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="py-6 text-center">
      <p className="score-num text-3xl sm:text-4xl text-accent">{value}</p>
      <p className="text-xs uppercase tracking-wide text-text-dim mt-1">{label}</p>
    </div>
  );
}

function QuickLink({ href, title, desc }: { href: string; title: string; desc: string }) {
  return (
    <Link href={href} className="card card-hover rounded-lg p-5 block">
      <p className="font-display font-bold text-lg uppercase">{title}</p>
      <p className="text-xs text-text-dim mt-1">{desc}</p>
    </Link>
  );
}
