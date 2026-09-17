import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  compiler: {
    styledComponents: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;