/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image configuration for placeholder images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },

  // Enable SWC minification for better performance
  swcMinify: true,

  // Optimize for Telegram Mini Apps
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
