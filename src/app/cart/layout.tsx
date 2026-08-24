import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Shopping Bag",
  description: "Review the items in your Vylore shopping bag.",
  path: "/cart",
  noIndex: true,
});

export default function CartLayout({ children }: { children: ReactNode }) {
  return children;
}
