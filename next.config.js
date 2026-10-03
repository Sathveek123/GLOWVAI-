const isProd = process.env.NODE_ENV === 'production';
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
const repoName = isCustomDomain ? '' : '/GLOWVAI-';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isProd ? repoName : '',
  assetPrefix: isProd && repoName ? `${repoName}/` : '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

module.exports = nextConfig;
