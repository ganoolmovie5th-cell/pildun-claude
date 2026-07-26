import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Prediksi Skor & Pilih Juara',
  description:
    'Buat prediksi skor tiap pertandingan Piala Dunia FIFA 2026 dan pilih tim juara favoritmu. Prediksi tersimpan di perangkat kamu.',
  alternates: { canonical: '/prediksi' },
};

export default function PrediksiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
