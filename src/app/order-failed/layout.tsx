import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Payment Failed",
  description: "Your Vylore order payment did not complete.",
  path: "/order-failed",
  noIndex: true,
});

export default function OrderFailedLayout({ children }: { children: ReactNode }) {
  return children;
}
