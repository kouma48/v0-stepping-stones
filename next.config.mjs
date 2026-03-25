/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'steppingstones.co.ke',
      },
      {
        protocol: 'https',
        hostname: '*.steppingstones.co.ke',
      },
    ],
  },
}

export default nextConfig
