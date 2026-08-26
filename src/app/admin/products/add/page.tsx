import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";
import { getCategories } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Add Product" };

export default async function AddProductPage() {
  const categories = await getCategories();
  return (
    <div className="space-y-6">
      <PageHeader title="Add Product" description="Create a new product listing." />
      <ProductForm categories={categories} />
    </div>
  );
}
