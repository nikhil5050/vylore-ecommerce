"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories, getProduct } from "@/lib/admin/api";
import type { AdminCategory, Product } from "@/types/admin";

export default function EditProductPage({ params }: PageProps<"/admin/products/[id]">) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [categories, setCategories] = useState<AdminCategory[]>([]);

  useEffect(() => {
    Promise.all([getProduct(id), getCategories()]).then(([productResult, categoriesResult]) => {
      setProduct(productResult ?? null);
      setCategories(categoriesResult);
    });
  }, [id]);

  useEffect(() => {
    if (product) document.title = `${product.name} | Vylore Admin`;
  }, [product]);

  if (product === undefined) return null;
  if (product === null) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={product.name} description={`SKU: ${product.sku}`} />
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
