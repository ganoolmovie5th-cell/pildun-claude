import { MetadataRoute } from 'next';
import { teams, matches } from '@/lib/data';

const BASE = 'https://www.piala-dunia.web.id';

// No lastModified: it was new Date(), so every URL claimed it changed on each
// build. Google discounts a lastmod that always moves, and the field is
// optional, so omitting it beats publishing a timestamp that is never true.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/matches', '/groups', '/bracket', '/teams', '/compare', '/stats', '/road', '/timeline', '/prediksi', '/stadion'].map((p) => ({
    url: `${BASE}${p}`,
    changeFrequency: 'daily' as const,
    priority: p === '' ? 1 : 0.8,
  }));

  const teamRoutes = teams.map((t) => ({
    url: `${BASE}/teams/${t.code}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const matchRoutes = matches.map((m) => ({
    url: `${BASE}/matches/${m.id}`,
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...teamRoutes, ...matchRoutes];
}
