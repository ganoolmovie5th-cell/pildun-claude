'use client';

import { useEffect, useState } from 'react';
import { teams, getChampion } from '@/lib/data';
import Crest from './Crest';

// Prediksi juara: user pilih satu tim, simpan localStorage 'champPick'.
// Saat juara resmi ada (getChampion), tampilkan benar/salah.
export default function ChampionPicker() {
  const [pick, setPick] = useState<string>('');
  const [loaded, setLoaded] = useState(false);
  const champ = getChampion();

  useEffect(() => {
    setPick(localStorage.getItem('champPick') || '');
    setLoaded(true);
  }, []);

  function choose(code: string) {
    setPick(code);
    localStorage.setItem('champPick', code);
  }

  if (!loaded) return <div className="card rounded-lg h-24 skeleton" />;

  const sorted = [...teams].sort((a, b) => a.name.localeCompare(b.name));
  const correct = champ && pick === champ.code;

  return (
    <div className="card rounded-lg p-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display font-bold text-xl uppercase">Tebak Juara</h2>
        {champ ? (
          <span className={`text-xs font-bold uppercase tracking-wide ${correct ? 'text-pitch' : 'text-accent'}`}>
            {correct ? 'Tebakan benar!' : 'Meleset'}
          </span>
        ) : pick ? (
          <span className="text-xs text-gold uppercase tracking-wide">Tersimpan</span>
        ) : null}
      </div>

      {champ && (
        <p className="text-sm text-text-muted mb-3">
          Juara resmi: <span className="font-display font-bold text-gold">{champ.name}</span>
          {pick && !correct && <> {'\u00b7'} tebakanmu {teams.find((t) => t.code === pick)?.name}</>}
        </p>
      )}

      <select
        value={pick}
        onChange={(e) => choose(e.target.value)}
        disabled={!!champ}
        className="w-full card rounded-md px-3 py-2.5 text-sm bg-surface text-text disabled:opacity-60"
        aria-label="Pilih juara"
      >
        <option value="">{champ ? 'Tidak menebak' : 'Pilih tim juara\u2026'}</option>
        {sorted.map((t) => (
          <option key={t.code} value={t.code}>{t.name}</option>
        ))}
      </select>

      {pick && (
        <div className="flex items-center gap-2.5 mt-3">
          <Crest src={teams.find((t) => t.code === pick)!.crest} alt={pick} size={26} />
          <span className="font-medium">{teams.find((t) => t.code === pick)?.name}</span>
        </div>
      )}
    </div>
  );
}
