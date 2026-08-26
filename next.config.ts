import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No "output: export" — this app has dynamic, runtime-created content
  // (products/orders/customers via the admin panel), which static export
  // can't support without a full rebuild+redeploy on every change. Deployed
  // on Vercel (not Hostinger — that plan has no Node.js runtime support),
  // so a real Next.js server handles this normally.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
