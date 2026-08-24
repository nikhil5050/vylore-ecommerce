import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";

export const metadata: Metadata = { title: "Add Category" };

export default function AddCategoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Add Category" description="Create a new product category." />
      <CategoryForm />
    </div>
  );
}
