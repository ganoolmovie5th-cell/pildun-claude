import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Statistik Pemain: Top Skor, Assist & Kartu',
  description:
    'Statistik pemain Piala Dunia FIFA 2026: pencetak gol terbanyak (Golden Boot), assist, kartu kuning dan merah. Filter per grup.',
  alternates: { canonical: '/stats' },
};

export default function StatsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
