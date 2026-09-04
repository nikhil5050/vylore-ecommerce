import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/cart/shared/[token]">): Promise<Metadata> {
  const { token } = await params;
  return buildMetadata({
    title: "Shared Bag",
    description: "Someone shared their Vylore shopping bag with you.",
    path: `/cart/shared/${token}`,
    noIndex: true,
  });
}

export default function SharedCartLayout({ children }: { children: ReactNode }) {
  return children;
}
