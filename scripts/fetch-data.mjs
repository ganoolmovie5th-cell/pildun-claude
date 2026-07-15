#!/usr/bin/env node
// Generate src/lib/data.ts dari football-data.org (FIFA World Cup 2026).
// Jalankan: FOOTBALL_DATA_TOKEN=xxx node scripts/fetch-data.mjs
// Token JANGAN di-commit. Simpan di .env.local.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const TOKEN = process.env.FOOTBALL_DATA_TOKEN;
if (!TOKEN) {
  console.error('Set FOOTBALL_DATA_TOKEN dulu. Contoh: FOOTBALL_DATA_TOKEN=xxx node scripts/fetch-data.mjs');
  process.exit(1);
}

const BASE = 'https://api.football-data.org/v4/competitions/WC';
const HEADERS = { 'X-Auth-Token': TOKEN };
const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'src', 'lib', 'data.ts');

const STAGE_MAP = {
  GROUP_STAGE: 'group',
  LAST_32: 'round32',
  LAST_16: 'round16',
  QUARTER_FINALS: 'quarter',
  SEMI_FINALS: 'semi',
  THIRD_PLACE: 'third-place',
  FINAL: 'final',
};

async function get(path) {
  const res = await fetch(BASE + path, { headers: HEADERS });
  if (!res.ok) throw new Error(`${path} -> ${res.status} ${res.statusText}`);
  return res.json();
}

function statusOf(s) {
  if (s === 'FINISHED') return 'finished';
  if (s === 'IN_PLAY' || s === 'PAUSED' || s === 'LIVE') return 'live';
  return 'scheduled';
}

