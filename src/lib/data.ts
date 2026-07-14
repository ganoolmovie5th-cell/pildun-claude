// Piala Dunia FIFA 2026 — Data statis (placeholder realistis)
// Turnamen berlangsung 11 Jun - 19 Jul 2026 (USA, Meksiko, Kanada)
// Skor placeholder — edit manual saat hasil asli keluar.

export type Confederation = 'UEFA' | 'CONMEBOL' | 'CONCACAF' | 'CAF' | 'AFC' | 'OFC';
export type Stage = 'group' | 'round32' | 'round16' | 'quarter' | 'semi' | 'third-place' | 'final';
export type MatchStatus = 'scheduled' | 'live' | 'finished';

export interface Team {
  code: string;
  name: string;
  flag: string;
  group: string;
  confederation: Confederation;
  fifaRank: number;
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
  stadium: string;
  city: string;
  status: MatchStatus;
}

export interface Player {
  name: string;
  team: string;
  goals: number;
  assists: number;
  yellowCards: number;
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

export const CONFED_LABELS: Record<Confederation, string> = {
  UEFA: 'Eropa',
  CONMEBOL: 'Amerika Selatan',
  CONCACAF: 'Amerika Utara',
  CAF: 'Afrika',
  AFC: 'Asia',
  OFC: 'Oseania',
};

export const teams: Team[] = [
  // Grup A
  { code: 'USA', name: 'Amerika Serikat', flag: '🇺🇸', group: 'A', confederation: 'CONCACAF', fifaRank: 16 },
  { code: 'WAL', name: 'Wales', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', group: 'A', confederation: 'UEFA', fifaRank: 30 },
  { code: 'IRN', name: 'Iran', flag: '🇮🇷', group: 'A', confederation: 'AFC', fifaRank: 20 },
  { code: 'SEN', name: 'Senegal', flag: '🇸🇳', group: 'A', confederation: 'CAF', fifaRank: 18 },
  // Grup B
  { code: 'MEX', name: 'Meksiko', flag: '🇲🇽', group: 'B', confederation: 'CONCACAF', fifaRank: 15 },
  { code: 'POL', name: 'Polandia', flag: '🇵🇱', group: 'B', confederation: 'UEFA', fifaRank: 28 },
  { code: 'EGY', name: 'Mesir', flag: '🇪🇬', group: 'B', confederation: 'CAF', fifaRank: 33 },
  { code: 'KOR', name: 'Korea Selatan', flag: '🇰🇷', group: 'B', confederation: 'AFC', fifaRank: 23 },
  // Grup C
  { code: 'CAN', name: 'Kanada', flag: '🇨🇦', group: 'C', confederation: 'CONCACAF', fifaRank: 31 },
  { code: 'CRO', name: 'Kroasia', flag: '🇭🇷', group: 'C', confederation: 'UEFA', fifaRank: 10 },
  { code: 'ECU', name: 'Ekuador', flag: '🇪🇨', group: 'C', confederation: 'CONMEBOL', fifaRank: 26 },
  { code: 'CIV', name: 'Pantai Gading', flag: '🇨🇮', group: 'C', confederation: 'CAF', fifaRank: 40 },
  // Grup D
  { code: 'ARG', name: 'Argentina', flag: '🇦🇷', group: 'D', confederation: 'CONMEBOL', fifaRank: 1 },
  { code: 'AUS', name: 'Australia', flag: '🇦🇺', group: 'D', confederation: 'AFC', fifaRank: 25 },
  { code: 'NGA', name: 'Nigeria', flag: '🇳🇬', group: 'D', confederation: 'CAF', fifaRank: 39 },
  { code: 'UZB', name: 'Uzbekistan', flag: '🇺🇿', group: 'D', confederation: 'AFC', fifaRank: 57 },
  // Grup E
  { code: 'FRA', name: 'Prancis', flag: '🇫🇷', group: 'E', confederation: 'UEFA', fifaRank: 2 },
  { code: 'NOR', name: 'Norwegia', flag: '🇳🇴', group: 'E', confederation: 'UEFA', fifaRank: 24 },
  { code: 'JPN', name: 'Jepang', flag: '🇯🇵', group: 'E', confederation: 'AFC', fifaRank: 17 },
  { code: 'PAN', name: 'Panama', flag: '🇵🇦', group: 'E', confederation: 'CONCACAF', fifaRank: 41 },
  // Grup F
  { code: 'BRA', name: 'Brasil', flag: '🇧🇷', group: 'F', confederation: 'CONMEBOL', fifaRank: 5 },
  { code: 'SUI', name: 'Swiss', flag: '🇨🇭', group: 'F', confederation: 'UEFA', fifaRank: 19 },
  { code: 'CMR', name: 'Kamerun', flag: '🇨🇲', group: 'F', confederation: 'CAF', fifaRank: 42 },
  { code: 'QAT', name: 'Qatar', flag: '🇶🇦', group: 'F', confederation: 'AFC', fifaRank: 36 },
  // Grup G
  { code: 'ENG', name: 'Inggris', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', group: 'G', confederation: 'UEFA', fifaRank: 4 },
  { code: 'SRB', name: 'Serbia', flag: '🇷🇸', group: 'G', confederation: 'UEFA', fifaRank: 29 },
  { code: 'KSA', name: 'Arab Saudi', flag: '🇸🇦', group: 'G', confederation: 'AFC', fifaRank: 58 },
  { code: 'CRC', name: 'Kosta Rika', flag: '🇨🇷', group: 'G', confederation: 'CONCACAF', fifaRank: 52 },
  // Grup H
  { code: 'ESP', name: 'Spanyol', flag: '🇪🇸', group: 'H', confederation: 'UEFA', fifaRank: 3 },
  { code: 'DEN', name: 'Denmark', flag: '🇩🇰', group: 'H', confederation: 'UEFA', fifaRank: 21 },
  { code: 'GHA', name: 'Ghana', flag: '🇬🇭', group: 'H', confederation: 'CAF', fifaRank: 45 },
  { code: 'NZL', name: 'Selandia Baru', flag: '🇳🇿', group: 'H', confederation: 'OFC', fifaRank: 86 },
  // Grup I
  { code: 'POR', name: 'Portugal', flag: '🇵🇹', group: 'I', confederation: 'UEFA', fifaRank: 6 },
  { code: 'URU', name: 'Uruguay', flag: '🇺🇾', group: 'I', confederation: 'CONMEBOL', fifaRank: 11 },
  { code: 'MAR', name: 'Maroko', flag: '🇲🇦', group: 'I', confederation: 'CAF', fifaRank: 12 },
  { code: 'JOR', name: 'Yordania', flag: '🇯🇴', group: 'I', confederation: 'AFC', fifaRank: 64 },
  // Grup J
  { code: 'GER', name: 'Jerman', flag: '🇩🇪', group: 'J', confederation: 'UEFA', fifaRank: 9 },
  { code: 'COL', name: 'Kolombia', flag: '🇨🇴', group: 'J', confederation: 'CONMEBOL', fifaRank: 14 },
  { code: 'TUN', name: 'Tunisia', flag: '🇹🇳', group: 'J', confederation: 'CAF', fifaRank: 44 },
  { code: 'CUW', name: 'Curacao', flag: '🇨🇼', group: 'J', confederation: 'CONCACAF', fifaRank: 82 },
  // Grup K
  { code: 'NED', name: 'Belanda', flag: '🇳🇱', group: 'K', confederation: 'UEFA', fifaRank: 7 },
  { code: 'SWE', name: 'Swedia', flag: '🇸🇪', group: 'K', confederation: 'UEFA', fifaRank: 22 },
  { code: 'ALG', name: 'Aljazair', flag: '🇩🇿', group: 'K', confederation: 'CAF', fifaRank: 38 },
  { code: 'HON', name: 'Honduras', flag: '🇭🇳', group: 'K', confederation: 'CONCACAF', fifaRank: 68 },
  // Grup L
  { code: 'ITA', name: 'Italia', flag: '🇮🇹', group: 'L', confederation: 'UEFA', fifaRank: 8 },
  { code: 'AUT', name: 'Austria', flag: '🇦🇹', group: 'L', confederation: 'UEFA', fifaRank: 27 },
  { code: 'MLI', name: 'Mali', flag: '🇲🇱', group: 'L', confederation: 'CAF', fifaRank: 48 },
  { code: 'JAM', name: 'Jamaika', flag: '🇯🇲', group: 'L', confederation: 'CONCACAF', fifaRank: 60 },
];

// Match helper untuk keringkasan
const m = (
  id: string, stage: Stage, home: string, away: string,
  hs: number | null, as: number | null, date: string, time: string,
  stadium: string, city: string, group?: string,
): Match => ({
  id, stage, group, home, away, homeScore: hs, awayScore: as,
  date, time, stadium, city,
  status: hs === null ? 'scheduled' : 'finished',
});

export const matches: Match[] = [
  // ── GRUP A ──
  m('A1', 'group', 'USA', 'WAL', 2, 0, '2026-06-12', '20:00', 'SoFi Stadium', 'Los Angeles', 'A'),
  m('A2', 'group', 'SEN', 'IRN', 2, 1, '2026-06-12', '17:00', 'MetLife Stadium', 'New York', 'A'),
  m('A3', 'group', 'USA', 'IRN', 1, 1, '2026-06-18', '20:00', 'SoFi Stadium', 'Los Angeles', 'A'),
  m('A4', 'group', 'SEN', 'WAL', 3, 1, '2026-06-18', '17:00', 'Lumen Field', 'Seattle', 'A'),
  m('A5', 'group', 'SEN', 'USA', 2, 1, '2026-06-24', '18:00', 'SoFi Stadium', 'Los Angeles', 'A'),
  m('A6', 'group', 'IRN', 'WAL', 2, 1, '2026-06-24', '18:00', 'Lumen Field', 'Seattle', 'A'),
  // ── GRUP B ──
  m('B1', 'group', 'MEX', 'POL', 2, 0, '2026-06-11', '20:00', 'Estadio Azteca', 'Mexico City', 'B'),
  m('B2', 'group', 'KOR', 'EGY', 1, 1, '2026-06-13', '17:00', 'Estadio Akron', 'Guadalajara', 'B'),
  m('B3', 'group', 'MEX', 'EGY', 3, 1, '2026-06-18', '20:00', 'Estadio Azteca', 'Mexico City', 'B'),
  m('B4', 'group', 'KOR', 'POL', 2, 1, '2026-06-18', '17:00', 'Estadio Akron', 'Guadalajara', 'B'),
  m('B5', 'group', 'MEX', 'KOR', 1, 1, '2026-06-24', '18:00', 'Estadio Azteca', 'Mexico City', 'B'),
  m('B6', 'group', 'POL', 'EGY', 2, 2, '2026-06-24', '18:00', 'Estadio Akron', 'Guadalajara', 'B'),
  // ── GRUP C ──
  m('C1', 'group', 'CRO', 'ECU', 2, 1, '2026-06-13', '20:00', 'BMO Field', 'Toronto', 'C'),
  m('C2', 'group', 'CAN', 'CIV', 2, 0, '2026-06-13', '17:00', 'BC Place', 'Vancouver', 'C'),
  m('C3', 'group', 'CRO', 'CIV', 3, 0, '2026-06-19', '20:00', 'BMO Field', 'Toronto', 'C'),
  m('C4', 'group', 'CAN', 'ECU', 1, 1, '2026-06-19', '17:00', 'BC Place', 'Vancouver', 'C'),
  m('C5', 'group', 'CRO', 'CAN', 2, 1, '2026-06-25', '18:00', 'BMO Field', 'Toronto', 'C'),
  m('C6', 'group', 'ECU', 'CIV', 2, 1, '2026-06-25', '18:00', 'BC Place', 'Vancouver', 'C'),
  // ── GRUP D ──
  m('D1', 'group', 'ARG', 'AUS', 3, 0, '2026-06-14', '20:00', 'Hard Rock Stadium', 'Miami', 'D'),
  m('D2', 'group', 'NGA', 'UZB', 2, 1, '2026-06-14', '17:00', 'Mercedes-Benz Stadium', 'Atlanta', 'D'),
  m('D3', 'group', 'ARG', 'UZB', 4, 0, '2026-06-20', '20:00', 'Hard Rock Stadium', 'Miami', 'D'),
  m('D4', 'group', 'NGA', 'AUS', 2, 1, '2026-06-20', '17:00', 'Mercedes-Benz Stadium', 'Atlanta', 'D'),
  m('D5', 'group', 'ARG', 'NGA', 2, 1, '2026-06-26', '18:00', 'Hard Rock Stadium', 'Miami', 'D'),
  m('D6', 'group', 'AUS', 'UZB', 1, 1, '2026-06-26', '18:00', 'Mercedes-Benz Stadium', 'Atlanta', 'D'),
  // ── GRUP E ──
  m('E1', 'group', 'FRA', 'NOR', 2, 1, '2026-06-14', '20:00', 'NRG Stadium', 'Houston', 'E'),
  m('E2', 'group', 'JPN', 'PAN', 3, 0, '2026-06-14', '17:00', 'AT&T Stadium', 'Dallas', 'E'),
  m('E3', 'group', 'FRA', 'PAN', 4, 0, '2026-06-20', '20:00', 'NRG Stadium', 'Houston', 'E'),
  m('E4', 'group', 'JPN', 'NOR', 1, 1, '2026-06-20', '17:00', 'AT&T Stadium', 'Dallas', 'E'),
  m('E5', 'group', 'FRA', 'JPN', 2, 1, '2026-06-26', '18:00', 'NRG Stadium', 'Houston', 'E'),
  m('E6', 'group', 'NOR', 'PAN', 3, 1, '2026-06-26', '18:00', 'AT&T Stadium', 'Dallas', 'E'),
  // ── GRUP F ──
  m('F1', 'group', 'BRA', 'SUI', 2, 0, '2026-06-15', '20:00', 'Lincoln Financial Field', 'Philadelphia', 'F'),
  m('F2', 'group', 'CMR', 'QAT', 1, 1, '2026-06-15', '17:00', 'Arrowhead Stadium', 'Kansas City', 'F'),
  m('F3', 'group', 'BRA', 'QAT', 3, 0, '2026-06-21', '20:00', 'Lincoln Financial Field', 'Philadelphia', 'F'),
  m('F4', 'group', 'SUI', 'CMR', 2, 1, '2026-06-21', '17:00', 'Arrowhead Stadium', 'Kansas City', 'F'),
  m('F5', 'group', 'BRA', 'CMR', 2, 1, '2026-06-27', '18:00', 'Lincoln Financial Field', 'Philadelphia', 'F'),
  m('F6', 'group', 'SUI', 'QAT', 2, 0, '2026-06-27', '18:00', 'Arrowhead Stadium', 'Kansas City', 'F'),
  // ── GRUP G ──
  m('G1', 'group', 'ENG', 'SRB', 2, 0, '2026-06-15', '20:00', 'Gillette Stadium', 'Boston', 'G'),
  m('G2', 'group', 'CRC', 'KSA', 1, 1, '2026-06-15', '17:00', 'Levi\'s Stadium', 'San Francisco', 'G'),
  m('G3', 'group', 'ENG', 'KSA', 3, 0, '2026-06-21', '20:00', 'Gillette Stadium', 'Boston', 'G'),
  m('G4', 'group', 'SRB', 'CRC', 2, 1, '2026-06-21', '17:00', 'Levi\'s Stadium', 'San Francisco', 'G'),
  m('G5', 'group', 'ENG', 'CRC', 2, 0, '2026-06-27', '18:00', 'Gillette Stadium', 'Boston', 'G'),
  m('G6', 'group', 'SRB', 'KSA', 2, 1, '2026-06-27', '18:00', 'Levi\'s Stadium', 'San Francisco', 'G'),
  // ── GRUP H ──
  m('H1', 'group', 'ESP', 'DEN', 2, 1, '2026-06-16', '20:00', 'MetLife Stadium', 'New York', 'H'),
  m('H2', 'group', 'GHA', 'NZL', 2, 0, '2026-06-16', '17:00', 'BC Place', 'Vancouver', 'H'),
  m('H3', 'group', 'ESP', 'NZL', 4, 0, '2026-06-22', '20:00', 'MetLife Stadium', 'New York', 'H'),
  m('H4', 'group', 'DEN', 'GHA', 2, 1, '2026-06-22', '17:00', 'BC Place', 'Vancouver', 'H'),
  m('H5', 'group', 'ESP', 'GHA', 3, 0, '2026-06-27', '18:00', 'MetLife Stadium', 'New York', 'H'),
  m('H6', 'group', 'DEN', 'NZL', 2, 0, '2026-06-27', '18:00', 'BC Place', 'Vancouver', 'H'),
  // ── GRUP I ──
  m('I1', 'group', 'POR', 'URU', 2, 1, '2026-06-16', '20:00', 'Estadio Monterrey', 'Monterrey', 'I'),
  m('I2', 'group', 'MAR', 'JOR', 2, 0, '2026-06-17', '17:00', 'Estadio Azteca', 'Mexico City', 'I'),
  m('I3', 'group', 'POR', 'JOR', 3, 0, '2026-06-22', '20:00', 'Estadio Monterrey', 'Monterrey', 'I'),
  m('I4', 'group', 'MAR', 'URU', 1, 1, '2026-06-22', '17:00', 'Estadio Azteca', 'Mexico City', 'I'),
  m('I5', 'group', 'POR', 'MAR', 2, 1, '2026-06-28', '18:00', 'Estadio Monterrey', 'Monterrey', 'I'),
  m('I6', 'group', 'URU', 'JOR', 3, 0, '2026-06-28', '18:00', 'Estadio Azteca', 'Mexico City', 'I'),
  // ── GRUP J ──
  m('J1', 'group', 'GER', 'COL', 2, 1, '2026-06-17', '20:00', 'AT&T Stadium', 'Dallas', 'J'),
  m('J2', 'group', 'TUN', 'CUW', 2, 0, '2026-06-17', '17:00', 'NRG Stadium', 'Houston', 'J'),
  m('J3', 'group', 'GER', 'CUW', 4, 0, '2026-06-23', '20:00', 'AT&T Stadium', 'Dallas', 'J'),
  m('J4', 'group', 'COL', 'TUN', 2, 0, '2026-06-23', '17:00', 'NRG Stadium', 'Houston', 'J'),
  m('J5', 'group', 'GER', 'TUN', 2, 0, '2026-06-28', '18:00', 'AT&T Stadium', 'Dallas', 'J'),
  m('J6', 'group', 'COL', 'CUW', 3, 0, '2026-06-28', '18:00', 'NRG Stadium', 'Houston', 'J'),
  // ── GRUP K ──
  m('K1', 'group', 'NED', 'SWE', 2, 1, '2026-06-18', '20:00', 'Lincoln Financial Field', 'Philadelphia', 'K'),
  m('K2', 'group', 'ALG', 'HON', 2, 0, '2026-06-18', '17:00', 'Arrowhead Stadium', 'Kansas City', 'K'),
  m('K3', 'group', 'NED', 'HON', 3, 0, '2026-06-24', '20:00', 'Lincoln Financial Field', 'Philadelphia', 'K'),
  m('K4', 'group', 'SWE', 'ALG', 2, 1, '2026-06-24', '17:00', 'Arrowhead Stadium', 'Kansas City', 'K'),
  m('K5', 'group', 'NED', 'ALG', 2, 0, '2026-06-29', '18:00', 'Lincoln Financial Field', 'Philadelphia', 'K'),
  m('K6', 'group', 'SWE', 'HON', 3, 1, '2026-06-29', '18:00', 'Arrowhead Stadium', 'Kansas City', 'K'),
  // ── GRUP L ──
  m('L1', 'group', 'ITA', 'AUT', 2, 1, '2026-06-19', '20:00', 'Mercedes-Benz Stadium', 'Atlanta', 'L'),
  m('L2', 'group', 'MLI', 'JAM', 1, 0, '2026-06-19', '17:00', 'Hard Rock Stadium', 'Miami', 'L'),
  m('L3', 'group', 'ITA', 'JAM', 3, 0, '2026-06-25', '20:00', 'Mercedes-Benz Stadium', 'Atlanta', 'L'),
  m('L4', 'group', 'AUT', 'MLI', 2, 1, '2026-06-25', '17:00', 'Hard Rock Stadium', 'Miami', 'L'),
  m('L5', 'group', 'ITA', 'MLI', 2, 0, '2026-06-29', '18:00', 'Mercedes-Benz Stadium', 'Atlanta', 'L'),
  m('L6', 'group', 'AUT', 'JAM', 3, 1, '2026-06-29', '18:00', 'Hard Rock Stadium', 'Miami', 'L'),
  // ── BABAK 32 BESAR ──
  m('R32-1',  'round32', 'ARG', 'KSA', 3, 0, '2026-06-30', '18:00', 'Hard Rock Stadium', 'Miami'),
  m('R32-2',  'round32', 'NGA', 'NOR', 2, 1, '2026-06-30', '21:00', 'AT&T Stadium', 'Dallas'),
  m('R32-3',  'round32', 'ENG', 'ECU', 2, 0, '2026-07-01', '18:00', 'Gillette Stadium', 'Boston'),
  m('R32-4',  'round32', 'SEN', 'USA', 1, 0, '2026-07-01', '21:00', 'SoFi Stadium', 'Los Angeles'),
  m('R32-5',  'round32', 'FRA', 'AUS', 4, 1, '2026-07-01', '15:00', 'NRG Stadium', 'Houston'),
  m('R32-6',  'round32', 'JPN', 'CAN', 2, 1, '2026-07-02', '18:00', 'BC Place', 'Vancouver'),
  m('R32-7',  'round32', 'POR', 'IRN', 3, 1, '2026-07-02', '21:00', 'Estadio Monterrey', 'Monterrey'),
  m('R32-8',  'round32', 'MAR', 'POL', 1, 0, '2026-07-02', '15:00', 'Estadio Azteca', 'Mexico City'),
  m('R32-9',  'round32', 'ESP', 'GHA', 2, 0, '2026-07-03', '18:00', 'MetLife Stadium', 'New York'),
  m('R32-10', 'round32', 'DEN', 'CRO', 2, 1, '2026-07-03', '21:00', 'BMO Field', 'Toronto'),
  m('R32-11', 'round32', 'GER', 'URU', 3, 1, '2026-07-03', '15:00', 'Lincoln Financial Field', 'Philadelphia'),
  m('R32-12', 'round32', 'COL', 'CMR', 2, 0, '2026-07-04', '18:00', 'Arrowhead Stadium', 'Kansas City'),
  m('R32-13', 'round32', 'BRA', 'KOR', 3, 1, '2026-07-04', '21:00', 'Estadio Akron', 'Guadalajara'),
  m('R32-14', 'round32', 'SUI', 'MEX', 1, 0, '2026-07-04', '15:00', 'Estadio Azteca', 'Mexico City'),
  m('R32-15', 'round32', 'NED', 'ITA', 2, 1, '2026-07-05', '18:00', 'Mercedes-Benz Stadium', 'Atlanta', ),
  m('R32-16', 'round32', 'SWE', 'AUT', 2, 1, '2026-07-05', '21:00', 'Levi\'s Stadium', 'San Francisco'),
  // ── BABAK 16 BESAR ──
  m('R16-1', 'round16', 'ARG', 'NGA', 2, 0, '2026-07-06', '18:00', 'Hard Rock Stadium', 'Miami'),
  m('R16-2', 'round16', 'ENG', 'SEN', 1, 0, '2026-07-06', '21:00', 'Gillette Stadium', 'Boston'),
  m('R16-3', 'round16', 'FRA', 'JPN', 3, 1, '2026-07-07', '18:00', 'NRG Stadium', 'Houston'),
  m('R16-4', 'round16', 'POR', 'MAR', 2, 1, '2026-07-07', '21:00', 'Estadio Monterrey', 'Monterrey'),
  m('R16-5', 'round16', 'ESP', 'DEN', 4, 0, '2026-07-08', '18:00', 'MetLife Stadium', 'New York'),
  m('R16-6', 'round16', 'GER', 'COL', 2, 1, '2026-07-08', '21:00', 'AT&T Stadium', 'Dallas'),
  m('R16-7', 'round16', 'BRA', 'SUI', 3, 0, '2026-07-09', '18:00', 'Lincoln Financial Field', 'Philadelphia'),
  m('R16-8', 'round16', 'NED', 'SWE', 2, 1, '2026-07-09', '21:00', 'BC Place', 'Vancouver'),
  // ── PEREMPAT FINAL ──
  m('QF-1', 'quarter', 'ARG', 'ENG', 2, 1, '2026-07-11', '18:00', 'Hard Rock Stadium', 'Miami'),
  m('QF-2', 'quarter', 'FRA', 'POR', 2, 0, '2026-07-11', '21:00', 'NRG Stadium', 'Houston'),
  m('QF-3', 'quarter', 'ESP', 'GER', 3, 1, '2026-07-12', '18:00', 'MetLife Stadium', 'New York'),
  m('QF-4', 'quarter', 'BRA', 'NED', 4, 2, '2026-07-12', '21:00', 'AT&T Stadium', 'Dallas'),
  // ── SEMIFINAL ──
  m('SF-1', 'semi', 'ARG', 'FRA', 3, 2, '2026-07-14', '20:00', 'AT&T Stadium', 'Dallas'),
  m('SF-2', 'semi', 'ESP', 'BRA', 1, 0, '2026-07-15', '20:00', 'Mercedes-Benz Stadium', 'Atlanta'),
  // ── PEREBUTAN JUARA 3 ──
  m('TP-1', 'third-place', 'FRA', 'BRA', 2, 1, '2026-07-18', '18:00', 'Hard Rock Stadium', 'Miami'),
  // ── FINAL ──
  m('FIN', 'final', 'ARG', 'ESP', 2, 1, '2026-07-19', '20:00', 'MetLife Stadium', 'New York'),
];

export const players: Player[] = [
  { name: 'Lionel Messi', team: 'ARG', goals: 6, assists: 4, yellowCards: 1 },
  { name: 'Kylian Mbappé', team: 'FRA', goals: 6, assists: 2, yellowCards: 0 },
  { name: 'Julián Álvarez', team: 'ARG', goals: 5, assists: 3, yellowCards: 1 },
  { name: 'Lamine Yamal', team: 'ESP', goals: 5, assists: 4, yellowCards: 0 },
  { name: 'Vinícius Júnior', team: 'BRA', goals: 5, assists: 2, yellowCards: 2 },
  { name: 'Harry Kane', team: 'ENG', goals: 4, assists: 1, yellowCards: 0 },
  { name: 'Cristiano Ronaldo', team: 'POR', goals: 4, assists: 0, yellowCards: 1 },
  { name: 'Erling Haaland', team: 'NOR', goals: 4, assists: 1, yellowCards: 1 },
  { name: 'Kai Havertz', team: 'GER', goals: 3, assists: 2, yellowCards: 0 },
  { name: 'Ousmane Dembélé', team: 'FRA', goals: 3, assists: 3, yellowCards: 1 },
  { name: 'Nico Williams', team: 'ESP', goals: 3, assists: 2, yellowCards: 0 },
  { name: 'Rodrygo', team: 'BRA', goals: 3, assists: 2, yellowCards: 1 },
  { name: 'Sadio Mané', team: 'SEN', goals: 3, assists: 1, yellowCards: 1 },
  { name: 'Takefusa Kubo', team: 'JPN', goals: 3, assists: 2, yellowCards: 0 },
  { name: 'Victor Osimhen', team: 'NGA', goals: 3, assists: 0, yellowCards: 2 },
  { name: 'Achraf Hakimi', team: 'MAR', goals: 2, assists: 3, yellowCards: 1 },
  { name: 'Cody Gakpo', team: 'NED', goals: 2, assists: 2, yellowCards: 0 },
  { name: 'Christian Pulisic', team: 'USA', goals: 2, assists: 2, yellowCards: 0 },
  { name: 'Jude Bellingham', team: 'ENG', goals: 2, assists: 3, yellowCards: 1 },
  { name: 'Florian Wirtz', team: 'GER', goals: 2, assists: 3, yellowCards: 0 },
];

// ── Helper Functions ──────────────────────────────────────────────
export const GROUPS = ['A','B','C','D','E','F','G','H','I','J','K','L'];

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
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function getKnockoutMatches(): Match[] {
  const order: Stage[] = ['round32', 'round16', 'quarter', 'semi', 'third-place', 'final'];
  return matches
    .filter((m) => order.includes(m.stage))
    .sort((a, b) => order.indexOf(a.stage) - order.indexOf(b.stage) || a.date.localeCompare(b.date));
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

    if (match.homeScore > match.awayScore) {
      home.won++; home.points += 3; away.lost++;
    } else if (match.homeScore < match.awayScore) {
      away.won++; away.points += 3; home.lost++;
    } else {
      home.drawn++; away.drawn++; home.points++; away.points++;
    }
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

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
}
