import { MetadataRoute } from 'next';
import { teams, matches } from '@/lib/data';

const BASE = 'https://www.piala-dunia.web.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/matches', '/groups', '/bracket', '/teams', '/compare', '/stats', '/road', '/timeline', '/prediksi', '/stadion'].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: p === '' ? 1 : 0.8,
  }));

  const teamRoutes = teams.map((t) => ({
    url: `${BASE}/teams/${t.code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const matchRoutes = matches.map((m) => ({
    url: `${BASE}/matches/${m.id}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...teamRoutes, ...matchRoutes];
}
