import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Avoid picking a parent lockfile as the Turbopack root (breaks env / HMR).
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
