import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow RSS images from Nigerian news sources
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
  // Allow RSS fetching from these origins during build
  async headers() {
    return [
      {
        source: "/api/news",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
