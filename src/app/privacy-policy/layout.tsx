import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Vylore collects, uses, and protects your information.",
  path: "/privacy-policy",
  keywords: ["Vylore privacy policy", "data protection jewellery website"],
});

export default function PrivacyPolicyLayout({ children }: { children: ReactNode }) {
  return children;
}
