/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    'YTAPI': process.env.YTAPI
  },
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'images.unsplash.com',
    //     port: '8080',
    //     pathname: '**',
    //   },
    // ],
    domains: ['images.unsplash.com']
  },
  experimental: {
    allowMiddlewareResponseBody: true,
  },
}

module.exports = nextConfig
