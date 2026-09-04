import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

// about/page.tsx is a client component ("use client", for its video
// lightbox/carousel interactions) and can't export metadata itself — this
// layout is the only place in the App Router that can carry it for this route.
export const metadata: Metadata = buildMetadata({
  title: "Our Story",
  description:
    "Vylore is a contemporary sterling silver jewellery brand built on 25+ years of family jewellery expertise. Meet founder Akash Kapile and the craftsmanship behind every piece.",
  path: "/about",
  keywords: [
    "about Vylore",
    "Vylore story",
    "silver jewellery brand India",
    "Akash Kapile",
    "sterling silver jewellery craftsmanship",
    "handcrafted silver jewellery India",
    "jewellery brand heritage",
  ],
});

export default function AboutLayout({ children }: { children: ReactNode }) {
  return children;
}
