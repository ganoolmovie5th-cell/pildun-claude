import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profil & Skuad 48 Tim',
  description:
    'Profil lengkap 48 tim peserta Piala Dunia FIFA 2026 beserta skuad pemain, dikelompokkan per grup A sampai L.',
  alternates: { canonical: '/teams' },
};

export default function TeamsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
