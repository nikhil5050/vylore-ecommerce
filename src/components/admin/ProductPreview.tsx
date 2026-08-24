import { Star } from "lucide-react";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";
import { formatPrice } from "@/utils/formatPrice";
import type { ProductFormValues } from "@/lib/admin/validations/product";

interface ProductPreviewProps {
  values: ProductFormValues;
  categoryName?: string;
}

const specRows: { label: string; key: keyof ProductFormValues }[] = [
  { label: "Metal Type", key: "metalType" },
  { label: "Purity", key: "purity" },
  { label: "Weight", key: "specWeight" },
  { label: "Length", key: "length" },
  { label: "Stone Type", key: "stoneType" },
  { label: "Finish", key: "finish" },
  { label: "Plating", key: "specPlating" },
  { label: "Closure Type", key: "closureType" },
];

export function ProductPreview({ values, categoryName }: ProductPreviewProps) {
  const discountPercent = values.mrp > 0 ? Math.round(((values.mrp - values.sellingPrice) / values.mrp) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-1.5">
        {(values.images.length > 0 ? values.images : [{ id: "placeholder", url: "", isMain: true, order: 0 }])
          .slice(0, 4)
          .map((image, index) => (
            <ImagePlaceholder
              key={image.id}
              className={index === 0 ? "col-span-4 aspect-square rounded-lg" : "aspect-square rounded-md"}
            />
          ))}
      </div>

      <div>
        {categoryName && <p className="eyebrow text-xs text-muted-foreground">{categoryName}</p>}
        <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">{values.name || "Untitled Product"}</h2>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-warning text-warning" />
          ))}
          <span className="ml-1">(24)</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-foreground">{formatPrice(values.sellingPrice || 0)}</span>
          {discountPercent > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">{formatPrice(values.mrp || 0)}</span>
              <span className="text-sm font-medium text-success">{discountPercent}% off</span>
            </>
          )}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {values.shortDescription || "Short description will appear here."}
        </p>
      </div>

      <div className="flex gap-2">
        <button disabled className="h-10 flex-1 rounded-md border border-border text-sm font-medium text-foreground/60">
          Add to Cart
        </button>
        <button disabled className="h-10 flex-1 rounded-md bg-primary/60 text-sm font-medium text-primary-foreground">
          Buy Now
        </button>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-foreground">Specifications</p>
        <div className="divide-y divide-border rounded-lg border border-border text-sm">
          {specRows
            .filter((row) => values[row.key])
            .map((row) => (
              <div key={row.key} className="flex items-center justify-between px-3 py-2">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="text-foreground">{String(values[row.key])}</span>
              </div>
            ))}
        </div>
      </div>

      {values.careInstructions && (
        <div>
          <p className="mb-1 text-sm font-medium text-foreground">Care Instructions</p>
          <p className="text-sm text-muted-foreground">{values.careInstructions}</p>
        </div>
      )}

      <div>
        <p className="mb-1 text-sm font-medium text-foreground">Shipping Information</p>
        <ul className="space-y-1 text-sm text-muted-foreground">
          {values.estimatedDelivery && <li>Delivery: {values.estimatedDelivery}</li>}
          {values.returnPolicy && <li>Returns: {values.returnPolicy}</li>}
          {values.warranty && <li>Warranty: {values.warranty}</li>}
        </ul>
      </div>
    </div>
  );
}
