"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/admin/PageHeader";
import { CategoryForm } from "@/components/admin/CategoryForm";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { getCategories } from "@/lib/admin/api";
import type { AdminCategory } from "@/types/admin";

export default function EditCategoryPage() {
  return (
    <Suspense fallback={null}>
      <EditCategoryContent />
    </Suspense>
  );
}

function EditCategoryContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [category, setCategory] = useState<AdminCategory | null | undefined>(undefined);

  useEffect(() => {
    if (!id) return;
    getCategories().then((categories) => setCategory(categories.find((c) => c.id === id) ?? null));
  }, [id]);

  useEffect(() => {
    if (category) document.title = `${category.name} | Vylore Admin`;
  }, [category]);

  if (category === undefined) {
    if (!id) {
      return (
        <div className="space-y-6">
          <PageHeader title="Category not found" />
          <AdminEmptyState title="This category doesn't exist" description="It may have been deleted, or the link is invalid." />
        </div>
      );
    }
    return null;
  }

  if (category === null) {
    return (
      <div className="space-y-6">
        <PageHeader title="Category not found" />
        <AdminEmptyState title="This category doesn't exist" description="It may have been deleted, or the link is invalid." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={category.name} description={`/${category.slug}`} />
      <CategoryForm category={category} />
    </div>
  );
}
