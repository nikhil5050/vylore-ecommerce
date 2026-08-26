"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";
import { Switch } from "@/components/admin/ui/switch";
import { createCategory, updateCategory } from "@/lib/admin/api";
import type { AdminCategory } from "@/types/admin";

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required."),
  slug: z.string().optional(),
  description: z.string().optional(),
  active: z.boolean(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function CategoryForm({ category }: { category?: AdminCategory }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!category);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? "",
      slug: category?.slug ?? "",
      description: category?.description ?? "",
      active: category?.active ?? true,
    },
  });

  async function onSubmit(data: CategoryFormValues) {
    setSubmitting(true);
    try {
      if (category) {
        await updateCategory(category.id, { name: data.name, slug: data.slug, description: data.description, active: data.active });
        toast.success("Category updated successfully.");
      } else {
        await createCategory({ name: data.name, slug: data.slug, description: data.description, active: data.active });
        toast.success("Category created successfully.");
      }
      router.push("/admin/categories");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't save the category.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader className="border-b pb-4">
          <CardTitle className="text-base">Category Details</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              {...register("name", {
                onChange: (e) => {
                  if (!slugTouched) setValue("slug", slugify(e.target.value));
                },
              })}
            />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...register("slug", { onChange: () => setSlugTouched(true) })} placeholder="auto-generated from name" />
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" rows={3} {...register("description")} />
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 sm:col-span-2">
            <div>
              <p className="text-sm font-medium text-foreground">Active</p>
              <p className="text-xs text-muted-foreground">Visible in storefront navigation and filters.</p>
            </div>
            <Controller control={control} name="active" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {category ? "Save Changes" : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
