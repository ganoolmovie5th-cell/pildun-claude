# ⚽ Piala Dunia 2026

Website hasil Piala Dunia FIFA 2026 (USA, Meksiko, Kanada) terlengkap. Klasemen, bracket knockout, 104 pertandingan, dan statistik pemain.

🌐 **Deploy:** Vercel

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 4
- **Font:** Oswald (display) + Barlow (body)
- **Deploy:** Vercel

## Fitur

- 🏠 **Beranda** — Hero broadcast, hasil terbaru, top skor, juara
- ⚽ **Pertandingan** — 104 match, filter per babak
- 📊 **Klasemen Grup** — 12 grup, klasemen dihitung otomatis dari hasil
- 🏆 **Bracket** — Knockout 32 besar hingga final
- 🌍 **Tim** — 48 negara + halaman detail (skuad, jadwal, statistik)
- 📈 **Statistik** — Top skor, assist, kartu kuning

## Format Turnamen

48 tim, 12 grup (@4 tim), 104 pertandingan. Top 2 tiap grup + 8 peringkat-3 terbaik → 32 besar → 16 → 8 → semifinal → final.

## Getting Started

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

## Build

```bash
npm run build
```

## Struktur Folder

```
pildun-claude/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Beranda
│   │   ├── layout.tsx            # Root layout (fonts, nav, footer)
│   │   ├── globals.css           # Design tokens + utilities
│   │   ├── matches/page.tsx      # Daftar pertandingan
│   │   ├── groups/page.tsx       # Klasemen grup
│   │   ├── bracket/page.tsx      # Bracket knockout
│   │   ├── stats/page.tsx        # Statistik pemain
│   │   └── teams/
│   │       ├── page.tsx          # Grid 48 tim
│   │       └── [code]/page.tsx   # Detail tim (SSG)
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── MatchCard.tsx         # Scoreline broadcast-style
│   │   ├── GroupTable.tsx        # Klasemen otomatis
│   │   ├── BracketView.tsx       # Bracket knockout
│   │   ├── TeamCard.tsx
│   │   └── StatLeaders.tsx       # Leaderboard pemain
│   └── lib/
│       └── data.ts               # Data statis (48 tim, 104 match, players)
└── docs/superpowers/specs/       # Design spec
```

## Data

Semua data statis di `src/lib/data.ts`:
- `teams` — 48 tim (code, nama, flag, grup, konfederasi, rank FIFA)
- `matches` — 104 pertandingan (skor, tanggal, stadion, status)
- `players` — statistik top pemain
- Klasemen grup **dihitung otomatis** via `computeStandings()` dari hasil match

**Catatan:** Turnamen sedang berlangsung (11 Jun–19 Jul 2026). Skor placeholder realistis — edit manual di `data.ts` saat hasil resmi keluar.

## License

MIT
