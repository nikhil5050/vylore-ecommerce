import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Order Details",
  description: "View the details of a Vylore order.",
  path: "/account/orders/view",
  noIndex: true,
});

export default function OrderDetailLayout({ children }: { children: ReactNode }) {
  return children;
}
