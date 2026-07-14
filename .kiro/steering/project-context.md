# Piala Dunia 2026 — Project Context & Conventions

## Overview

Website hasil Piala Dunia FIFA 2026 (USA-Meksiko-Kanada) terlengkap. Data statis, tanpa backend.

- **Repo:** ganoolmovie5th-cell/pildun-claude
- **Branch:** `main` (push langsung)
- **Stack:** Next.js 16 (App Router) + TypeScript strict + Tailwind CSS 4
- **Deploy:** Vercel

---

## Aturan Penting

- Semua data statis di `src/lib/data.ts` — tidak ada database
- UI dalam Bahasa Indonesia
- Dark mode terkunci (broadcast aesthetic) — tidak ada light mode
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
| `/matches` | 104 match, filter babak | Client (filter) |
| `/groups` | 12 grup + klasemen otomatis | Static |
| `/bracket` | Bracket knockout 32→final + perebutan juara 3 | Static |
| `/teams` | Grid 48 tim per grup | Static |
| `/teams/[code]` | Detail tim: header, statistik grup, pemain, jadwal | SSG (48 halaman) |
| `/stats` | Top skor, assist, kartu | Static |

---

## Data Structure (`src/lib/data.ts`)

```typescript
interface Team {
  code: string;         // 'ARG' (3-letter, dipakai di URL /teams/[code])
  name: string;
  flag: string;         // emoji bendera
  group: string;        // 'A'..'L'
  confederation: Confederation;
  fifaRank: number;
}

interface Match {
  id: string;
  stage: Stage;         // group | round32 | round16 | quarter | semi | third-place | final
  group?: string;       // hanya stage group
  home: string;         // team code
  away: string;         // team code
  homeScore: number | null;   // null = belum main
  awayScore: number | null;
  date: string;         // YYYY-MM-DD
  time: string;         // HH:MM
  stadium: string;
  city: string;
  status: MatchStatus;  // scheduled | live | finished
}

interface Player {
  name: string;
  team: string;         // team code
  goals: number;
  assists: number;
  yellowCards: number;
}
```

**Helper functions:** `getTeamByCode`, `getTeamsByGroup`, `getMatchesByGroup`, `getMatchesByStage`, `getMatchesByTeam`, `getKnockoutMatches`, `computeStandings`, `getTopScorers`, `getTopAssists`, `getRecentResults`, `getChampion`, `formatDate`, `formatDateShort`

**computeStandings(group):** hitung main/menang/seri/kalah/GF/GA/GD/poin dari `matches`. Sort: poin → GD → GF → nama.

---

## Cara Update Data

- **Skor match:** ubah `homeScore`/`awayScore` di `matches`. Set `status: 'finished'`.
- **Match belum main:** `homeScore: null, awayScore: null, status: 'scheduled'`.
- Klasemen otomatis ikut berubah — tidak perlu edit manual.
- **Tim/grup:** edit array `teams` (grup asli hasil drawing).
- **Bracket:** edit match knockout (id `R32-*`, `R16-*`, `QF-*`, `SF-*`, `TP-1`, `FIN`).

**PENTING:** Data saat ini placeholder realistis. Turnamen berlangsung 11 Jun–19 Jul 2026. Update dengan hasil resmi saat tersedia.

---

## Components

| Component | Purpose |
|---|---|
| `Navbar.tsx` | Sticky nav, 6 link, mobile menu |
| `Footer.tsx` | Footer links |
| `MatchCard.tsx` | Scoreline: flag, skor, status, venue |
| `GroupTable.tsx` | Klasemen tabel (top 2 highlight hijau) |
| `BracketView.tsx` | Bracket horizontal-scroll per babak |
| `TeamCard.tsx` | Kartu tim (flag, nama, konfederasi, rank) |
| `StatLeaders.tsx` | Leaderboard pemain (gol/assist/kartu) |

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
