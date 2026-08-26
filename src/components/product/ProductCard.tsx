import Link from "next/link";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Product } from "@/types/product";
import { formatPrice } from "@/utils/formatPrice";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link href={`/product/${product.slug}`} className="block h-full w-full">
          <ProductThumbnail
            src={product.images?.[0]?.url}
            alt={product.images?.[0]?.altText ?? product.name}
            transform="w-500"
            className="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>

        {product.badge && (
          <span className="eyebrow absolute left-3 top-3 bg-white/90 px-2 py-1 text-[10px] text-charcoal">
            {product.badge}
          </span>
        )}

        <div className="absolute right-3 top-3">
          <WishlistButton product={product} />
        </div>
      </div>

      <Link href={`/product/${product.slug}`} className="mt-3 block">
        <p className="eyebrow text-[11px] text-muted">{product.category}</p>
        <h3 className="mt-1 font-serif text-lg text-charcoal transition-colors group-hover:text-burgundy">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span className="text-charcoal">{formatPrice(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-muted line-through">{formatPrice(product.compareAtPrice)}</span>
          )}
        </div>
      </Link>
    </div>
  );
}
