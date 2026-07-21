// Zona waktu Indonesia + lokal browser. Dipakai filter zona di /matches.
export const TIME_ZONES = {
  WIB: { tz: 'Asia/Jakarta', label: 'WIB' },
  WITA: { tz: 'Asia/Makassar', label: 'WITA' },
  WIT: { tz: 'Asia/Jayapura', label: 'WIT' },
  LOCAL: { tz: undefined, label: 'Lokal' },
} as const;

export type TZKey = keyof typeof TIME_ZONES;

// Format jam sesuai zona pilihan (default WIB). LOCAL pakai zona browser.
export function formatTime(date: string, time: string, key: TZKey = 'WIB'): string {
  const z = TIME_ZONES[key];
  return new Date(`${date}T${time}:00Z`).toLocaleTimeString('id-ID', {
    ...(z.tz ? { timeZone: z.tz } : {}),
    hour: '2-digit',
    minute: '2-digit',
  });
}
