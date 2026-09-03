import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCard } from "@/components/product/ProductCard";
import { getBestsellers } from "@/services/product.service";

export async function Bestsellers() {
  const products = await getBestsellers();

  return (
    <section className="bg-moonlight py-16 lg:py-[120px]">
      <Container>
        <FadeIn className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-xs text-muted">Most Loved</p>
            <h2 className="mt-4 font-serif text-4xl text-[#680307]  sm:text-5xl">
              Best-Selling Silver Jewellery.
            </h2>
            <p className="mt-4 max-w-lg text-base text-muted">
              Discover Vylore pieces customers love most, from distinctive silver
              rings and necklaces to earrings, bracelets and more.
            </p>
          </div>
          <Button href="/shop" variant="ghost" size="md">
            View All Jewellery
          </Button>
        </FadeIn>

        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
          {products.map((product, index) => (
            <FadeIn key={product.id} delay={index * 0.05}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
