import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "My Profile",
  description: "View your Vylore account profile.",
  path: "/account/profile",
  noIndex: true,
});

export default function AccountProfileLayout({ children }: { children: ReactNode }) {
  return children;
}
