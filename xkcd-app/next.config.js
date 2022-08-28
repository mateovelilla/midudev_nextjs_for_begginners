/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains:['imgs.xkcd.com']
  },
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en'
  }
}

module.exports = nextConfig
