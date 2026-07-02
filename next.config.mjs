/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // GitHub readme stats cards (About section)
        protocol: "https",
        hostname: "github-readme-stats.vercel.app",
      },
    ],
  },
};

export default nextConfig;
