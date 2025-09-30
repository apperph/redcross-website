// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ this replaces next export
  reactStrictMode: true,
  images: {
    unoptimized: true, // ✅ needed when using static export (no Image Optimization API)
  },
};

module.exports = nextConfig;
