import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "My Wishlist",
  description: "Pieces you've saved for later.",
  path: "/account/wishlist",
  noIndex: true,
});

export default function AccountWishlistLayout({ children }: { children: ReactNode }) {
  return children;
}
