// Stylized trofi bergaya Piala Dunia (bukan reproduksi persis trofi FIFA).
export default function Trophy({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className="inline-block" aria-label="Trofi">
      <defs>
        <linearGradient id="wc-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fde68a" />
          <stop offset="0.5" stopColor="#f5c518" />
          <stop offset="1" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="9" r="5" fill="url(#wc-gold)" />
      <path d="M19 9h10M24 4v10" stroke="#b8860b" strokeWidth="0.8" opacity="0.5" />
      <path d="M18 12c-3 6-3 14 2 20 1.5 1.8 3 3 4 5 1-2 2.5-3.2 4-5 5-6 5-14 2-20-1.6 3-4 5-6 5s-4.4-2-6-5z"
        fill="url(#wc-gold)" />
      <rect x="22.5" y="35" width="3" height="6" fill="url(#wc-gold)" />
      <rect x="17" y="41" width="14" height="3.5" rx="1" fill="url(#wc-gold)" />
      <rect x="15" y="44" width="18" height="2.5" rx="1" fill="#b8860b" />
    </svg>
  );
}
