import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "FAQ",
  description:
    "Answers to common questions about Vylore orders, shipping, returns, silver purity, and payments.",
  path: "/faq",
  keywords: [
    "Vylore FAQ",
    "silver jewellery shipping India",
    "sterling silver purity questions",
    "jewellery returns policy",
    "order tracking help",
  ],
});

export default function FaqLayout({ children }: { children: ReactNode }) {
  return children;
}
