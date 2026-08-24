import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Order Confirmation",
  description: "Your Vylore order confirmation.",
  path: "/order-confirmation",
  noIndex: true,
});

export default function OrderConfirmationLayout({ children }: { children: ReactNode }) {
  return children;
}
