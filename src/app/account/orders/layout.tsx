import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "My Orders",
  description: "View your Vylore order history.",
  path: "/account/orders",
  noIndex: true,
});

export default function OrdersLayout({ children }: { children: ReactNode }) {
  return children;
}
