import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bandingkan Tim Head-to-Head',
  description:
    'Bandingkan dua tim Piala Dunia FIFA 2026 secara head-to-head: rekor main, menang, gol, dan statistik pemain kunci.',
  alternates: { canonical: '/compare' },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
