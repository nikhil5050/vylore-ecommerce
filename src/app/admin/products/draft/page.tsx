import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { getProducts, toProductListItem } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Draft Products" };

export default async function DraftProductsPage() {
  const products = (await getProducts()).filter((p) => !p.isActive).map(toProductListItem);
  return (
    <div className="space-y-6">
      <PageHeader title="Draft Products" description="Inactive products not visible on the storefront." />
      <ProductTable products={products} />
    </div>
  );
}
