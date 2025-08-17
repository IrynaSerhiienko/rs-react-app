import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: './dist',
  experimental: {
    turbo: false,
  },
  images: {
    domains: ['rickandmortyapi.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default createNextIntlPlugin()(nextConfig);
