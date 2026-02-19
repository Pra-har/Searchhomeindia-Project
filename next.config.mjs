/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.prominentrealty.in",
      },
      {
        protocol: "https",
        hostname: "prominentrealty.in",
      },
      {
        protocol: "https",
        hostname: "housing-images.n7net.in",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
};

export default nextConfig;