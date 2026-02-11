const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const DEFAULT_SIGNALING_ORIGINS = ['https://signaling-server-6ziv.onrender.com'];

const toOrigin = (value) => {
  if (!value || typeof value !== 'string') return null;
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    return `${url.protocol}//${url.host}`.toLowerCase();
  } catch {
    return null;
  }
};

const toWebsocketOrigin = (origin) => {
  if (!origin) return null;
  try {
    const url = new URL(origin);
    const wsProtocol = url.protocol === 'https:' ? 'wss:' : 'ws:';
    return `${wsProtocol}//${url.host}`.toLowerCase();
  } catch {
    return null;
  }
};

const parseCsvOrigins = (raw) => {
  if (!raw || typeof raw !== 'string') return [];
  return raw
    .split(',')
    .map((entry) => toOrigin(entry.trim()))
    .filter((entry) => Boolean(entry));
};

const uniq = (values) => Array.from(new Set(values.filter((value) => Boolean(value))));

const configuredSignalingOrigin = toOrigin(process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL);
const signalingOrigins = uniq([
  ...DEFAULT_SIGNALING_ORIGINS.map(toOrigin),
  configuredSignalingOrigin,
  ...parseCsvOrigins(process.env.SIGNALING_CORS_ALLOWED_ORIGINS),
  ...parseCsvOrigins(process.env.CORS_ALLOWED_ORIGINS),
]);

const buildContentSecurityPolicy = () => {
  // Dev mode needs relaxed policy for HMR/dev tooling.
  if (!IS_PRODUCTION) {
    return [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' http: https: ws: wss:",
      "worker-src 'self' blob:",
      "manifest-src 'self'",
      "media-src 'self' blob:",
    ].join('; ');
  }

  const connectSources = uniq([
    "'self'",
    ...signalingOrigins,
    ...signalingOrigins.map(toWebsocketOrigin),
    'https://vitals.vercel-insights.com',
    'https://*.vercel-insights.com',
    'https://fastly.jsdelivr.net',
  ]);

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://api.qrserver.com",
    "font-src 'self' data:",
    `connect-src ${connectSources.join(' ')}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "media-src 'self' blob: data:",
    'upgrade-insecure-requests',
  ].join('; ');
};

const securityHeaders = [
  { key: 'Content-Security-Policy', value: buildContentSecurityPolicy() },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Permissions-Policy', value: 'camera=(self), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
];

if (IS_PRODUCTION) {
  securityHeaders.push({
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  });
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Move turbo config to turbopack (new stable config)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  // Allow external images
  images: {
    domains: ['api.qrserver.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.qrserver.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Allow cross-origin requests from network
  allowedDevOrigins: [
    'http://192.168.0.117',
    'http://192.168.0.104',
    // Add other network IPs as needed
  ],
  // Allow access from network
  async rewrites() {
    return []
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
  // Configure server
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig
