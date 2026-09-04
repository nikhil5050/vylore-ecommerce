import type { Metadata } from "next";
import type { ReactNode } from "react";
import { buildMetadata } from "@/utils/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Vylore for enquiries, support, or custom jewellery requests.",
  path: "/contact",
  keywords: [
    "contact Vylore",
    "Vylore customer support",
    "custom jewellery enquiry",
    "Vylore boutique Belhe",
    "jewellery store contact India",
  ],
});

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children;
}
