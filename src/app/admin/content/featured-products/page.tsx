import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { FeaturedProductsManager } from "@/components/admin/content/FeaturedProductsManager";
import { mockContentBlocks, mockProducts } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Featured Products" };

export default function FeaturedProductsPage() {
  const slots = mockContentBlocks.filter((b) => b.section === "featured_products").sort((a, b) => a.order - b.order);

  return (
    <div className="space-y-6">
      <PageHeader title="Featured Products" description="Choose which products appear in each homepage showcase." />
      <FeaturedProductsManager slots={slots} products={mockProducts} />
    </div>
  );
}
