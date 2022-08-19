/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images:{
    domains: [ // Added domain to avoid security problems
      'akm-img-a-in.tosshub.com',
      'www.ixbt.com',
      'www.handelsblatt.com',
      'www.kocpc.com.tw',
      'static.bangkokpost.com',
      'img.technews',
      'i.nextmedia.com.au',
      'i.dailymail.co.uk',
      '*',
      'cdn.i-scmp.com',
      'img.technews.tw',
      'images.moneycontrol.com',
      'www.reuters.com',
      'onecms-res.cloudinary.com"',
      'techcrunch.com'
    ]
  }
}

module.exports = nextConfig
