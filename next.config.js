/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019a7ac2-8aae-0c91-e721-9f88a3645e6e',
        permanent: false, // 307 Temporary Redirect
      },
    ]
  },
}

module.exports = nextConfig

