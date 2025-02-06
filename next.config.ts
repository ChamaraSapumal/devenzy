/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: "/devenzy",
  assetPrefix: "/devenzy/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
