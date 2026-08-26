"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductTable } from "@/components/admin/ProductTable";
import { getProducts, toProductListItem } from "@/lib/admin/api";
import type { Product } from "@/types/admin";

export default function OutOfStockProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Out of Stock" description="Products that need restocking." />
      <ProductTable
        products={products.map(toProductListItem).filter((p) => p.stockStatus === "out_of_stock")}
      />
    </div>
  );
}
