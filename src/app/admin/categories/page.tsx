"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Plus, Search, SquarePen, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Button } from "@/components/admin/ui/button";
import { Card } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { mockCategories } from "@/lib/admin/mock";

export default function CategoriesPage() {
  const [search, setSearch] = useState("");

  const filtered = useMemo(
    () => mockCategories.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Categories"
        description="Organise your catalogue into shoppable categories."
        actions={
          <Button render={<Link href="/admin/categories/add" />}>
            <Plus className="h-4 w-4" /> Add Category
          </Button>
        }
      />

      <div className="relative max-w-xs">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search categories…" className="pl-8" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((category) => (
          <Card key={category.id} className="overflow-hidden py-0">
            <ImagePlaceholder className="h-32 w-full" />
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-foreground">{category.name}</p>
                  <p className="text-xs text-muted-foreground">/{category.slug}</p>
                </div>
                <StatusBadge status={category.active ? "active" : "inactive"} tone={category.active ? "success" : "neutral"} />
              </div>
              <p className="line-clamp-2 text-sm text-muted-foreground">{category.description}</p>
              <div className="flex items-center justify-between pt-1">
                <span className="text-xs text-muted-foreground">{category.productCount} products</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => toast.success(`Editing ${category.name} — inline edit coming soon.`)}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                    aria-label="Edit category"
                  >
                    <SquarePen className="h-3.5 w-3.5" />
                  </button>
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
                    onConfirm={() => toast.success(`${category.name} deleted.`)}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
