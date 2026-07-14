# Piala Dunia 2026 — Design Spec

**Date:** 2026-07-15
**Project:** pildun-claude
**Repo:** https://github.com/ganoolmovie5th-cell/pildun-claude

## Context
Website hasil Piala Dunia FIFA 2026 (USA-Meksiko-Kanada, 11 Jun–19 Jul 2026) terlengkap. Data statis (hardcode), tanpa backend. Turnamen sedang berlangsung — skor placeholder realistis, diedit manual saat hasil asli keluar.

## Format Turnamen
48 tim, 12 grup (@4 tim), 104 match total. Top 2 tiap grup + 8 peringkat-3 terbaik → Babak 32 besar → 16 → 8 → Semifinal → Final.

## Tech Stack
Next.js 16 (App Router) + TypeScript strict + Tailwind CSS 4. Deploy Vercel.

## Data Model (`src/lib/data.ts`)

```typescript
type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';
type Stage = 'group' | 'round32' | 'round16' | 'quarter' | 'semi' | 'third-place' | 'final';
type MatchStatus = 'scheduled' | 'live' | 'finished';

interface Team {
  code: string;        // 'ARG', 'BRA' (3-letter)
  name: string;        // 'Argentina'
  flag: string;        // emoji
  group: string;       // 'A'..'L'
  confederation: Confederation;
  fifaRank: number;
}

interface Match {
  id: string;
  stage: Stage;
  group?: string;
  home: string;        // team code
  away: string;        // team code
  homeScore: number | null;
  awayScore: number | null;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:MM
  stadium: string;
  city: string;
  status: MatchStatus;
}

interface Player {
  name: string;
  team: string;        // team code
  goals: number;
  assists: number;
  yellowCards: number;
}
```

Klasemen grup dihitung otomatis dari `matches` (main, menang, seri, kalah, GF, GA, selisih, poin). Sort: poin → selisih gol → GF.

## Halaman

| Route | Isi |
|-------|-----|
| `/` | Hero, hasil terbaru, top scorer highlight, quick links |
| `/groups` | 12 grup + klasemen otomatis |
| `/matches` | 104 match, filter grup/tanggal/stage |
| `/bracket` | Bracket knockout visual (32→final) |
| `/teams` | Grid 48 tim per grup |
| `/teams/[code]` | Skuad ringkas, jadwal, hasil, statistik tim (SSG) |
| `/stats` | Top scorer, assist, kartu |

## Komponen
- `Navbar` — sticky, nav links, dark/light toggle
- `Footer`
- `MatchCard` — scoreline broadcast-style (flag, skor, status)
- `GroupTable` — klasemen tabel
- `BracketView` — bracket knockout
- `TeamCard` — kartu tim (flag, nama, grup, rank)
- `StatLeaders` — leaderboard pemain
- `HeroSection` — hero homepage

## Helper Functions
- `getTeamByCode(code)`
- `getMatchesByGroup(group)`, `getMatchesByStage(stage)`, `getMatchesByTeam(code)`
- `computeStandings(group)` → sorted table rows
- `getTopScorers()`, `getTopAssists()`
- `getKnockoutMatches()` → bracket structure

## Desain — Bold Sport Broadcast
- Base gelap (navy-black)
- Aksen tuan rumah: merah, hijau (Meksiko), biru (USA)
- Scoreline gaya broadcast TV, gradient dinamis, motion halus
- Detail visual final via taste-skill saat implementasi

## Data Scope
- 48 tim asli WC2026 dengan grup asli hasil drawing
- 72 match fase grup + 32 match knockout = 104
- Skor placeholder realistis untuk match "sudah main", `null` + status `scheduled` untuk sisanya
- ~15-20 pemain top scorer/assist untuk halaman stats

## Verifikasi
```bash
npm run build   # harus sukses
```
Manual: cek /groups klasemen ke-sort benar, /bracket render, /teams/[code] SSG semua 48 tim.
