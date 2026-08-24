import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductCard } from "@/components/product/ProductCard";
import { getNewArrivals } from "@/services/product.service";

export async function NewArrivals() {
  const products = await getNewArrivals();

  return (
    <section className="py-16 lg:py-[120px]">
      <Container>
        <FadeIn className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow text-xs text-muted">New Arrivals</p>
            <h2 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">
              Discover the Latest.
            </h2>
          </div>
          <Button href="/new-arrivals" variant="ghost" size="md">
            View All
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
