/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  images: {
    domains: ["cdn.podnoms.com", "cdn-l.podnoms.com", "i.pdnm.be"],
  },
};

module.exports = nextConfig;
