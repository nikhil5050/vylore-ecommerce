import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/admin/ui/button";
import { getCategories, getProducts, toProductListItem } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage your full jewellery catalogue."
        actions={
          <Button render={<Link href="/admin/products/add" />}>
            <Plus className="h-4 w-4" /> Add Product
          </Button>
        }
      />
      <ProductTable products={products.map(toProductListItem)} categories={categories.map((c) => c.name)} />
    </div>
  );
}
