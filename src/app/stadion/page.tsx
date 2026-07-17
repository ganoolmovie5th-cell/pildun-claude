import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Stadion Piala Dunia 2026',
  description: '16 stadion tuan rumah Piala Dunia FIFA 2026 di USA, Meksiko, dan Kanada. Kota, kapasitas, dan negara.',
};

// ponytail: data statis fakta publik (16 venue resmi FIFA). Data API tak menyertakan venue,
// jadi hardcode di sini — jarang berubah sepanjang turnamen.
const VENUES: { name: string; city: string; country: 'USA' | 'Meksiko' | 'Kanada'; capacity: number }[] = [
  { name: 'MetLife Stadium', city: 'New York / New Jersey', country: 'USA', capacity: 82500 },
  { name: 'SoFi Stadium', city: 'Los Angeles', country: 'USA', capacity: 70240 },
  { name: 'AT&T Stadium', city: 'Dallas', country: 'USA', capacity: 80000 },
  { name: 'Mercedes-Benz Stadium', city: 'Atlanta', country: 'USA', capacity: 71000 },
  { name: 'NRG Stadium', city: 'Houston', country: 'USA', capacity: 72220 },
  { name: 'Arrowhead Stadium', city: 'Kansas City', country: 'USA', capacity: 76416 },
  { name: "Levi's Stadium", city: 'San Francisco Bay Area', country: 'USA', capacity: 68500 },
  { name: 'Lumen Field', city: 'Seattle', country: 'USA', capacity: 68740 },
  { name: 'Gillette Stadium', city: 'Boston', country: 'USA', capacity: 65878 },
  { name: 'Hard Rock Stadium', city: 'Miami', country: 'USA', capacity: 65326 },
  { name: 'Lincoln Financial Field', city: 'Philadelphia', country: 'USA', capacity: 69176 },
  { name: 'Estadio Azteca', city: 'Mexico City', country: 'Meksiko', capacity: 87523 },
  { name: 'Estadio Akron', city: 'Guadalajara', country: 'Meksiko', capacity: 49813 },
  { name: 'Estadio BBVA', city: 'Monterrey', country: 'Meksiko', capacity: 53500 },
  { name: 'BC Place', city: 'Vancouver', country: 'Kanada', capacity: 54500 },
  { name: 'BMO Field', city: 'Toronto', country: 'Kanada', capacity: 45500 },
];

const FLAG: Record<string, string> = { USA: '\u{1F1FA}\u{1F1F8}', Meksiko: '\u{1F1F2}\u{1F1FD}', Kanada: '\u{1F1E8}\u{1F1E6}' };

export default function StadionPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="host-bar h-1 rounded-full mb-6" />
      <div className="mb-8">
        <h1 className="font-display font-bold text-3xl sm:text-4xl uppercase mb-2">Stadion</h1>
        <p className="text-text-muted">16 venue resmi Piala Dunia 2026 di 3 negara tuan rumah.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {VENUES.map((v) => (
          <div key={v.name} className="card card-hover rounded-lg p-5">
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="font-display font-bold text-lg leading-tight uppercase">{v.name}</p>
              <span className="text-lg shrink-0" title={v.country}>{FLAG[v.country]}</span>
            </div>
            <p className="text-sm text-text-muted">{v.city}</p>
            <p className="text-xs text-text-dim mt-3 uppercase tracking-wide">
              Kapasitas <span className="score-num text-text ml-1">{v.capacity.toLocaleString('id-ID')}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
