"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { Button } from "@/components/admin/ui/button";
import { getCategories, getProducts, toProductListItem } from "@/lib/admin/api";
import type { AdminCategory, Product } from "@/types/admin";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  useEffect(() => {
    Promise.all([getProducts(), getCategories()]).then(([productsResult, categoriesResult]) => {
      setProducts(productsResult);
      setCategories(categoriesResult);
    });
  }, []);

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
