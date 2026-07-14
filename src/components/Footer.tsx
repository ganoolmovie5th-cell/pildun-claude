import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-elevated mt-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="w-1.5 h-6 accent-bar rounded-full" />
              <span className="font-display font-bold text-base">PIALA DUNIA <span className="text-accent">2026</span></span>
            </div>
            <p className="text-sm text-text-muted max-w-sm">
              Hasil, klasemen, bracket, dan statistik Piala Dunia FIFA 2026 di USA, Meksiko, dan Kanada.
            </p>
          </div>
          <div className="flex gap-10 text-sm">
            <div className="flex flex-col gap-2">
              <span className="text-text-dim uppercase text-xs tracking-wide font-semibold">Jelajah</span>
              <Link href="/matches" className="text-text-muted hover:text-text">Pertandingan</Link>
              <Link href="/groups" className="text-text-muted hover:text-text">Grup</Link>
              <Link href="/bracket" className="text-text-muted hover:text-text">Bracket</Link>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-text-dim uppercase text-xs tracking-wide font-semibold">Data</span>
              <Link href="/teams" className="text-text-muted hover:text-text">48 Tim</Link>
              <Link href="/stats" className="text-text-muted hover:text-text">Top Skor</Link>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-line text-xs text-text-dim">
          Data statis untuk tujuan informasi. Skor placeholder, diperbarui manual saat hasil resmi keluar.
        </div>
      </div>
    </footer>
  );
}
