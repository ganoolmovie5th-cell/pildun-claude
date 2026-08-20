# Piala Dunia 2026

Website hasil Piala Dunia FIFA 2026 (USA, Meksiko, Kanada) terlengkap. Klasemen, bracket knockout, 104 pertandingan, dan statistik pemain. Data auto-generated dari football-data.org API.

**Tech Stack:** Next.js 16 · TypeScript · Tailwind CSS 4 · Vercel

**Live:** [piala-dunia.web.id](https://www.piala-dunia.web.id)

## Features

- Beranda (hero broadcast, hasil terbaru, top skor, juara)
- 104 pertandingan (filter per babak/tanggal/LIVE)
- Detail match (scoreboard, countdown, prediksi skor, head-to-head)
- Klasemen 12 grup (dihitung otomatis dari hasil)
- Bracket knockout (32 besar hingga final)
- Jalur ke Final (perjalanan knockout tiap tim)
- Timeline harian (rekap hari demi hari)
- 16 stadion tuan rumah (kota, kapasitas, negara)
- 48 tim (filter per grup, detail + grafik momentum)
- Bandingkan Tim (statistik side-by-side)
- Statistik pemain (top skor, assist, penalti + Golden Boot/Ball)
- Balapan Golden Boot (bar chart animasi)
- Filter zona waktu (WIB/WITA/WIT/Lokal)
- Prediksi + poin (tebak skor, leaderboard)
- Pencarian tim (Cmd/Ctrl+K)
- Dark/Light mode
- Badge LIVE + skeleton loader
- Confetti saat juara ditentukan
- Auto-refresh data (GitHub Actions tiap 3 jam)
- SEO (sitemap.xml, robots.txt)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  app/
    page.tsx              → Beranda
    matches/              → Daftar pertandingan
    groups/               → Klasemen grup
    bracket/              → Bracket knockout
    stats/                → Statistik pemain
    teams/                → Grid 48 tim + detail [code]
  components/             → Navbar, Footer, MatchCard, GroupTable, BracketView, dll
  lib/
    data.ts               → AUTO-GENERATED (48 tim, 104 match, players)
scripts/
  fetch-data.mjs          → Generator data dari football-data.org
```

## Update Data

```bash
FOOTBALL_DATA_TOKEN=your_token node scripts/fetch-data.mjs
```

Auto-refresh via GitHub Actions (tiap 3 jam). Setup secret `FOOTBALL_DATA_TOKEN` di repo settings.

## License

MIT
