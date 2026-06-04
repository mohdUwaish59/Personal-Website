/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  typescript: {
    // Only use this if you're confident about your types
    // ignoreBuildErrors: false,
  },
  turbopack: {
    root: process.cwd(),
  },
};

module.exports = nextConfig;
