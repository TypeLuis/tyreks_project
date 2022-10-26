/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    'YTAPI': process.env.YTAPI
  }
}

module.exports = nextConfig
