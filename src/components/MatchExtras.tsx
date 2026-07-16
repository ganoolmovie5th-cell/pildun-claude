'use client';

import { useEffect, useState } from 'react';

interface Props {
  matchId: string;
  home: string;
  away: string;
  kickoffISO: string;
  scheduled: boolean;
  finished: boolean;
  actualHome: number | null;
  actualAway: number | null;
}

function diff(target: number) {
  const d = target - Date.now();
  if (d <= 0) return null;
  return {
    days: Math.floor(d / 86400000),
    hours: Math.floor((d % 86400000) / 3600000),
    minutes: Math.floor((d % 3600000) / 60000),
    seconds: Math.floor((d % 60000) / 1000),
  };
}

function outcome(h: number, a: number) {
  return h > a ? 'H' : h < a ? 'A' : 'D';
}

function scorePrediction(ph: number, pa: number, ah: number, aa: number) {
  if (ph === ah && pa === aa) return 3;
  if (outcome(ph, pa) === outcome(ah, aa)) return 1;
  return 0;
}

export default function MatchExtras({ matchId, home, away, kickoffISO, scheduled, finished, actualHome, actualAway }: Props) {
  const target = new Date(kickoffISO).getTime();
  const [countdown, setCountdown] = useState<ReturnType<typeof diff>>(null);
  const [homePred, setHomePred] = useState('');
  const [awayPred, setAwayPred] = useState('');
  const [saved, setSaved] = useState(false);
  const [hasPred, setHasPred] = useState(false);

  useEffect(() => {
    if (!scheduled) return;
    setCountdown(diff(target));
    const id = setInterval(() => setCountdown(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target, scheduled]);

  useEffect(() => {
    const raw = localStorage.getItem(`pred:${matchId}`);
    if (raw) {
      const p = JSON.parse(raw);
      setHomePred(String(p.home));
      setAwayPred(String(p.away));
      setSaved(true);
      setHasPred(true);
    }
  }, [matchId]);

  function savePrediction() {
    if (homePred === '' || awayPred === '') return;
    localStorage.setItem(`pred:${matchId}`, JSON.stringify({ home: Number(homePred), away: Number(awayPred) }));
    setSaved(true);
    setHasPred(true);
  }

  if (finished && hasPred && actualHome !== null && actualAway !== null) {
    const pts = scorePrediction(Number(homePred), Number(awayPred), actualHome, actualAway);
    const ptsColor = pts === 3 ? 'text-pitch' : pts === 1 ? 'text-gold' : 'text-text-dim';
    const label = pts === 3 ? 'Skor tepat!' : pts === 1 ? 'Tebakan hasil benar' : 'Meleset';
    return (
      <div className="mt-6 card rounded-lg p-5 text-center">
        <p className="text-xs text-text-dim uppercase tracking-wide mb-2">Prediksi Kamu</p>
        <p className="score-num text-2xl">
          {home} <span className="text-accent">{homePred} - {awayPred}</span> {away}
        </p>
        <p className={`mt-2 font-display font-bold text-lg ${ptsColor}`}>+{pts} poin {'\u00b7'} {label}</p>
      </div>
    );
  }

  if (!scheduled) return null;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {countdown && (
        <div className="card rounded-lg p-5">
          <p className="text-xs text-text-dim uppercase tracking-wide text-center mb-3">Kickoff dalam</p>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { v: countdown.days, l: 'Hari' },
              { v: countdown.hours, l: 'Jam' },
              { v: countdown.minutes, l: 'Menit' },
              { v: countdown.seconds, l: 'Detik' },
            ].map(({ v, l }) => (
              <div key={l} className="bg-bg-elevated rounded py-2">
                <p className="score-num text-2xl text-accent tabular-nums">{String(v).padStart(2, '0')}</p>
                <p className="text-[10px] text-text-dim">{l}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card rounded-lg p-5">
        <p className="text-xs text-text-dim uppercase tracking-wide text-center mb-3">Prediksi Skor</p>
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm font-medium w-14 text-right truncate">{home}</span>
          <input type="number" min="0" max="20" value={homePred} onChange={(e) => { setHomePred(e.target.value); setSaved(false); }}
            className="w-12 text-center score-num text-xl bg-bg-elevated rounded py-1 text-text outline-none focus:ring-2 focus:ring-accent/40" />
          <span className="text-text-dim">-</span>
          <input type="number" min="0" max="20" value={awayPred} onChange={(e) => { setAwayPred(e.target.value); setSaved(false); }}
            className="w-12 text-center score-num text-xl bg-bg-elevated rounded py-1 text-text outline-none focus:ring-2 focus:ring-accent/40" />
          <span className="text-sm font-medium w-14 truncate">{away}</span>
        </div>
        <button onClick={savePrediction}
          className="w-full mt-3 bg-accent hover:bg-accent-hover active:scale-95 text-white text-sm font-semibold py-2 rounded-md uppercase tracking-wide transition-all disabled:opacity-50"
          disabled={homePred === '' || awayPred === ''}>
          {saved ? 'Tersimpan \u2713' : 'Simpan Prediksi'}
        </button>
        <p className="text-[10px] text-text-dim text-center mt-2">Skor pas +3 poin {'\u00b7'} tebak hasil benar +1</p>
      </div>
    </div>
  );
}
