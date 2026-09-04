import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Verify Email",
  description: "Verify your Vylore account email address.",
  path: "/verify-email",
  noIndex: true,
});

export default function VerifyEmailLayout({ children }: { children: ReactNode }) {
  return children;
}
