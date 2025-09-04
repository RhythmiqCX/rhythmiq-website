/** @type {import('next-sitemap').IConfig} */
export default {
    siteUrl: process.env.SITE_URL || 'https://rhythmiqcx.com', // fallback until you add the real domain
    generateRobotsTxt: true,           // creates robots.txt for you
    sitemapSize: 7000,                 // chunking threshold (fine for 99 % of sites)
    exclude: ['/staging/*', '/admin/*'], // optional paths to skip
    trailingSlash: false,              // ensure no trailing slashes in URLs
    generateIndexSitemap: false,       // disable index sitemap for cleaner URLs
  };
  