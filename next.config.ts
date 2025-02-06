import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Export static files for GitHub Pages
  images: {
    unoptimized: true, // Disable Next.js image optimization for GH Pages
  },
  basePath: "/devenzy", // Replace with your GitHub repo name
  assetPrefix: "/devenzy/", // Important for assets loading
};

export default nextConfig;
