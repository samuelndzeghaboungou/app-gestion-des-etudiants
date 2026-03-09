/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Ensure proper serverless function handling
  experimental: {},
  // Auto-detect NEXTAUTH_URL on Vercel
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || (
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'
    ),
  },
}

module.exports = nextConfig
