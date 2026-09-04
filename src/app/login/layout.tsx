import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Sign In",
  description: "Sign in to your Vylore account.",
  path: "/login",
  noIndex: true,
});

export default function LoginLayout({ children }: { children: ReactNode }) {
  return children;
}
