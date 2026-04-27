import type { MetadataRoute } from 'next';

const DEFAULT_SITE_URL = 'https://transmitflow.vercel.app';

function getBaseUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_URL || DEFAULT_SITE_URL;
  try {
    return new URL(raw).origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
