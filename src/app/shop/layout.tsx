import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Shop All",
  description:
    "Browse the complete Vylore sterling silver jewellery collection — rings, necklaces, earrings, bracelets, anklets and ear cuffs.",
  path: "/shop",
  keywords: [
    "shop silver jewellery",
    "sterling silver jewellery online",
    "buy silver rings online",
    "silver necklaces online India",
    "silver jewellery collection",
  ],
});

export default function ShopLayout({ children }: { children: ReactNode }) {
  return children;
}
