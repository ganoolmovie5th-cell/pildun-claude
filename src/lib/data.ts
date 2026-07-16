// AUTO-GENERATED oleh scripts/fetch-data.mjs — football-data.org (FIFA World Cup 2026)
// Jangan edit manual. Jalankan ulang script untuk update: node scripts/fetch-data.mjs
// Terakhir digenerate: 2026-07-16T06:19:05.882Z

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
  { code: 'CZE', name: 'Czechia', crest: 'https://crests.football-data.org/798.svg', group: 'A' },
  { code: 'KOR', name: 'Korea Republic', crest: 'https://crests.football-data.org/772.png', group: 'A' },
  { code: 'MEX', name: 'Mexico', crest: 'https://crests.football-data.org/769.svg', group: 'A' },
  { code: 'RSA', name: 'South Africa', crest: 'https://crests.football-data.org/9396.svg', group: 'A' },
  { code: 'BIH', name: 'Bosnia-H.', crest: 'https://crests.football-data.org/bosnia.svg', group: 'B' },
  { code: 'CAN', name: 'Canada', crest: 'https://crests.football-data.org/canada.svg', group: 'B' },
  { code: 'QAT', name: 'Qatar', crest: 'https://crests.football-data.org/8030.svg', group: 'B' },
  { code: 'SUI', name: 'Switzerland', crest: 'https://crests.football-data.org/788.svg', group: 'B' },
  { code: 'BRA', name: 'Brazil', crest: 'https://crests.football-data.org/764.svg', group: 'C' },
  { code: 'HAI', name: 'Haiti', crest: 'https://crests.football-data.org/haiti.svg', group: 'C' },
  { code: 'MAR', name: 'Morocco', crest: 'https://crests.football-data.org/morocco.svg', group: 'C' },
  { code: 'SCO', name: 'Scotland', crest: 'https://crests.football-data.org/814.svg', group: 'C' },
  { code: 'AUS', name: 'Australia', crest: 'https://crests.football-data.org/779.svg', group: 'D' },
  { code: 'PAR', name: 'Paraguay', crest: 'https://crests.football-data.org/761.svg', group: 'D' },
  { code: 'TUR', name: 'Turkey', crest: 'https://crests.football-data.org/803.svg', group: 'D' },
  { code: 'USA', name: 'USA', crest: 'https://crests.football-data.org/usa.svg', group: 'D' },
  { code: 'CUW', name: 'Curaçao', crest: 'https://crests.football-data.org/curacao.svg', group: 'E' },
  { code: 'ECU', name: 'Ecuador', crest: 'https://crests.football-data.org/791.svg', group: 'E' },
  { code: 'GER', name: 'Germany', crest: 'https://crests.football-data.org/759.svg', group: 'E' },
  { code: 'CIV', name: 'Ivory Coast', crest: 'https://crests.football-data.org/787.svg', group: 'E' },
  { code: 'JPN', name: 'Japan', crest: 'https://crests.football-data.org/766.svg', group: 'F' },
  { code: 'NED', name: 'Netherlands', crest: 'https://crests.football-data.org/8601.svg', group: 'F' },
  { code: 'SWE', name: 'Sweden', crest: 'https://crests.football-data.org/792.svg', group: 'F' },
  { code: 'TUN', name: 'Tunisia', crest: 'https://crests.football-data.org/tunisia.svg', group: 'F' },
  { code: 'BEL', name: 'Belgium', crest: 'https://crests.football-data.org/805.svg', group: 'G' },
  { code: 'EGY', name: 'Egypt', crest: 'https://crests.football-data.org/825.svg', group: 'G' },
  { code: 'IRN', name: 'Iran', crest: 'https://crests.football-data.org/iran.svg', group: 'G' },
  { code: 'NZL', name: 'New Zealand', crest: 'https://crests.football-data.org/783.svg', group: 'G' },
  { code: 'CPV', name: 'Cape Verde', crest: 'https://crests.football-data.org/cape_verde.svg', group: 'H' },
  { code: 'KSA', name: 'Saudi Arabia', crest: 'https://crests.football-data.org/saudi_arabia.svg', group: 'H' },
  { code: 'ESP', name: 'Spain', crest: 'https://crests.football-data.org/760.svg', group: 'H' },
  { code: 'URU', name: 'Uruguay', crest: 'https://crests.football-data.org/758.svg', group: 'H' },
  { code: 'FRA', name: 'France', crest: 'https://crests.football-data.org/773.svg', group: 'I' },
  { code: 'IRQ', name: 'Iraq', crest: 'https://crests.football-data.org/iraq.svg', group: 'I' },
  { code: 'NOR', name: 'Norway', crest: 'https://crests.football-data.org/813.svg', group: 'I' },
  { code: 'SEN', name: 'Senegal', crest: 'https://crests.football-data.org/senegal.svg', group: 'I' },
  { code: 'ALG', name: 'Algeria', crest: 'https://crests.football-data.org/algeria.svg', group: 'J' },
  { code: 'ARG', name: 'Argentina', crest: 'https://crests.football-data.org/762.png', group: 'J' },
  { code: 'AUT', name: 'Austria', crest: 'https://crests.football-data.org/816.svg', group: 'J' },
  { code: 'JOR', name: 'Jordan', crest: 'https://crests.football-data.org/8049.png', group: 'J' },
  { code: 'COL', name: 'Colombia', crest: 'https://crests.football-data.org/818.svg', group: 'K' },
  { code: 'COD', name: 'Congo DR', crest: 'https://crests.football-data.org/congo_dr.svg', group: 'K' },
  { code: 'POR', name: 'Portugal', crest: 'https://crests.football-data.org/765.svg', group: 'K' },
  { code: 'UZB', name: 'Uzbekistan', crest: 'https://crests.football-data.org/8070.png', group: 'K' },
  { code: 'CRO', name: 'Croatia', crest: 'https://crests.football-data.org/799.svg', group: 'L' },
  { code: 'ENG', name: 'England', crest: 'https://crests.football-data.org/770.svg', group: 'L' },
  { code: 'GHA', name: 'Ghana', crest: 'https://crests.football-data.org/ghana.svg', group: 'L' },
  { code: 'PAN', name: 'Panama', crest: 'https://crests.football-data.org/panama.svg', group: 'L' },
];

