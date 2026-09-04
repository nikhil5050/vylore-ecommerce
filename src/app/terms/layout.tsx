import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms governing your use of the Vylore website.",
  path: "/terms",
  keywords: ["Vylore terms of service", "website terms and conditions"],
});

export default function TermsLayout({ children }: { children: ReactNode }) {
  return children;
}
