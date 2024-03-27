/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  basePath: '/portfolio',
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig
