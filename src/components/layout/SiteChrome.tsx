"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

// The /admin section renders its own sidebar/header chrome (see
// app/admin/layout.tsx) and must not be wrapped in the storefront's
// Header/Footer — this is the one place that decides which shell applies.
// `comingSoon` comes from the root layout (a server component, so it can
// read the COMING_SOON env var directly) — while it's on, "/" renders the
// full-screen ComingSoon page and shouldn't get nav links pointing at
// routes proxy.ts is redirecting away from anyway.
export function SiteChrome({ children, comingSoon }: { children: ReactNode; comingSoon: boolean }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isComingSoonRoot = comingSoon && pathname === "/";

  if (isAdmin || isComingSoonRoot) {
    return <>{children}</>;
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-burgundy focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
      >
        Skip to main content
      </a>
      <Header />
      <div id="main-content" className="flex flex-1 flex-col">
        {children}
      </div>
      <Footer />
    </>
  );
}
