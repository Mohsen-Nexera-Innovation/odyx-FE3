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
        source: "/solutions/dentists",
        destination: "/solutions/clinical-applications",
        permanent: true,
      },
      {
        source: "/solutions/labs",
        destination: "/solutions/clinical-applications",
        permanent: true,
      },
      {
        source: "/cases",
        destination: "/solutions/cases",
        permanent: true,
      },
      {
        source: "/solutions/clinical-applications/all-cases",
        destination: "/solutions/cases",
        permanent: true,
      },
      {
        source: "/solutions/clinical-applications/restorative-cases",
        destination: "/solutions/cases/restorative-cases",
        permanent: true,
      },
      {
        source: "/solutions/clinical-applications/implant-cases",
        destination: "/solutions/cases/implant-cases",
        permanent: true,
      },
      {
        source: "/solutions/clinical-applications/ortho-cases",
        destination: "/solutions/cases/ortho-cases",
        permanent: true,
      },
      {
        source: "/solutions/clinical-applications/prosthetic-cases",
        destination: "/solutions/cases/prosthetic-cases",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
