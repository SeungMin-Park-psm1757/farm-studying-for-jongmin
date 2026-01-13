import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/farm-studying-for-jongmin',
  trailingSlash: true,
};

export default nextConfig;
