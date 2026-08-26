import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { getProducts, toProductListItem } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Out of Stock" };

export default async function OutOfStockProductsPage() {
  const products = (await getProducts()).map(toProductListItem).filter((p) => p.stockStatus === "out_of_stock");
  return (
    <div className="space-y-6">
      <PageHeader title="Out of Stock" description="Products that need restocking." />
      <ProductTable products={products} />
    </div>
  );
}
