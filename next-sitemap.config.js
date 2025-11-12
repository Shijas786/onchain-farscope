/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://onchain-horoscope.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
}

