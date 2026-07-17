# Piala Dunia 2026 — Project Context & Conventions

## Overview

Website hasil Piala Dunia FIFA 2026 (USA-Meksiko-Kanada) terlengkap. Data dari API football-data.org, di-generate ke file statis.

- **Repo:** ganoolmovie5th-cell/pildun-claude
- **Branch:** `main` (push langsung)
- **Stack:** Next.js 16 (App Router) + TypeScript strict + Tailwind CSS 4
- **Data source:** football-data.org API (auto-generate ke `data.ts`)
- **Deploy:** Vercel

---

## Aturan Penting

- `src/lib/data.ts` AUTO-GENERATED oleh `scripts/fetch-data.mjs` — JANGAN edit manual
- Update data: `FOOTBALL_DATA_TOKEN=xxx node scripts/fetch-data.mjs`
- Token API JANGAN di-commit — di `.env.local` (gitignored)
- UI dalam Bahasa Indonesia
- Dark default; light mode via toggle Navbar (`localStorage.theme` → `[data-theme]`)
- Jam match ditampilkan WIB (Asia/Jakarta) via `toWIB()` di `lib/time.ts`
- Push langsung ke `main`
- Setiap commit update README.md + steering file
- Klasemen grup TIDAK di-hardcode — dihitung otomatis dari `matches`

---

## Design — Bold Sport Broadcast

Gaya broadcast TV olahraga. Dark base, satu aksen merah.

| Token | Value | Usage |
|---|---|---|
| `bg` | `#0a0e17` | Background utama |
| `bg-elevated` | `#121826` | Header strip, section alt |
| `surface` | `#161d2e` | Card |
| `surface-2` | `#1e2740` | Card hover |
| `line` | `#253049` | Border |
| `accent` | `#e11d2a` | Aksen utama (merah) — LOCKED |
| `accent-hover` | `#f43545` | Hover state |
| `gold` | `#f5c518` | Waktu match, label juara |
| `pitch` | `#16a34a` | Lolos grup, selisih gol positif |
| `text` | `#f1f5f9` | Teks utama |
| `text-muted` | `#94a3b8` | Teks sekunder |
| `text-dim` | `#64748b` | Teks tersier |

**Font:** Oswald (display/heading/skor, condensed sporty) + Barlow (body). Via `next/font/google`.

**Aturan visual:**
- Satu aksen (merah) di seluruh halaman — jangan campur warna lain untuk CTA
- Skor pakai `.score-num` (Oswald + tabular-nums)
- Card pakai `.card` + `.card-hover` (lift + active scale)
- Accent bar (garis merah) sebagai penanda section
- Tidak ada em-dash di UI

---

## Pages

| Route | Isi | Render |
|---|---|---|
| `/` | Hero, hasil terbaru, top skor, juara, quick links | Static |
| `/matches` | 102 match, filter babak / tanggal / LIVE | Client (filter) |
| `/matches/[id]` | Detail match: scoreboard, countdown, prediksi+poin, head-to-head | SSG (102 halaman) |
| `/timeline` | Kronologi match hari demi hari | Static |
| `/groups` | 12 grup + klasemen otomatis | Static |
| `/bracket` | Bracket knockout 32→final + perebutan juara 3 | Static |
| `/road` | Jalur ke final tim yang masih bertahan | Static |
| `/teams` | Grid 48 tim, filter per grup | Client (filter) |
| `/teams/[code]` | Detail tim: header, statistik grup, pemain, jadwal | SSG (48 halaman) |
| `/stats` | Top skor, assist, penalti (bar chart, filter per grup) + Golden Boot & Golden Ball | Client (filter) |
| `/prediksi` | Leaderboard prediksi: total poin dari localStorage `pred:{id}` + tebak juara (`champPick`) | Client |
| `/stadion` | 16 venue resmi (hardcoded, data API tak punya venue) | Static |

- Grafik momentum (`MomentumChart`): tren goal-diff kumulatif tim (SVG) di `/teams/[code]`
- Head-to-head agregat (menang/seri/gol) antar 2 tim di `/matches/[id]`
- Klasemen live-refresh (`LiveRefresh`): `router.refresh()` tiap 60s di `/groups`

