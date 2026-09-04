import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Wishlist",
  description: "Pieces you've saved for later.",
  path: "/wishlist",
  noIndex: true,
});

export default function WishlistLayout({ children }: { children: ReactNode }) {
  return children;
}
