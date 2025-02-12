/** @type {import('next').NextConfig} */
const nextConfig = {

  output: 'standalone',
  basePath: "/devenzy",
  assetPrefix: "/devenzy/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  distDir: "out",
};

module.exports = nextConfig;
