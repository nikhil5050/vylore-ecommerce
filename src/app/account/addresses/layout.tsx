import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Saved Addresses",
  description: "Manage your saved Vylore delivery addresses.",
  path: "/account/addresses",
  noIndex: true,
});

export default function AddressesLayout({ children }: { children: ReactNode }) {
  return children;
}
