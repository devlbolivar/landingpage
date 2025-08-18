/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: { unoptimized: true },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