export const matches: Match[] = [
  { id: '537327', stage: 'group', group: 'A', home: 'MEX', away: 'RSA', homeScore: 2, awayScore: 0, date: '2026-06-11', time: '19:00', status: 'finished' },
  { id: '537328', stage: 'group', group: 'A', home: 'KOR', away: 'CZE', homeScore: 2, awayScore: 1, date: '2026-06-12', time: '02:00', status: 'finished' },
  { id: '537333', stage: 'group', group: 'B', home: 'CAN', away: 'BIH', homeScore: 1, awayScore: 1, date: '2026-06-12', time: '19:00', status: 'finished' },
  { id: '537345', stage: 'group', group: 'D', home: 'USA', away: 'PAR', homeScore: 4, awayScore: 1, date: '2026-06-13', time: '01:00', status: 'finished' },
  { id: '537334', stage: 'group', group: 'B', home: 'QAT', away: 'SUI', homeScore: 1, awayScore: 1, date: '2026-06-13', time: '19:00', status: 'finished' },
  { id: '537339', stage: 'group', group: 'C', home: 'BRA', away: 'MAR', homeScore: 1, awayScore: 1, date: '2026-06-13', time: '22:00', status: 'finished' },
  { id: '537340', stage: 'group', group: 'C', home: 'HAI', away: 'SCO', homeScore: 0, awayScore: 1, date: '2026-06-14', time: '01:00', status: 'finished' },
  { id: '537346', stage: 'group', group: 'D', home: 'AUS', away: 'TUR', homeScore: 2, awayScore: 0, date: '2026-06-14', time: '04:00', status: 'finished' },
  { id: '537351', stage: 'group', group: 'E', home: 'GER', away: 'CUW', homeScore: 7, awayScore: 1, date: '2026-06-14', time: '17:00', status: 'finished' },
  { id: '537357', stage: 'group', group: 'F', home: 'NED', away: 'JPN', homeScore: 2, awayScore: 2, date: '2026-06-14', time: '20:00', status: 'finished' },
  { id: '537352', stage: 'group', group: 'E', home: 'CIV', away: 'ECU', homeScore: 1, awayScore: 0, date: '2026-06-14', time: '23:00', status: 'finished' },
  { id: '537358', stage: 'group', group: 'F', home: 'SWE', away: 'TUN', homeScore: 5, awayScore: 1, date: '2026-06-15', time: '02:00', status: 'finished' },
  { id: '537369', stage: 'group', group: 'H', home: 'ESP', away: 'CPV', homeScore: 0, awayScore: 0, date: '2026-06-15', time: '16:00', status: 'finished' },
  { id: '537363', stage: 'group', group: 'G', home: 'BEL', away: 'EGY', homeScore: 1, awayScore: 1, date: '2026-06-15', time: '19:00', status: 'finished' },
  { id: '537370', stage: 'group', group: 'H', home: 'KSA', away: 'URU', homeScore: 1, awayScore: 1, date: '2026-06-15', time: '22:00', status: 'finished' },
  { id: '537364', stage: 'group', group: 'G', home: 'IRN', away: 'NZL', homeScore: 2, awayScore: 2, date: '2026-06-16', time: '01:00', status: 'finished' },
  { id: '537391', stage: 'group', group: 'I', home: 'FRA', away: 'SEN', homeScore: 3, awayScore: 1, date: '2026-06-16', time: '19:00', status: 'finished' },
  { id: '537392', stage: 'group', group: 'I', home: 'IRQ', away: 'NOR', homeScore: 1, awayScore: 4, date: '2026-06-16', time: '22:00', status: 'finished' },
  { id: '537397', stage: 'group', group: 'J', home: 'ARG', away: 'ALG', homeScore: 3, awayScore: 0, date: '2026-06-17', time: '01:00', status: 'finished' },
  { id: '537398', stage: 'group', group: 'J', home: 'AUT', away: 'JOR', homeScore: 3, awayScore: 1, date: '2026-06-17', time: '04:00', status: 'finished' },
  { id: '537403', stage: 'group', group: 'K', home: 'POR', away: 'COD', homeScore: 1, awayScore: 1, date: '2026-06-17', time: '17:00', status: 'finished' },
  { id: '537409', stage: 'group', group: 'L', home: 'ENG', away: 'CRO', homeScore: 4, awayScore: 2, date: '2026-06-17', time: '20:00', status: 'finished' },
  { id: '537410', stage: 'group', group: 'L', home: 'GHA', away: 'PAN', homeScore: 1, awayScore: 0, date: '2026-06-17', time: '23:00', status: 'finished' },
  { id: '537404', stage: 'group', group: 'K', home: 'UZB', away: 'COL', homeScore: 1, awayScore: 3, date: '2026-06-18', time: '02:00', status: 'finished' },
  { id: '537329', stage: 'group', group: 'A', home: 'CZE', away: 'RSA', homeScore: 1, awayScore: 1, date: '2026-06-18', time: '16:00', status: 'finished' },
  { id: '537335', stage: 'group', group: 'B', home: 'SUI', away: 'BIH', homeScore: 4, awayScore: 1, date: '2026-06-18', time: '19:00', status: 'finished' },
  { id: '537336', stage: 'group', group: 'B', home: 'CAN', away: 'QAT', homeScore: 6, awayScore: 0, date: '2026-06-18', time: '22:00', status: 'finished' },
  { id: '537330', stage: 'group', group: 'A', home: 'MEX', away: 'KOR', homeScore: 1, awayScore: 0, date: '2026-06-19', time: '01:00', status: 'finished' },
  { id: '537348', stage: 'group', group: 'D', home: 'USA', away: 'AUS', homeScore: 2, awayScore: 0, date: '2026-06-19', time: '19:00', status: 'finished' },
  { id: '537342', stage: 'group', group: 'C', home: 'SCO', away: 'MAR', homeScore: 0, awayScore: 1, date: '2026-06-19', time: '22:00', status: 'finished' },
  { id: '537341', stage: 'group', group: 'C', home: 'BRA', away: 'HAI', homeScore: 3, awayScore: 0, date: '2026-06-20', time: '00:30', status: 'finished' },
  { id: '537347', stage: 'group', group: 'D', home: 'TUR', away: 'PAR', homeScore: 0, awayScore: 1, date: '2026-06-20', time: '03:00', status: 'finished' },
  { id: '537359', stage: 'group', group: 'F', home: 'NED', away: 'SWE', homeScore: 5, awayScore: 1, date: '2026-06-20', time: '17:00', status: 'finished' },
  { id: '537353', stage: 'group', group: 'E', home: 'GER', away: 'CIV', homeScore: 2, awayScore: 1, date: '2026-06-20', time: '20:00', status: 'finished' },
  { id: '537354', stage: 'group', group: 'E', home: 'ECU', away: 'CUW', homeScore: 0, awayScore: 0, date: '2026-06-21', time: '00:00', status: 'finished' },
  { id: '537360', stage: 'group', group: 'F', home: 'TUN', away: 'JPN', homeScore: 0, awayScore: 4, date: '2026-06-21', time: '04:00', status: 'finished' },
  { id: '537371', stage: 'group', group: 'H', home: 'ESP', away: 'KSA', homeScore: 4, awayScore: 0, date: '2026-06-21', time: '16:00', status: 'finished' },
  { id: '537365', stage: 'group', group: 'G', home: 'BEL', away: 'IRN', homeScore: 0, awayScore: 0, date: '2026-06-21', time: '19:00', status: 'finished' },
  { id: '537372', stage: 'group', group: 'H', home: 'URU', away: 'CPV', homeScore: 2, awayScore: 2, date: '2026-06-21', time: '22:00', status: 'finished' },
  { id: '537366', stage: 'group', group: 'G', home: 'NZL', away: 'EGY', homeScore: 1, awayScore: 3, date: '2026-06-22', time: '01:00', status: 'finished' },
  { id: '537399', stage: 'group', group: 'J', home: 'ARG', away: 'AUT', homeScore: 2, awayScore: 0, date: '2026-06-22', time: '17:00', status: 'finished' },
  { id: '537393', stage: 'group', group: 'I', home: 'FRA', away: 'IRQ', homeScore: 3, awayScore: 0, date: '2026-06-22', time: '21:00', status: 'finished' },
  { id: '537394', stage: 'group', group: 'I', home: 'NOR', away: 'SEN', homeScore: 3, awayScore: 2, date: '2026-06-23', time: '00:00', status: 'finished' },
  { id: '537400', stage: 'group', group: 'J', home: 'JOR', away: 'ALG', homeScore: 1, awayScore: 2, date: '2026-06-23', time: '03:00', status: 'finished' },
  { id: '537405', stage: 'group', group: 'K', home: 'POR', away: 'UZB', homeScore: 5, awayScore: 0, date: '2026-06-23', time: '17:00', status: 'finished' },
  { id: '537411', stage: 'group', group: 'L', home: 'ENG', away: 'GHA', homeScore: 0, awayScore: 0, date: '2026-06-23', time: '20:00', status: 'finished' },
  { id: '537412', stage: 'group', group: 'L', home: 'PAN', away: 'CRO', homeScore: 0, awayScore: 1, date: '2026-06-23', time: '23:00', status: 'finished' },
  { id: '537406', stage: 'group', group: 'K', home: 'COL', away: 'COD', homeScore: 1, awayScore: 0, date: '2026-06-24', time: '02:00', status: 'finished' },
  { id: '537337', stage: 'group', group: 'B', home: 'SUI', away: 'CAN', homeScore: 2, awayScore: 1, date: '2026-06-24', time: '19:00', status: 'finished' },
  { id: '537338', stage: 'group', group: 'B', home: 'BIH', away: 'QAT', homeScore: 3, awayScore: 1, date: '2026-06-24', time: '19:00', status: 'finished' },
  { id: '537344', stage: 'group', group: 'C', home: 'MAR', away: 'HAI', homeScore: 4, awayScore: 2, date: '2026-06-24', time: '22:00', status: 'finished' },
  { id: '537343', stage: 'group', group: 'C', home: 'SCO', away: 'BRA', homeScore: 0, awayScore: 3, date: '2026-06-24', time: '22:00', status: 'finished' },
  { id: '537331', stage: 'group', group: 'A', home: 'CZE', away: 'MEX', homeScore: 0, awayScore: 3, date: '2026-06-25', time: '01:00', status: 'finished' },
  { id: '537332', stage: 'group', group: 'A', home: 'RSA', away: 'KOR', homeScore: 1, awayScore: 0, date: '2026-06-25', time: '01:00', status: 'finished' },
  { id: '537355', stage: 'group', group: 'E', home: 'ECU', away: 'GER', homeScore: 2, awayScore: 1, date: '2026-06-25', time: '20:00', status: 'finished' },
  { id: '537356', stage: 'group', group: 'E', home: 'CUW', away: 'CIV', homeScore: 0, awayScore: 2, date: '2026-06-25', time: '20:00', status: 'finished' },
  { id: '537361', stage: 'group', group: 'F', home: 'TUN', away: 'NED', homeScore: 1, awayScore: 3, date: '2026-06-25', time: '23:00', status: 'finished' },
  { id: '537362', stage: 'group', group: 'F', home: 'JPN', away: 'SWE', homeScore: 1, awayScore: 1, date: '2026-06-25', time: '23:00', status: 'finished' },
  { id: '537349', stage: 'group', group: 'D', home: 'TUR', away: 'USA', homeScore: 3, awayScore: 2, date: '2026-06-26', time: '02:00', status: 'finished' },
  { id: '537350', stage: 'group', group: 'D', home: 'PAR', away: 'AUS', homeScore: 0, awayScore: 0, date: '2026-06-26', time: '02:00', status: 'finished' },
  { id: '537395', stage: 'group', group: 'I', home: 'NOR', away: 'FRA', homeScore: 1, awayScore: 4, date: '2026-06-26', time: '19:00', status: 'finished' },
  { id: '537396', stage: 'group', group: 'I', home: 'SEN', away: 'IRQ', homeScore: 5, awayScore: 0, date: '2026-06-26', time: '19:00', status: 'finished' },
  { id: '537373', stage: 'group', group: 'H', home: 'URU', away: 'ESP', homeScore: 0, awayScore: 1, date: '2026-06-27', time: '00:00', status: 'finished' },
  { id: '537374', stage: 'group', group: 'H', home: 'CPV', away: 'KSA', homeScore: 0, awayScore: 0, date: '2026-06-27', time: '00:00', status: 'finished' },
  { id: '537367', stage: 'group', group: 'G', home: 'NZL', away: 'BEL', homeScore: 1, awayScore: 5, date: '2026-06-27', time: '03:00', status: 'finished' },
  { id: '537368', stage: 'group', group: 'G', home: 'EGY', away: 'IRN', homeScore: 1, awayScore: 1, date: '2026-06-27', time: '03:00', status: 'finished' },
  { id: '537413', stage: 'group', group: 'L', home: 'PAN', away: 'ENG', homeScore: 0, awayScore: 2, date: '2026-06-27', time: '21:00', status: 'finished' },
  { id: '537414', stage: 'group', group: 'L', home: 'CRO', away: 'GHA', homeScore: 2, awayScore: 1, date: '2026-06-27', time: '21:00', status: 'finished' },
  { id: '537407', stage: 'group', group: 'K', home: 'COL', away: 'POR', homeScore: 0, awayScore: 0, date: '2026-06-27', time: '23:30', status: 'finished' },
  { id: '537408', stage: 'group', group: 'K', home: 'COD', away: 'UZB', homeScore: 3, awayScore: 1, date: '2026-06-27', time: '23:30', status: 'finished' },
  { id: '537401', stage: 'group', group: 'J', home: 'JOR', away: 'ARG', homeScore: 1, awayScore: 3, date: '2026-06-28', time: '02:00', status: 'finished' },
  { id: '537402', stage: 'group', group: 'J', home: 'ALG', away: 'AUT', homeScore: 3, awayScore: 3, date: '2026-06-28', time: '02:00', status: 'finished' },
  { id: '537417', stage: 'round32', group: undefined, home: 'RSA', away: 'CAN', homeScore: 0, awayScore: 1, date: '2026-06-28', time: '19:00', status: 'finished' },
  { id: '537423', stage: 'round32', group: undefined, home: 'BRA', away: 'JPN', homeScore: 2, awayScore: 1, date: '2026-06-29', time: '17:00', status: 'finished' },
  { id: '537415', stage: 'round32', group: undefined, home: 'GER', away: 'PAR', homeScore: 4, awayScore: 5, date: '2026-06-29', time: '20:30', status: 'finished' },
  { id: '537418', stage: 'round32', group: undefined, home: 'NED', away: 'MAR', homeScore: 3, awayScore: 4, date: '2026-06-30', time: '01:00', status: 'finished' },
  { id: '537424', stage: 'round32', group: undefined, home: 'CIV', away: 'NOR', homeScore: 1, awayScore: 2, date: '2026-06-30', time: '17:00', status: 'finished' },
  { id: '537416', stage: 'round32', group: undefined, home: 'FRA', away: 'SWE', homeScore: 3, awayScore: 0, date: '2026-06-30', time: '21:00', status: 'finished' },
  { id: '537425', stage: 'round32', group: undefined, home: 'MEX', away: 'ECU', homeScore: 2, awayScore: 0, date: '2026-07-01', time: '02:00', status: 'finished' },
  { id: '537426', stage: 'round32', group: undefined, home: 'ENG', away: 'COD', homeScore: 2, awayScore: 1, date: '2026-07-01', time: '16:00', status: 'finished' },
  { id: '537422', stage: 'round32', group: undefined, home: 'BEL', away: 'SEN', homeScore: 3, awayScore: 2, date: '2026-07-01', time: '20:00', status: 'finished' },
  { id: '537421', stage: 'round32', group: undefined, home: 'USA', away: 'BIH', homeScore: 2, awayScore: 0, date: '2026-07-02', time: '00:00', status: 'finished' },
  { id: '537420', stage: 'round32', group: undefined, home: 'ESP', away: 'AUT', homeScore: 3, awayScore: 0, date: '2026-07-02', time: '19:00', status: 'finished' },
  { id: '537419', stage: 'round32', group: undefined, home: 'POR', away: 'CRO', homeScore: 2, awayScore: 1, date: '2026-07-02', time: '23:00', status: 'finished' },
  { id: '537429', stage: 'round32', group: undefined, home: 'SUI', away: 'ALG', homeScore: 2, awayScore: 0, date: '2026-07-03', time: '03:00', status: 'finished' },
  { id: '537428', stage: 'round32', group: undefined, home: 'AUS', away: 'EGY', homeScore: 3, awayScore: 5, date: '2026-07-03', time: '18:00', status: 'finished' },
  { id: '537427', stage: 'round32', group: undefined, home: 'ARG', away: 'CPV', homeScore: 3, awayScore: 2, date: '2026-07-03', time: '22:00', status: 'finished' },
  { id: '537430', stage: 'round32', group: undefined, home: 'COL', away: 'GHA', homeScore: 1, awayScore: 0, date: '2026-07-04', time: '01:30', status: 'finished' },
  { id: '537376', stage: 'round16', group: undefined, home: 'CAN', away: 'MAR', homeScore: 0, awayScore: 3, date: '2026-07-04', time: '17:00', status: 'finished' },
  { id: '537375', stage: 'round16', group: undefined, home: 'PAR', away: 'FRA', homeScore: 0, awayScore: 1, date: '2026-07-04', time: '21:00', status: 'finished' },
  { id: '537377', stage: 'round16', group: undefined, home: 'BRA', away: 'NOR', homeScore: 1, awayScore: 2, date: '2026-07-05', time: '20:00', status: 'finished' },
  { id: '537378', stage: 'round16', group: undefined, home: 'MEX', away: 'ENG', homeScore: 2, awayScore: 3, date: '2026-07-06', time: '01:00', status: 'finished' },
  { id: '537379', stage: 'round16', group: undefined, home: 'POR', away: 'ESP', homeScore: 0, awayScore: 1, date: '2026-07-06', time: '19:00', status: 'finished' },
  { id: '537380', stage: 'round16', group: undefined, home: 'USA', away: 'BEL', homeScore: 1, awayScore: 4, date: '2026-07-07', time: '00:00', status: 'finished' },
  { id: '537381', stage: 'round16', group: undefined, home: 'ARG', away: 'EGY', homeScore: 3, awayScore: 2, date: '2026-07-07', time: '16:00', status: 'finished' },
  { id: '537382', stage: 'round16', group: undefined, home: 'SUI', away: 'COL', homeScore: 4, awayScore: 3, date: '2026-07-07', time: '20:00', status: 'finished' },
  { id: '537383', stage: 'quarter', group: undefined, home: 'FRA', away: 'MAR', homeScore: 2, awayScore: 0, date: '2026-07-09', time: '20:00', status: 'finished' },
  { id: '537384', stage: 'quarter', group: undefined, home: 'ESP', away: 'BEL', homeScore: 2, awayScore: 1, date: '2026-07-10', time: '19:00', status: 'finished' },
  { id: '537385', stage: 'quarter', group: undefined, home: 'NOR', away: 'ENG', homeScore: 1, awayScore: 2, date: '2026-07-11', time: '21:00', status: 'finished' },
  { id: '537386', stage: 'quarter', group: undefined, home: 'ARG', away: 'SUI', homeScore: 3, awayScore: 1, date: '2026-07-12', time: '01:00', status: 'finished' },
  { id: '537387', stage: 'semi', group: undefined, home: 'FRA', away: 'ESP', homeScore: 0, awayScore: 2, date: '2026-07-14', time: '19:00', status: 'finished' },
  { id: '537388', stage: 'semi', group: undefined, home: 'ENG', away: 'ARG', homeScore: 1, awayScore: 2, date: '2026-07-15', time: '19:00', status: 'finished' },
  { id: '537389', stage: 'third-place', group: undefined, home: 'FRA', away: 'ENG', homeScore: null, awayScore: null, date: '2026-07-18', time: '21:00', status: 'scheduled' },
  { id: '537390', stage: 'final', group: undefined, home: 'ESP', away: 'ARG', homeScore: null, awayScore: null, date: '2026-07-19', time: '19:00', status: 'scheduled' },
];

