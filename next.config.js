/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },

  // Headers for Telegram Mini App
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://telegram.org/",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
