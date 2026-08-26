import { Star } from "lucide-react";
import { SafeImage } from "@/components/admin/SafeImage";
import { formatPrice } from "@/utils/formatPrice";
import type { ProductFormValues } from "@/lib/admin/validations/product";
import type { ProductImage } from "@/types/admin";

interface ProductPreviewProps {
  values: ProductFormValues;
  images: ProductImage[];
  categoryName?: string;
}

export function ProductPreview({ values, images, categoryName }: ProductPreviewProps) {
  const discountPercent =
    values.compareAtPrice && values.compareAtPrice > values.basePrice
      ? Math.round(((values.compareAtPrice - values.basePrice) / values.compareAtPrice) * 100)
      : 0;

  const sorted = [...images].sort((a, b) => a.position - b.position);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-1.5">
        {(sorted.length > 0 ? sorted : [{ id: "placeholder", url: "" }]).slice(0, 4).map((image, index) => (
          <div key={image.id} className={index === 0 ? "col-span-4 aspect-square overflow-hidden rounded-lg" : "aspect-square overflow-hidden rounded-md"}>
            <SafeImage src={image.url} transform="w-600" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div>
        {categoryName && <p className="eyebrow text-xs text-muted-foreground">{categoryName}</p>}
        <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">{values.name || "Untitled Product"}</h2>
        <div className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-warning text-warning" />
          ))}
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-foreground">{formatPrice(values.basePrice || 0)}</span>
          {discountPercent > 0 && (
            <>
              <span className="text-sm text-muted-foreground line-through">{formatPrice(values.compareAtPrice ?? 0)}</span>
              <span className="text-sm font-medium text-success">{discountPercent}% off</span>
            </>
          )}
        </div>
        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
          {values.description || "Product description will appear here."}
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
    </div>
  );
}
