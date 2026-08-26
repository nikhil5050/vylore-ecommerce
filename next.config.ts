import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No "output: export" — this app has dynamic, runtime-created content
  // (products/orders/customers via the admin panel), which static export
  // can't support without a full rebuild+redeploy on every change. Hostinger's
  // Business Web Hosting plan runs Node.js apps, so a real `next start` server
  // handles this normally.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
