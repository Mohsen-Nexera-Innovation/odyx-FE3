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
  async redirects() {
    return [
      {
        source: "/solutions/clinical-applications/all-cases",
        destination: "/cases",
        permanent: true,
      },
      {
        source: "/support",
        destination: "/",
        permanent: false,
      },
      {
        source: "/support/:path*",
        destination: "/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
