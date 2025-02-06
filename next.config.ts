// next.config.js
const nextConfig = {
  output: "export",
  basePath: "/devenzy", // ✅ No trailing slash
  assetPrefix: "/devenzy/", // ✅ Trailing slash
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};