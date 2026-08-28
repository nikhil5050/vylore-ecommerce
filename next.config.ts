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
  // Everything under public/ (necklace frames, logos, icons) is a static file
  // that only changes when we replace it in a deploy — Vercel's default for
  // public/ is `max-age=0, must-revalidate`, which makes every repeat visit
  // re-check every image with the server instead of using the cached copy.
  // `immutable` tells the browser it never needs to revalidate for the life
  // of this max-age, which is safe here since a changed file gets a new
  // deploy (and CDN cache key) anyway, not an in-place edit at the same URL.
  async headers() {
    return [
      {
        source: "/:path*\\.(png|jpg|jpeg|webp|gif|svg|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
