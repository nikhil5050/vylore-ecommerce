import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/admin/ui/button";
import { mockCategories, mockProductListItems } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
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
      <ProductTable products={mockProductListItems} categories={mockCategories.map((c) => c.name)} />
    </div>
  );
}
