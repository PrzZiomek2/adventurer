/** @type {import('next').NextConfig} */

const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
   reactStrictMode: process.env.NODE_ENV === "development",
   swcMinify: true,
   async headers() {
      return [
         {
            source: "/(.*)",
            headers: [
               {
                  key: "X-Frame-Options",
                  value: "DENY",
               },
               {
                  key: "X-Content-Type-Options",
                  value: "nosniff",
               },
               {
                  key: "Referrer-Policy",
                  value: "origin-when-cross-origin",
               },
               {
                  key: "X-XSS-Protection",
                  value: "1; mode=block",
               },
               {
                  key: "Strict-Transport-Security",
                  value: "max-age=31536000",
               },
               {
                  key: "X-Download-Options",
                  value: "noopen",
               },
               {
                  key: "X-Permitted-Cross-Domain-Policies",
                  value: "none",
               },
            ],
         },
      ];
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "res.cloudinary.com",
         },
         {
            protocol: "https",
            hostname: "maps.gstatic.com",
         },
         {
            protocol: "https",
            hostname: "maps.googleapis.com",
            pathname: "/maps/api/streetview",
         },
      ],
   },
};

module.exports = withNextIntl(nextConfig);