- Confetti muncul di beranda saat `getChampion()` ada (`Confetti.tsx`, auto-hilang 6 dtk)
- Skeleton loader (`.skeleton`) untuk state loading client-side (mis. `/prediksi`)
- Strip aksen tuan rumah (`.host-bar`, USA biru / Meksiko hijau / Kanada merah) di Footer

- Pencarian tim (Cmd/Ctrl+K) via `SearchModal` di-mount lewat `ClientShell`
- Dark/Light toggle di Navbar → `[data-theme]` di globals.css, tersimpan `localStorage.theme`
- Prediksi skor + poin di `MatchExtras`: input saat `scheduled` (localStorage `pred:{matchId}`), saat `finished` bandingkan vs hasil (skor pas +3, tebak hasil benar +1)
- SEO: `sitemap.ts` (`/sitemap.xml`) + `robots.ts`
- **Domain:** piala-dunia.web.id

---

## Auto-Refresh Data

`.github/workflows/refresh-data.yml` — cron tiap 3 jam + manual. Jalankan `scripts/fetch-data.mjs`, commit `data.ts` jika berubah, push ke main. Butuh GitHub secret `FOOTBALL_DATA_TOKEN`.

---

## Data Structure (`src/lib/data.ts`)

```typescript
interface Team {
  code: string;         // 'ARG' (tla dari API, dipakai di URL /teams/[code])
  name: string;
  crest: string;        // URL logo dari football-data.org
  group: string;        // 'A'..'L'
}

interface Match {
  id: string;           // match id dari API
  stage: Stage;         // group | round32 | round16 | quarter | semi | third-place | final
  group?: string;       // hanya stage group
  home: string;         // team code
  away: string;         // team code
  homeScore: number | null;   // null = belum main
  awayScore: number | null;
  date: string;         // YYYY-MM-DD (UTC)
  time: string;         // HH:MM (UTC)
  status: MatchStatus;  // scheduled | live | finished
}

interface Player {
  name: string;
  team: string;         // team code
  goals: number;
  assists: number;
  penalties: number;
}
```

**Helper functions:** `getTeamByCode`, `getTeamsByGroup`, `getMatchesByGroup`, `getMatchesByStage`, `getMatchesByTeam`, `computeStandings`, `getTopScorers`, `getTopAssists`, `getRecentResults`, `getChampion`, `formatDateShort`

**computeStandings(group):** hitung main/menang/seri/kalah/GF/GA/GD/poin dari `matches`. Sort: poin → GD → GF → nama.

---

## Cara Update Data

Data dari football-data.org API. JANGAN edit `data.ts` manual — regenerate:

```bash
FOOTBALL_DATA_TOKEN=xxx node scripts/fetch-data.mjs
```

Script fetch `/matches?season=2026` + `/scorers`, map stage (GROUP_STAGE→group, dst), tulis ulang `data.ts`. Klasemen & bracket ikut update otomatis. `getChampion()` return undefined selama final belum ada pemenang (API `winner: null`).

**PENTING:** Turnamen berlangsung 11 Jun–19 Jul 2026. Per 15 Jul: semifinal (FRA 0-2 ESP selesai, ENG vs ARG belum main), belum ada juara. Jalankan script berkala untuk sinkron.

---

## Favicon

`src/app/icon.svg` — trofi emas + bintang merah, base gelap. Next.js auto-serve sebagai `/icon.svg`.

---

## Components

| Component | Purpose |
|---|---|
| `Navbar.tsx` | Sticky nav, 6 link, mobile menu |
| `Footer.tsx` | Footer links |
| `Crest.tsx` | Logo tim (`<img>` dari crest URL) |
| `MatchCard.tsx` | Scoreline: crest, skor, status |
| `GroupTable.tsx` | Klasemen tabel (top 2 highlight hijau) |
| `BracketView.tsx` | Bracket horizontal-scroll per babak |
| `TeamCard.tsx` | Kartu tim (crest, nama, grup) |
| `StatLeaders.tsx` | Leaderboard pemain (gol/assist/penalti) |
| `ClientShell.tsx` | Client wrapper: Navbar + SearchModal + Cmd+K |
| `SearchModal.tsx` | Pencarian tim (Cmd/Ctrl+K) |

---

## Verifikasi (WAJIB)

```bash
npm run build   # harus sukses
```

---

## Commit Convention

```
<type>: <deskripsi singkat>
```
Type: `feat` `fix` `refactor` `chore` `docs`
