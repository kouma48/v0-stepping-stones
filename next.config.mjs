/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
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
