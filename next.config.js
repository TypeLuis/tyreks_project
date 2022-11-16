/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    'YTAPI': process.env.YTAPI,
    'TOKEN_KEY': process.env.TOKEN_KEY,
    'Stripe_Test_Key': process.env.Stripe_Test_Key
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
    domains: ['images.unsplash.com', 'shorturl.at', 'files.stripe.com']
  },
}

module.exports = nextConfig
