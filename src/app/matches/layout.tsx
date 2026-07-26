import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jadwal & Hasil 104 Pertandingan',
  description:
    'Jadwal dan hasil lengkap 104 pertandingan Piala Dunia FIFA 2026, dari fase grup sampai final. Filter per babak, konversi zona waktu WIB/WITA/WIT.',
  alternates: { canonical: '/matches' },
};

export default function MatchesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
