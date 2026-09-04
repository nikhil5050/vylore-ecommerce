import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Checkout",
  description: "Complete your Vylore order.",
  path: "/checkout",
  noIndex: true,
});

export default function CheckoutLayout({ children }: { children: ReactNode }) {
  return children;
}
