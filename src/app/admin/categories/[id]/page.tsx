"use client";

import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { getCategories } from "@/lib/admin/api";
import type { AdminCategory } from "@/types/admin";

export default function EditCategoryPage({ params }: PageProps<"/admin/categories/[id]">) {
  const { id } = use(params);
  const [category, setCategory] = useState<AdminCategory | null | undefined>(undefined);

  useEffect(() => {
    getCategories().then((categories) => setCategory(categories.find((c) => c.id === id) ?? null));
  }, [id]);

  useEffect(() => {
    if (category) document.title = `${category.name} | Vylore Admin`;
  }, [category]);

  if (category === undefined) return null;
  if (category === null) notFound();

  return (
    <div className="space-y-6">
      <PageHeader title={category.name} description={`/${category.slug}`} />
      <CategoryForm category={category} />
    </div>
  );
}
