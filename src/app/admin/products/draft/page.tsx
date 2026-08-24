import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { mockProductListItems } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Draft Products" };

export default function DraftProductsPage() {
  const products = mockProductListItems.filter((p) => p.status === "draft");
  return (
    <div className="space-y-6">
      <PageHeader title="Draft Products" description="Products not yet published to the storefront." />
      <ProductTable products={products} />
    </div>
  );
}
