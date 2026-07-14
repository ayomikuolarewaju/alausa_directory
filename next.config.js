/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

// next-pwa can export differently depending on version
const nextPWA = require("next-pwa");
const withPWA = (nextPWA.default ?? nextPWA)({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "google-fonts-cache",
        expiration: { maxEntries: 10, maxAgeSeconds: 31536000 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "gstatic-fonts-cache",
        expiration: { maxEntries: 10, maxAgeSeconds: 31536000 },
        cacheableResponse: { statuses: [0, 200] },
      },
    },
    {
      urlPattern: /\/api\/news/,
      handler: "NetworkFirst",
      options: {
        cacheName: "news-cache",
        expiration: { maxEntries: 5, maxAgeSeconds: 3600 },
        networkTimeoutSeconds: 10,
      },
    },
    {
      urlPattern: /\/_next\/static\/.*/i,
      handler: "CacheFirst",
      options: {
        cacheName: "next-static-cache",
        expiration: { maxEntries: 200, maxAgeSeconds: 2592000 },
      },
    },
    {
      urlPattern: /^\/(ministries|agencies|parastatals|lgas|emergency|services|events|transport)(\/.*)?$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "directory-pages-cache",
        expiration: { maxEntries: 300, maxAgeSeconds: 86400 },
      },
    },
    {
      urlPattern: /^https?.*/,
      handler: "NetworkFirst",
      options: {
        cacheName: "default-cache",
        expiration: { maxEntries: 200, maxAgeSeconds: 86400 },
        networkTimeoutSeconds: 10,
      },
    },
  ],
});

const nextConfig = {
  turbopack: {},
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.pulse.ng" },
      { protocol: "https", hostname: "**.vanguardngr.com" },
      { protocol: "https", hostname: "**.thecable.ng" },
      { protocol: "https", hostname: "**.businessday.ng" },
      { protocol: "https", hostname: "**.premiumtimesng.com" },
      { protocol: "https", hostname: "**.guardian.ng" },
    ],
  },
  async headers() {
    return [
      {
        source: "/api/news",
        headers: [
          {
            key: "Cache-Control",
            value: "public, s-maxage=3600, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
