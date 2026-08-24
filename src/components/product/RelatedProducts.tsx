import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/types/product";

export function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="border-t border-silver/30 py-16 lg:py-20">
      <p className="eyebrow text-xs text-muted">You May Also Like</p>
      <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Related Pieces</h2>

      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
