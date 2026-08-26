"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { SafeImage } from "@/components/admin/SafeImage";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { getCategories, deleteCategory } from "@/lib/admin/api";
import type { AdminCategory } from "@/types/admin";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<AdminCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => categories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [categories, search],
  );

  async function handleDelete(category: AdminCategory) {
    try {
      await deleteCategory(category.id);
      setCategories((prev) => prev.filter((c) => c.id !== category.id));
      toast.success(`${category.name} deleted.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't delete category.");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Organise your catalogue into shoppable categories."
        actions={
          <Button nativeButton={false} render={<Link href="/admin/categories/add" />}>
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        }
      />

      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories…" className="pl-8" />
      </div>

      {!loading && filtered.length === 0 ? (
        <AdminEmptyState title="No categories yet" description="Create your first category to start organising products." />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((category) => (
            <Card key={category.id} className="overflow-hidden py-0">
              <SafeImage src={category.imageUrl} transform="w-400" className="h-32 w-full object-cover" />
              <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-foreground">{category.name}</p>
                    <p className="text-xs text-muted-foreground">/{category.slug}</p>
                  </div>
                  <StatusBadge status={category.active ? "active" : "inactive"} tone={category.active ? "success" : "neutral"} />
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">{category.description || "No description yet."}</p>
                <div className="flex items-center justify-end gap-1 pt-1">
                  <Link
                    href={`/admin/categories/edit?id=${category.id}`}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Edit category"
                  >
                    <SquarePen className="h-3.5 w-3.5" />
                  </Link>
                  <ConfirmDialog
                    trigger={
                      <button
                        type="button"
                        className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Delete category"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    }
                    title="Delete this category?"
                    description={`"${category.name}" will be removed. Products in this category will need to be reassigned.`}
                    confirmLabel="Delete"
                    onConfirm={() => handleDelete(category)}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
