import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { getCategories } from "@/lib/admin/api";

export async function generateMetadata({ params }: PageProps<"/admin/categories/[id]">): Promise<Metadata> {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === id);
  return { title: category?.name ?? "Edit Category" };
}

export default async function EditCategoryPage({ params }: PageProps<"/admin/categories/[id]">) {
  const { id } = await params;
  const categories = await getCategories();
  const category = categories.find((c) => c.id === id);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={category.name} description={`/${category.slug}`} />
      <CategoryForm category={category} />
    </div>
  );
}
