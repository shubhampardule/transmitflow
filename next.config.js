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
  // Configure server
  env: {
    CUSTOM_KEY: 'my-value',
  },
}

module.exports = nextConfig
