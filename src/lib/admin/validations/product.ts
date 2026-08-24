import { z } from "zod";

export const productImageSchema = z.object({
  id: z.string(),
  url: z.string(),
  isMain: z.boolean(),
  order: z.number(),
});

export const productVariantSchema = z.object({
  id: z.string(),
  size: z.string().optional(),
  material: z.string().optional(),
  sku: z.string().min(1, "Variant SKU is required."),
  price: z.number().min(0),
  stock: z.number().min(0),
  weight: z.string().optional(),
  imageUrl: z.string().optional(),
});

export const productFormSchema = z
  .object({
    name: z.string().min(1, "Product name is required."),
    sku: z.string().min(1, "SKU is required."),
    categoryId: z.string().min(1, "Category is required."),
    shortDescription: z.string().min(1, "Short description is required."),
    longDescription: z.string().min(1, "Product description is required."),
    status: z.enum(["draft", "active", "inactive"]),
    images: z.array(productImageSchema).min(1, "At least one product image is required."),

    material: z.string().optional(),
    weight: z.string().optional(),
    dimensions: z.string().optional(),
    stone: z.string().optional(),
    plating: z.string().optional(),
    occasion: z.string().optional(),
    collection: z.string().optional(),
    gender: z.string().optional(),
    careInstructions: z.string().optional(),

    metalType: z.string().optional(),
    purity: z.string().optional(),
    specWeight: z.string().optional(),
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    stoneType: z.string().optional(),
    stoneColor: z.string().optional(),
    finish: z.string().optional(),
    specPlating: z.string().optional(),
    closureType: z.string().optional(),

    estimatedDelivery: z.string().optional(),
    returnPolicy: z.string().optional(),
    warranty: z.string().optional(),

    mrp: z.number({ error: "MRP is required." }).positive("MRP is required."),
    sellingPrice: z.number({ error: "Selling price is required." }).positive("Selling price is required."),
    costPrice: z.number().optional(),
    taxPercent: z.number().min(0),

    barcode: z.string().optional(),
    stockQuantity: z.number({ error: "Stock is required." }).min(0, "Stock is required."),
    lowStockThreshold: z.number().min(0),
    continueSellingOutOfStock: z.boolean(),

    variants: z.array(productVariantSchema),
  })
  .refine((data) => data.sellingPrice <= data.mrp, {
    message: "Selling price cannot be greater than MRP.",
    path: ["sellingPrice"],
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;
