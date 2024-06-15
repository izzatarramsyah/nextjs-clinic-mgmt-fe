/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
    KEY: process.env.KEY,
    IV: process.env.IV
  }
}

module.exports = nextConfig
