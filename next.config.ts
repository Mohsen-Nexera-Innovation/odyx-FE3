import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Smaller Docker image for Hostinger VPS production.
  output: "standalone",
  // Avoid picking a parent lockfile as the Turbopack root (breaks env / HMR).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
