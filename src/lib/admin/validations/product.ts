import { z } from "zod";

export const productFormSchema = z
  .object({
    name: z.string().min(1, "Product name is required."),
    sku: z.string().min(1, "SKU is required."),
    categoryId: z.string().min(1, "Category is required."),
    description: z.string().optional(),
    isActive: z.boolean(),

    basePrice: z.number({ error: "Price is required." }).positive("Price is required."),
    compareAtPrice: z.number().positive().optional(),

    initialStock: z.number().min(0).optional(),
  })
  .refine((data) => data.compareAtPrice === undefined || data.compareAtPrice >= data.basePrice, {
    message: "Compare-at price should be at or above the selling price.",
    path: ["compareAtPrice"],
  });

export type ProductFormValues = z.infer<typeof productFormSchema>;
