import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getProductBySlug } from "@/services/product.service";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  // A backend outage here (getProductBySlug rethrows anything but a genuine
  // 404) shouldn't crash metadata generation — falling back to default
  // metadata is fine; a 500 taking the page down is not.
  const product = await getProductBySlug(slug).catch(() => undefined);
  if (!product) return {};

  return buildMetadata({
    title: product.name,
    description: product.description,
    path: `/product/${product.slug}`,
    keywords: [
      product.name,
      `${product.category} silver jewellery`,
      product.metal ? `${product.metal} jewellery` : "sterling silver jewellery",
      "buy silver jewellery online",
      "925 sterling silver",
    ],
  });
}

export default function ProductLayout({ children }: { children: ReactNode }) {
  return children;
}
