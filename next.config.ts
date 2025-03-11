/** @type {import('next').NextConfig} */
interface ImagesConfig {
  unoptimized: boolean;
}

interface WebpackConfig {
  (config: any): any;
}

interface NextConfig {
  output: string;
  basePath: string;
  assetPrefix: string;
  trailingSlash: boolean;
  images: ImagesConfig;
  webpack: WebpackConfig;
}

const nextConfig: NextConfig = {
  output: 'export',
  basePath: "/devenzy",
  assetPrefix: "/devenzy/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  }
};

module.exports = nextConfig;
