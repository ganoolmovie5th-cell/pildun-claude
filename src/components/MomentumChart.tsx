import { Match, getTeamByCode, formatDateShort } from '@/lib/data';

// Grafik momentum: tren selisih gol kumulatif tim sepanjang turnamen.
// ponytail: pakai match yang sudah selesai saja; tanpa data menit gol,
// momentum = goal-diff per match yang diakumulasi (bukan xG live).
export default function MomentumChart({ teamCode, matches }: { teamCode: string; matches: Match[] }) {
  const played = matches
    .filter((m) => m.status === 'finished' && m.homeScore !== null && m.awayScore !== null)
    .sort((a, b) => a.date.localeCompare(b.date));

  if (played.length < 2) {
    return <p className="text-sm text-text-dim">Belum cukup data untuk grafik momentum.</p>;
  }

  let cum = 0;
  const pts = played.map((m) => {
    const gf = m.home === teamCode ? m.homeScore! : m.awayScore!;
    const ga = m.home === teamCode ? m.awayScore! : m.homeScore!;
    cum += gf - ga;
    const opp = getTeamByCode(m.home === teamCode ? m.away : m.home);
    const res = gf > ga ? 'W' : gf < ga ? 'L' : 'D';
    return { cum, opp: opp?.name ?? '', date: m.date, res, gf, ga };
  });

  const W = 300, H = 90, PAD = 14;
  const vals = pts.map((p) => p.cum);
  const max = Math.max(1, ...vals), min = Math.min(-1, ...vals);
  const x = (i: number) => PAD + (i / (pts.length - 1)) * (W - 2 * PAD);
  const y = (v: number) => PAD + (1 - (v - min) / (max - min)) * (H - 2 * PAD);
  const zeroY = y(0);
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(p.cum).toFixed(1)}`).join(' ');
  const resColor = (r: string) => (r === 'W' ? 'var(--color-pitch)' : r === 'L' ? 'var(--color-accent)' : 'var(--color-gold)');

  return (
    <div className="card rounded-lg p-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24" preserveAspectRatio="none" aria-label="Grafik momentum">
        <line x1={PAD} x2={W - PAD} y1={zeroY} y2={zeroY} stroke="var(--color-line)" strokeWidth={1} strokeDasharray="3 3" />
        <path d={line} fill="none" stroke="var(--color-accent)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        {pts.map((p, i) => (
          <circle key={i} cx={x(i)} cy={y(p.cum)} r={3.5} fill={resColor(p.res)}>
            <title>{`vs ${p.opp} (${formatDateShort(p.date)}) ${p.gf}-${p.ga} \u00b7 GD kumulatif ${p.cum > 0 ? '+' : ''}${p.cum}`}</title>
          </circle>
        ))}
      </svg>
      <div className="flex flex-wrap gap-1.5 mt-3">
        {pts.map((p, i) => (
          <span key={i} className="text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded"
            style={{ color: resColor(p.res), border: `1px solid ${resColor(p.res)}` }} title={`vs ${p.opp} ${p.gf}-${p.ga}`}>
            {p.res}
          </span>
        ))}
        <span className="text-[10px] text-text-dim uppercase tracking-wide ml-2 self-center">
          GD kumulatif akhir: <span className="text-text">{pts[pts.length - 1].cum > 0 ? '+' : ''}{pts[pts.length - 1].cum}</span>
        </span>
      </div>
    </div>
  );
}
