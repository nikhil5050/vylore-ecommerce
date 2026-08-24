import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { ProductForm } from "@/components/admin/ProductForm";

export const metadata: Metadata = { title: "Add Product" };

export default function AddProductPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Add Product" description="Create a new product listing." />
      <ProductForm />
    </div>
  );
}
