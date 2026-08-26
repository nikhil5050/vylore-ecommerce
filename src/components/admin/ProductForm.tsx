"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/admin/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { Label } from "@/components/admin/ui/label";
import { Textarea } from "@/components/admin/ui/textarea";
import { Switch } from "@/components/admin/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/admin/ui/sheet";
import { ProductImageUploader } from "@/components/admin/ProductImageUploader";
import { ProductVariants } from "@/components/admin/ProductVariants";
import { ProductPreview } from "@/components/admin/ProductPreview";
import { productFormSchema, type ProductFormValues } from "@/lib/admin/validations/product";
import { createProduct, updateProduct } from "@/lib/admin/api";
import type { AdminCategory, Product, ProductImage, ProductVariant } from "@/types/admin";

function toFormValues(product?: Product): ProductFormValues {
  return {
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    categoryId: product?.categoryId ?? "",
    description: product?.description ?? "",
    isActive: product?.isActive ?? true,
    basePrice: product?.basePrice ?? 0,
    compareAtPrice: product?.compareAtPrice,
    initialStock: product?.stock ?? 0,
  };
}

function tempSessionId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `tmp-${Date.now()}`;
}

export function ProductForm({ product, categories }: { product?: Product; categories: AdminCategory[] }) {
  const router = useRouter();
  const isEdit = !!product;
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [images, setImages] = useState<ProductImage[]>(product?.images ?? []);
  const [variants, setVariants] = useState<ProductVariant[]>(product?.variants ?? []);
  const [folderId] = useState(() => product?.id ?? tempSessionId());

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toFormValues(product),
  });

  const values = watch();
  const discountPercent =
    values.compareAtPrice && values.compareAtPrice > values.basePrice
      ? Math.round(((values.compareAtPrice - values.basePrice) / values.compareAtPrice) * 100)
      : 0;

  async function onSubmit(data: ProductFormValues) {
    setSubmitting(true);
    try {
      if (isEdit && product) {
        await updateProduct(product.id, {
          categoryId: data.categoryId,
          name: data.name,
          sku: data.sku,
          description: data.description,
          basePrice: data.basePrice,
          compareAtPrice: data.compareAtPrice,
          isActive: data.isActive,
        });
        toast.success("Product updated successfully.");
        router.push("/admin/products");
      } else {
        const created = await createProduct({
          categoryId: data.categoryId,
          name: data.name,
          sku: data.sku,
          description: data.description,
          basePrice: data.basePrice,
          compareAtPrice: data.compareAtPrice,
          isActive: data.isActive,
          initialStock: data.initialStock,
          images: images.map((image) => ({
            mediaAssetId: image.mediaAssetId,
            altText: image.altText,
            isPrimary: image.position === 0,
          })),
        });
        toast.success("Product created successfully.");
        router.push(`/admin/products/edit?id=${created.id}`);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Couldn't save the product.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-wrap items-center justify-end gap-2">
        <Button type="button" variant="outline" onClick={() => setPreviewOpen(true)}>
          <Eye className="h-4 w-4" /> Preview Product
        </Button>
        <Button type="submit" disabled={submitting}>
          {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          {isEdit ? "Save Changes" : "Create Product"}
        </Button>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="flex-wrap">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="name">Product Name *</Label>
                <Input id="name" {...register("name")} placeholder="e.g. Silver Temple Necklace" />
                {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="sku">SKU *</Label>
                <Input id="sku" {...register("sku")} placeholder="e.g. VYL-NEC-001" />
                {errors.sku && <p className="text-xs text-destructive">{errors.sku.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label>Category *</Label>
                <Controller
                  control={control}
                  name="categoryId"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && <p className="text-xs text-destructive">{errors.categoryId.message}</p>}
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Active</p>
                  <p className="text-xs text-muted-foreground">Visible to customers on the storefront.</p>
                </div>
                <Controller control={control} name="isActive" render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />} />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={6} {...register("description")} placeholder="Shown on the customer-facing product detail page." />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Product Images</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ProductImageUploader images={images} onChange={setImages} productId={product?.id} folderId={folderId} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Pricing</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 pt-4 lg:grid-cols-[1fr_320px]">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="basePrice">Selling Price (₹) *</Label>
                  <Input id="basePrice" type="number" step="0.01" {...register("basePrice", { valueAsNumber: true })} />
                  {errors.basePrice && <p className="text-xs text-destructive">{errors.basePrice.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="compareAtPrice">Compare-at Price (₹)</Label>
                  <Input
                    id="compareAtPrice"
                    type="number"
                    step="0.01"
                    {...register("compareAtPrice", { setValueAs: (v) => (v === "" ? undefined : Number(v)) })}
                  />
                  {errors.compareAtPrice && <p className="text-xs text-destructive">{errors.compareAtPrice.message}</p>}
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Price Preview</p>
                <Row label="Compare-at Price" value={values.compareAtPrice ?? 0} />
                <Row label="Selling Price" value={values.basePrice || 0} />
                {discountPercent > 0 && (
                  <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-medium text-success">
                    <span>Discount</span>
                    <span>{discountPercent}% off</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Inventory</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              {isEdit ? (
                <div className="space-y-1.5">
                  <Label>Current Stock</Label>
                  <p className="text-sm text-muted-foreground">
                    {variants.length > 0
                      ? "This product uses variant-level stock — manage it from the Variants tab or the Inventory page."
                      : `${product?.stock ?? 0} units. Adjust it from the Inventory page.`}
                  </p>
                </div>
              ) : (
                <div className="max-w-xs space-y-1.5">
                  <Label htmlFor="initialStock">Initial Stock</Label>
                  <Input id="initialStock" type="number" {...register("initialStock", { valueAsNumber: true })} />
                  <p className="text-xs text-muted-foreground">Ignored if you add variants — each variant tracks its own stock.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Product Variants</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ProductVariants variants={variants} onChange={setVariants} productId={product?.id} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Product Preview</SheetTitle>
          </SheetHeader>
          <div className="px-4 pb-6">
            <ProductPreview values={values} images={images} categoryName={categories.find((c) => c.id === values.categoryId)?.name} />
          </div>
        </SheetContent>
      </Sheet>
    </form>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center justify-between text-muted-foreground">
      <span>{label}</span>
      <span className="text-foreground">₹{Math.abs(value).toLocaleString("en-IN")}</span>
    </div>
  );
}