function esc(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

async function main() {
  console.log('Fetching matches...');
  const matchesData = await get('/matches?season=2026');
  console.log('Fetching scorers...');
  const scorersData = await get('/scorers?season=2026&limit=30');

  // Teams (dari group-stage matches)
  const teamMap = new Map();
  for (const m of matchesData.matches) {
    const grp = m.group ? m.group.replace('GROUP_', '') : null;
    for (const t of [m.homeTeam, m.awayTeam]) {
      if (!t?.tla) continue;
      if (!teamMap.has(t.tla)) {
        teamMap.set(t.tla, { code: t.tla, name: t.shortName || t.name, crest: t.crest, group: grp });
      } else if (grp && !teamMap.get(t.tla).group) {
        teamMap.get(t.tla).group = grp;
      }
    }
  }
  const teams = [...teamMap.values()]
    .filter((t) => t.group)
    .sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));

  // Matches
  const matches = matchesData.matches.map((m) => {
    const d = new Date(m.utcDate);
    return {
      id: String(m.id),
      stage: STAGE_MAP[m.stage] || 'group',
      group: m.group ? m.group.replace('GROUP_', '') : undefined,
      home: m.homeTeam?.tla || '',
      away: m.awayTeam?.tla || '',
      homeScore: m.score?.fullTime?.home ?? null,
      awayScore: m.score?.fullTime?.away ?? null,
      date: d.toISOString().slice(0, 10),
      time: d.toISOString().slice(11, 16),
      status: statusOf(m.status),
    };
  }).filter((m) => m.home && m.away);

  // Players
  const players = scorersData.scorers.map((s) => ({
    name: s.player?.name || 'Unknown',
    team: s.team?.tla || '',
    goals: s.goals ?? 0,
    assists: s.assists ?? 0,
    penalties: s.penalties ?? 0,
  })).filter((p) => p.team);

  const teamLines = teams.map((t) =>
    `  { code: '${esc(t.code)}', name: '${esc(t.name)}', crest: '${esc(t.crest)}', group: '${t.group}' },`
  ).join('\n');

  const matchLines = matches.map((m) =>
    `  { id: '${m.id}', stage: '${m.stage}', group: ${m.group ? `'${m.group}'` : 'undefined'}, ` +
    `home: '${m.home}', away: '${m.away}', homeScore: ${m.homeScore}, awayScore: ${m.awayScore}, ` +
    `date: '${m.date}', time: '${m.time}', status: '${m.status}' },`
  ).join('\n');

  const playerLines = players.map((p) =>
    `  { name: '${esc(p.name)}', team: '${p.team}', goals: ${p.goals}, assists: ${p.assists}, penalties: ${p.penalties} },`
  ).join('\n');

  const ts = `// AUTO-GENERATED oleh scripts/fetch-data.mjs — football-data.org (FIFA World Cup 2026)
// Jangan edit manual. Jalankan ulang script untuk update: node scripts/fetch-data.mjs
// Terakhir digenerate: ${new Date().toISOString()}

export type Stage = 'group' | 'round32' | 'round16' | 'quarter' | 'semi' | 'third-place' | 'final';
export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Team {
  code: string;
  name: string;
  crest: string;
  group: string;
}

export interface Match {
  id: string;
  stage: Stage;
  group?: string;
  home: string;
  away: string;
  homeScore: number | null;
  awayScore: number | null;
  date: string;
  time: string;
  status: MatchStatus;
}

export interface Player {
  name: string;
  team: string;
  goals: number;
  assists: number;
  penalties: number;
}

export const STAGE_LABELS: Record<Stage, string> = {
  group: 'Fase Grup',
  round32: 'Babak 32 Besar',
  round16: 'Babak 16 Besar',
  quarter: 'Perempat Final',
  semi: 'Semifinal',
  'third-place': 'Perebutan Juara 3',
  final: 'Final',
};

export const teams: Team[] = [
${teamLines}
];

export const matches: Match[] = [
${matchLines}
];

export const players: Player[] = [
${playerLines}
];

export const GROUPS = [...new Set(teams.map((t) => t.group))].sort();

export function getTeamByCode(code: string): Team | undefined {
  return teams.find((t) => t.code === code);
}

export function getTeamsByGroup(group: string): Team[] {
  return teams.filter((t) => t.group === group);
}

export function getMatchesByGroup(group: string): Match[] {
  return matches.filter((m) => m.stage === 'group' && m.group === group);
}

export function getMatchesByStage(stage: Stage): Match[] {
  return matches.filter((m) => m.stage === stage);
}

export function getMatchesByTeam(code: string): Match[] {
  return matches
    .filter((m) => m.home === code || m.away === code)
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));
}

export interface StandingRow {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export function computeStandings(group: string): StandingRow[] {
  const groupTeams = getTeamsByGroup(group);
  const rows = new Map<string, StandingRow>();
  for (const t of groupTeams) {
    rows.set(t.code, { team: t, played: 0, won: 0, drawn: 0, lost: 0, gf: 0, ga: 0, gd: 0, points: 0 });
  }
  for (const match of getMatchesByGroup(group)) {
    if (match.homeScore === null || match.awayScore === null) continue;
    const home = rows.get(match.home);
    const away = rows.get(match.away);
    if (!home || !away) continue;
    home.played++; away.played++;
    home.gf += match.homeScore; home.ga += match.awayScore;
    away.gf += match.awayScore; away.ga += match.homeScore;
    if (match.homeScore > match.awayScore) { home.won++; home.points += 3; away.lost++; }
    else if (match.homeScore < match.awayScore) { away.won++; away.points += 3; home.lost++; }
    else { home.drawn++; away.drawn++; home.points++; away.points++; }
  }
  for (const row of rows.values()) row.gd = row.gf - row.ga;
  return [...rows.values()].sort((a, b) =>
    b.points - a.points || b.gd - a.gd || b.gf - a.gf || a.team.name.localeCompare(b.team.name)
  );
}

export function getTopScorers(limit = 15): Player[] {
  return [...players].sort((a, b) => b.goals - a.goals || b.assists - a.assists).slice(0, limit);
}

export function getTopAssists(limit = 15): Player[] {
  return [...players].sort((a, b) => b.assists - a.assists || b.goals - a.goals).slice(0, limit);
}

export function getRecentResults(limit = 6): Match[] {
  return matches
    .filter((m) => m.status === 'finished')
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time))
    .slice(0, limit);
}

export function getChampion(): Team | undefined {
  const final = matches.find((m) => m.stage === 'final');
  if (!final || final.homeScore === null || final.awayScore === null) return undefined;
  const winnerCode = final.homeScore > final.awayScore ? final.home : final.away;
  return getTeamByCode(winnerCode);
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}
`;

  writeFileSync(OUT, ts, 'utf8');
  console.log(`OK. ${teams.length} tim, ${matches.length} match, ${players.length} pemain -> ${OUT}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
