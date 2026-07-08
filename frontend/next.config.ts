import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: "standalone",
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  }
};

export default nextConfig;
