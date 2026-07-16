import type { Metadata } from 'next';
import { Oswald, Barlow } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ClientShell from '@/components/ClientShell';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/next';

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${oswald.variable} ${barlow.variable}`}>
      <head>
        <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W7S5MNDD');`}</Script>
      </head>
      <body className="min-h-screen flex flex-col">
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-W7S5MNDD"
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }} /></noscript>
        <ClientShell>{children}</ClientShell>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
