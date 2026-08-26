"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { getCategories, getProduct } from "@/lib/admin/api";
import type { AdminCategory, Product } from "@/types/admin";

export default function EditProductPage() {
  return (
    <Suspense fallback={null}>
      <EditProductContent />
    </Suspense>
  );
}

function EditProductContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  useEffect(() => {
    if (!id) return;
    Promise.all([getProduct(id), getCategories()]).then(([productResult, categoriesResult]) => {
      setProduct(productResult ?? null);
      setCategories(categoriesResult);
    });
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.name} | Vylore Admin`;
  }, [product]);

  if (product === undefined) {
    if (!id) {
      return (
        <div className="space-y-6">
          <PageHeader title="Product not found" />
          <AdminEmptyState title="This product doesn't exist" description="It may have been deleted, or the link is invalid." />
        </div>
      );
    }
    return null;
  }

  if (product === null) {
    return (
      <div className="space-y-6">
        <PageHeader title="Product not found" />
        <AdminEmptyState title="This product doesn't exist" description="It may have been deleted, or the link is invalid." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={product.name} description={`SKU: ${product.sku}`} />
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
