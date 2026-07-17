import { Metadata } from 'next';
import { GROUPS } from '@/lib/data';
import GroupTable from '@/components/GroupTable';
import LiveRefresh from '@/components/LiveRefresh';

export const metadata: Metadata = {
  title: 'Klasemen Fase Grup',
  description: 'Klasemen lengkap 12 grup Piala Dunia 2026. Poin, selisih gol, dan tim yang lolos ke babak knockout.',
};

export default function GroupsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Klasemen Fase Grup</h1>
        <p className="text-text-muted">
          12 grup, 4 tim per grup. Dua tim teratas tiap grup <span className="text-pitch font-medium">(hijau)</span> otomatis lolos, ditambah 8 peringkat-3 terbaik.
        </p>
        <div className="mt-3"><LiveRefresh /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {GROUPS.map((g) => <GroupTable key={g} group={g} />)}
      </div>
    </div>
  );
}
