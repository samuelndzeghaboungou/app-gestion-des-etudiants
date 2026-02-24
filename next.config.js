/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: false,
  },
  // Ensure proper serverless function handling
  experimental: {},
}

module.exports = nextConfig
