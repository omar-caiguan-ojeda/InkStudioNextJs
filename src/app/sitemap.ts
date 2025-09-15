import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inkstudio-tattoo.vercel.app';

  // URLs de las secciones principales
  const routes = [
    '#about-us',
    '#artistas',
    '#portfolio',
    '#servicios',
    '#booking',
    '#contacto',
    '#faq'
  ].map((route) => ({
    url: `${baseUrl}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 1,
    },
    ...routes,
  ];
}