export const players: Player[] = [
  { name: 'Kylian Mbappé', team: 'FRA', goals: 8, assists: 2, penalties: 1 },
  { name: 'Lionel Messi', team: 'ARG', goals: 8, assists: 4, penalties: 0 },
  { name: 'Erling Haaland', team: 'NOR', goals: 7, assists: 0, penalties: 0 },
  { name: 'Harry Kane', team: 'ENG', goals: 6, assists: 1, penalties: 2 },
  { name: 'Jude Bellingham', team: 'ENG', goals: 6, assists: 1, penalties: 0 },
  { name: 'Mikel Oyarzabal', team: 'ESP', goals: 5, assists: 1, penalties: 1 },
  { name: 'Ousmane Dembélé', team: 'FRA', goals: 5, assists: 2, penalties: 0 },
  { name: 'Julián Quiñones', team: 'MEX', goals: 4, assists: 1, penalties: 0 },
  { name: 'Vinicius Junior', team: 'BRA', goals: 4, assists: 1, penalties: 0 },
  { name: 'Ismaïla Sarr', team: 'SEN', goals: 4, assists: 1, penalties: 0 },
  { name: 'Raúl Jiménez', team: 'MEX', goals: 3, assists: 0, penalties: 1 },
  { name: 'Folarin Balogun', team: 'USA', goals: 3, assists: 0, penalties: 0 },
  { name: 'Ismael Saibari', team: 'MAR', goals: 3, assists: 0, penalties: 0 },
  { name: 'Kai Havertz', team: 'GER', goals: 3, assists: 0, penalties: 1 },
  { name: 'Deniz Undav', team: 'GER', goals: 3, assists: 2, penalties: 0 },
  { name: 'Elijah Just', team: 'NZL', goals: 3, assists: 0, penalties: 0 },
  { name: 'Yoane Wissa', team: 'COD', goals: 3, assists: 0, penalties: 1 },
  { name: 'Johan Manzambi', team: 'SUI', goals: 3, assists: 2, penalties: 0 },
  { name: 'Jonathan David', team: 'CAN', goals: 3, assists: 0, penalties: 0 },
  { name: 'Matheus Cunha', team: 'BRA', goals: 3, assists: 0, penalties: 0 },
  { name: 'Brian Brobbey', team: 'NED', goals: 3, assists: 0, penalties: 0 },
  { name: 'Cody Gakpo', team: 'NED', goals: 3, assists: 1, penalties: 0 },
  { name: 'Cristiano Ronaldo', team: 'POR', goals: 3, assists: 0, penalties: 1 },
  { name: 'Romelu Lukaku', team: 'BEL', goals: 3, assists: 1, penalties: 0 },
  { name: 'Lautaro Martínez', team: 'ARG', goals: 3, assists: 1, penalties: 1 },
  { name: 'Charles De Ketelaere', team: 'BEL', goals: 3, assists: 1, penalties: 0 },
  { name: 'Cyle Larin', team: 'CAN', goals: 2, assists: 0, penalties: 0 },
  { name: 'Breel Embolo', team: 'SUI', goals: 2, assists: 2, penalties: 1 },
  { name: 'Crysencio Summerville', team: 'NED', goals: 2, assists: 2, penalties: 0 },
  { name: 'Daichi Kamada', team: 'JPN', goals: 2, assists: 0, penalties: 0 },
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
