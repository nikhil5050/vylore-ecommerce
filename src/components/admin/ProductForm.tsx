"use client";

import { useState, type ComponentProps } from "react";
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
import { mockCategories } from "@/lib/admin/mock";
import type { Product } from "@/types/admin";

function toFormValues(product?: Product): ProductFormValues {
  return {
    name: product?.name ?? "",
    sku: product?.sku ?? "",
    categoryId: product?.categoryId ?? "",
    shortDescription: product?.shortDescription ?? "",
    longDescription: product?.longDescription ?? "",
    status: product?.status ?? "draft",
    images: product?.images ?? [],

    material: product?.details.material ?? "",
    weight: product?.details.weight ?? "",
    dimensions: product?.details.dimensions ?? "",
    stone: product?.details.stone ?? "",
    plating: product?.details.plating ?? "",
    occasion: product?.details.occasion ?? "",
    collection: product?.details.collection ?? "",
    gender: product?.details.gender ?? "",
    careInstructions: product?.details.careInstructions ?? "",

    metalType: product?.specifications.metalType ?? "Silver",
    purity: product?.specifications.purity ?? "92.5%",
    specWeight: product?.specifications.weight ?? "",
    length: product?.specifications.length ?? "",
    width: product?.specifications.width ?? "",
    height: product?.specifications.height ?? "",
    stoneType: product?.specifications.stoneType ?? "",
    stoneColor: product?.specifications.stoneColor ?? "",
    finish: product?.specifications.finish ?? "High Polish",
    specPlating: product?.specifications.plating ?? "Rhodium",
    closureType: product?.specifications.closureType ?? "",

    estimatedDelivery: product?.shippingInfo.estimatedDelivery ?? "3-5 business days",
    returnPolicy: product?.shippingInfo.returnPolicy ?? "7-day easy returns",
    warranty: product?.shippingInfo.warranty ?? "6-month manufacturing warranty",

    mrp: product?.pricing.mrp ?? 0,
    sellingPrice: product?.pricing.sellingPrice ?? 0,
    costPrice: product?.pricing.costPrice,
    taxPercent: product?.pricing.taxPercent ?? 3,

    barcode: product?.inventory.barcode ?? "",
    stockQuantity: product?.inventory.stockQuantity ?? 0,
    lowStockThreshold: product?.inventory.lowStockThreshold ?? 8,
    continueSellingOutOfStock: product?.inventory.continueSellingOutOfStock ?? false,

    variants: product?.variants ?? [],
  };
}

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const isEdit = !!product;
  const [submitting, setSubmitting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: toFormValues(product),
  });

  const values = watch();
  const discountPercent = values.mrp > 0 ? Math.round(((values.mrp - values.sellingPrice) / values.mrp) * 100) : 0;
  const taxAmount = Math.round(((values.sellingPrice || 0) * (values.taxPercent || 0)) / 100);
  const finalPrice = (values.sellingPrice || 0) + taxAmount;

  async function onSubmit(data: ProductFormValues) {
    setSubmitting(true);
    try {
      const category = mockCategories.find((c) => c.id === data.categoryId);
      const payload: Partial<Product> = {
        name: data.name,
        sku: data.sku,
        categoryId: data.categoryId,
        categoryName: category?.name ?? "",
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        status: data.status,
        images: data.images,
        details: {
          material: data.material,
          weight: data.weight,
          dimensions: data.dimensions,
          stone: data.stone,
          plating: data.plating,
          occasion: data.occasion,
          collection: data.collection,
          gender: data.gender,
          careInstructions: data.careInstructions,
        },
        specifications: {
          metalType: data.metalType,
          purity: data.purity,
          weight: data.specWeight,
          length: data.length,
          width: data.width,
          height: data.height,
          stoneType: data.stoneType,
          stoneColor: data.stoneColor,
          finish: data.finish,
          plating: data.specPlating,
          closureType: data.closureType,
        },
        shippingInfo: {
          estimatedDelivery: data.estimatedDelivery,
          returnPolicy: data.returnPolicy,
          warranty: data.warranty,
        },
        pricing: {
          mrp: data.mrp,
          sellingPrice: data.sellingPrice,
          discountPercent,
          costPrice: data.costPrice,
          taxPercent: data.taxPercent,
        },
        inventory: {
          sku: data.sku,
          barcode: data.barcode,
          stockQuantity: data.stockQuantity,
          lowStockThreshold: data.lowStockThreshold,
          stockStatus: data.stockQuantity === 0 ? "out_of_stock" : data.stockQuantity <= data.lowStockThreshold ? "low_stock" : "in_stock",
          continueSellingOutOfStock: data.continueSellingOutOfStock,
        },
        variants: data.variants,
      };

      if (isEdit && product) {
        await updateProduct(product.id, payload);
        toast.success("Product updated successfully.");
      } else {
        await createProduct(payload);
        toast.success("Product created successfully.");
      }
      router.push("/admin/products");
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
          <TabsTrigger value="details">Description &amp; Details</TabsTrigger>
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
                        {mockCategories.map((category) => (
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
              <div className="space-y-1.5">
                <Label>Product Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="shortDescription">Short Description *</Label>
                <Textarea id="shortDescription" rows={2} {...register("shortDescription")} placeholder="One or two lines for product cards and quick previews." />
                {errors.shortDescription && <p className="text-xs text-destructive">{errors.shortDescription.message}</p>}
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <Label htmlFor="longDescription">Full Product Description *</Label>
                <Textarea id="longDescription" rows={6} {...register("longDescription")} placeholder="Shown on the customer-facing product detail page." />
                {errors.longDescription && <p className="text-xs text-destructive">{errors.longDescription.message}</p>}
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
              <Controller
                control={control}
                name="images"
                render={({ field }) => <ProductImageUploader images={field.value} onChange={field.onChange} />}
              />
              {errors.images && <p className="mt-2 text-xs text-destructive">{errors.images.message}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Product Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4 sm:grid-cols-3">
              <Field label="Material" {...register("material")} />
              <Field label="Weight" {...register("weight")} />
              <Field label="Dimensions" {...register("dimensions")} />
              <Field label="Stone" {...register("stone")} />
              <Field label="Plating" {...register("plating")} />
              <Field label="Occasion" {...register("occasion")} />
              <Field label="Collection" {...register("collection")} />
              <Field label="Gender" {...register("gender")} />
              <div className="space-y-1.5 sm:col-span-3">
                <Label>Care Instructions</Label>
                <Textarea rows={3} {...register("careInstructions")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Jewellery Specifications</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4 sm:grid-cols-3">
              <Field label="Metal Type" {...register("metalType")} />
              <Field label="Purity" {...register("purity")} />
              <Field label="Weight" {...register("specWeight")} />
              <Field label="Length" {...register("length")} />
              <Field label="Width" {...register("width")} />
              <Field label="Height" {...register("height")} />
              <Field label="Stone Type" {...register("stoneType")} />
              <Field label="Stone Color" {...register("stoneColor")} />
              <Field label="Finish" {...register("finish")} />
              <Field label="Plating" {...register("specPlating")} />
              <Field label="Closure Type" {...register("closureType")} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Shipping Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4 sm:grid-cols-3">
              <Field label="Estimated Delivery" {...register("estimatedDelivery")} />
              <Field label="Return Policy" {...register("returnPolicy")} />
              <Field label="Warranty" {...register("warranty")} />
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
                  <Label htmlFor="mrp">MRP (₹) *</Label>
                  <Input id="mrp" type="number" step="0.01" {...register("mrp", { valueAsNumber: true })} />
                  {errors.mrp && <p className="text-xs text-destructive">{errors.mrp.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sellingPrice">Selling Price (₹) *</Label>
                  <Input id="sellingPrice" type="number" step="0.01" {...register("sellingPrice", { valueAsNumber: true })} />
                  {errors.sellingPrice && <p className="text-xs text-destructive">{errors.sellingPrice.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <Label>Discount %</Label>
                  <Input value={`${discountPercent}%`} disabled />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="costPrice">Cost Price (₹)</Label>
                  <Input id="costPrice" type="number" step="0.01" {...register("costPrice", { valueAsNumber: true })} />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="taxPercent">Tax %</Label>
                  <Input id="taxPercent" type="number" step="0.01" {...register("taxPercent", { valueAsNumber: true })} />
                </div>
              </div>

              <div className="space-y-2 rounded-lg border border-border bg-muted/40 p-4 text-sm">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">Price Preview</p>
                <Row label="MRP" value={values.mrp || 0} />
                <Row label="Discount" value={-((values.mrp || 0) - (values.sellingPrice || 0))} />
                <Row label="Selling Price" value={values.sellingPrice || 0} />
                <Row label="Tax" value={taxAmount} />
                <div className="mt-2 flex items-center justify-between border-t border-border pt-2 font-medium text-foreground">
                  <span>Final Price</span>
                  <span>₹{finalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Inventory</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 pt-4 sm:grid-cols-2">
              <Field label="Barcode" {...register("barcode")} />
              <div className="space-y-1.5">
                <Label htmlFor="stockQuantity">Stock Quantity *</Label>
                <Input id="stockQuantity" type="number" {...register("stockQuantity", { valueAsNumber: true })} />
                {errors.stockQuantity && <p className="text-xs text-destructive">{errors.stockQuantity.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                <Input id="lowStockThreshold" type="number" {...register("lowStockThreshold", { valueAsNumber: true })} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2 sm:col-span-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Continue selling when out of stock</p>
                  <p className="text-xs text-muted-foreground">Customers can still place orders once stock hits zero.</p>
                </div>
                <Controller
                  control={control}
                  name="continueSellingOutOfStock"
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="mt-4">
          <Card>
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base">Product Variants</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Controller
                control={control}
                name="variants"
                render={({ field }) => <ProductVariants variants={field.value} onChange={field.onChange} />}
              />
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
            <ProductPreview
              values={values}
              categoryName={mockCategories.find((c) => c.id === values.categoryId)?.name}
            />
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
      <span className={value < 0 ? "text-success" : "text-foreground"}>
        {value < 0 ? "-" : ""}₹{Math.abs(value).toLocaleString("en-IN")}
      </span>
    </div>
  );
}

function Field({ label, ...props }: { label: string } & ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input {...props} />
    </div>
  );
}
