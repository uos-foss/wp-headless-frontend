import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shef-live.co.uk",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
