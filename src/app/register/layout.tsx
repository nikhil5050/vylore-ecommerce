import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Create Account",
  description: "Create a Vylore account.",
  path: "/register",
  noIndex: true,
});

export default function RegisterLayout({ children }: { children: ReactNode }) {
  return children;
}
