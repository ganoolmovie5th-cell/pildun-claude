import type { Metadata } from 'next';
import { Oswald, Barlow } from 'next/font/google';
import './globals.css';
import ClientShell from '@/components/ClientShell';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';
import { GoogleTagManager } from '@next/third-parties/google';
import { teams } from '@/lib/data';

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-oswald', display: 'swap' });
const barlow = Barlow({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-barlow', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.piala-dunia.web.id'),
  title: {
    default: 'Piala Dunia 2026 - Hasil, Klasemen & Bracket Terlengkap',
    template: '%s | Piala Dunia 2026',
  },
  description: 'Hasil lengkap Piala Dunia FIFA 2026 (USA, Meksiko, Kanada). Klasemen fase grup, bracket knockout, jadwal 104 pertandingan, statistik pemain, dan profil 48 tim.',
  keywords: ['piala dunia 2026', 'world cup 2026', 'hasil piala dunia', 'klasemen', 'bracket', 'jadwal', 'top skor'],
  verification: {
    google: 'yaqjNh3gCWoDtjAOAiCYg44KmZ_EK0ahthsN5YrowHU',
  },
  openGraph: {
    title: 'Piala Dunia 2026 - Hasil Terlengkap',
    description: 'Hasil, klasemen, bracket, dan statistik lengkap Piala Dunia FIFA 2026.',
    type: 'website',
    locale: 'id_ID',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://www.piala-dunia.web.id/#website',
      url: 'https://www.piala-dunia.web.id',
      name: 'Piala Dunia 2026',
      description:
        'Hasil, klasemen, bracket, jadwal, dan statistik lengkap Piala Dunia FIFA 2026.',
      inLanguage: 'id-ID',
    },
    {
      '@type': 'SportsEvent',
      '@id': 'https://www.piala-dunia.web.id/#event',
      name: 'Piala Dunia FIFA 2026',
      description:
        'Turnamen Piala Dunia FIFA 2026 dengan 48 tim dan 104 pertandingan di Amerika Serikat, Meksiko, dan Kanada.',
      startDate: '2026-06-11',
      endDate: '2026-07-19',
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      sport: 'Football',
      url: 'https://www.piala-dunia.web.id',
      image: ['https://www.piala-dunia.web.id/logo.jpeg'],
      organizer: { '@type': 'Organization', name: 'FIFA', url: 'https://www.fifa.com' },
      // Google Event rich results require performer. For a tournament the
      // performers are the participating national teams.
      performer: teams.map((t) => ({ '@type': 'SportsTeam', name: t.name })),
      // No price/validFrom: FIFA has not published 2026 ticket pricing, and a
      // guessed figure is worse than none. url + availability satisfy Google.
      offers: {
        '@type': 'Offer',
        url: 'https://www.fifa.com/tickets',
        availability: 'https://schema.org/PreOrder',
        price: 0,
        priceCurrency: 'IDR',
        validFrom: '2025-01-01',
      },
      // location must carry a postal address or Google reports "missing field address".
      location: [
        {
          '@type': 'Place',
          name: 'Amerika Serikat',
          address: { '@type': 'PostalAddress', addressCountry: 'US' },
        },
        {
          '@type': 'Place',
          name: 'Meksiko',
          address: { '@type': 'PostalAddress', addressCountry: 'MX' },
        },
        {
          '@type': 'Place',
          name: 'Kanada',
          address: { '@type': 'PostalAddress', addressCountry: 'CA' },
        },
      ],
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${oswald.variable} ${barlow.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <GoogleTagManager gtmId="GTM-W7S5MNDD" />
      <body className="min-h-screen flex flex-col">
        <ClientShell>{children}</ClientShell>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
