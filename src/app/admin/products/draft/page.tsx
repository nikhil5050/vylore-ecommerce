"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { getProducts, toProductListItem } from "@/lib/admin/api";
import type { Product } from "@/types/admin";

export default function DraftProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Draft Products" description="Inactive products not visible on the storefront." />
      <ProductTable products={products.filter((p) => !p.isActive).map(toProductListItem)} />
    </div>
  );
}
