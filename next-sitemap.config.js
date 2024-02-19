/** @type {import('next-sitemap').IConfig} */
module.exports = {
   siteUrl: process.env.NEXTAUTH_URL,
   generateRobotsTxt: true,
   //  outDir: "/out" option used if static export
};
