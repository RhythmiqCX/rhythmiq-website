/** @type {import('next-sitemap').IConfig} */
export default {
    siteUrl: process.env.SITE_URL || 'https://rhythmiq-website.vercel.app/', // fallback until you add the real domain
    generateRobotsTxt: true,           // creates robots.txt for you
    sitemapSize: 7000,                 // chunking threshold (fine for 99 % of sites)
    exclude: ['/staging/*', '/admin/*'] // optional paths to skip
  };
  