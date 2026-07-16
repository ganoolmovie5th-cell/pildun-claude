// Konversi tanggal+jam UTC dari data ke jam WIB (Asia/Jakarta).
export function toWIB(date: string, time: string): string {
  return new Date(`${date}T${time}:00Z`).toLocaleTimeString('id-ID', {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
  });
}
