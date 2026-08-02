import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Smaller Docker image for Hostinger VPS production.
  output: "standalone",
  // Avoid picking a parent lockfile as the Turbopack root (breaks env / HMR).
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // Allow high-quality product shots (default allowlist is only [75]).
    qualities: [75, 95],
  },
};

export default nextConfig;
