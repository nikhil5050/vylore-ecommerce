import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Track Your Order",
  description: "Track a Vylore order using your order ID and the email or phone number used at checkout.",
  path: "/track-order",
});

export default function TrackOrderLayout({ children }: { children: ReactNode }) {
  return children;
}
