/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["cdn.podnoms.com", "cdn-l.podnoms.com", "i.pdnm.be"],
  },
};

module.exports = nextConfig;
