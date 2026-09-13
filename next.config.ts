import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'www.powerlook.in' },
      { protocol: 'https', hostname: 'cdn.shopify.com' }
    ]
  }
};

export default nextConfig;
