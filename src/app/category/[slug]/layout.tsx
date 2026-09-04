import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getCategoryBySlug } from "@/services/category.service";
import { buildMetadata } from "@/utils/metadata";

export async function generateMetadata({
  params,
}: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  // getCategoryBySlug's underlying getCategories() call is unguarded, so a
  // backend outage here would otherwise crash metadata generation and take
  // the whole page down; falling back to default metadata is fine instead.
  const category = await getCategoryBySlug(slug).catch(() => undefined);
  if (!category) return {};

  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/category/${category.slug}`,
    keywords: [
      `${category.name} silver jewellery`,
      `buy ${category.name.toLowerCase()} online`,
      `sterling silver ${category.name.toLowerCase()}`,
      "silver jewellery India",
      "925 sterling silver",
    ],
  });
}

export default function CategoryLayout({ children }: { children: ReactNode }) {
  return children;
}
