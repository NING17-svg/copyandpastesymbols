import { MetadataRoute } from 'next';
import { categoryInfoList } from '@/data/symbols';

const URL = 'https://copyandpastesymbols.pro';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base static routes
  const staticRoutes = [
    '',
    '/categories',
    '/privacy-policy',
    '/terms-of-service',
  ].map((route) => ({
    url: `${URL}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.9,
  }));

  // Dynamic category routes
  const categoryRoutes = categoryInfoList.map((category) => ({
    url: `${URL}/categories/${category.key}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
