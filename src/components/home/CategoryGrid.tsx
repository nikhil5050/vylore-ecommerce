import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { getCategories } from "@/services/category.service";

export async function CategoryGrid() {
  const categories = await getCategories();

  return (
    <section className="py-10 lg:py-16">
      <Container>
        <div className="category-slider-viewport">
          <div className="category-slider-track flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10">
            {categories.map((category, index) => (
              <FadeIn key={category.id} delay={index * 0.05}>
                <Link
                  href={`/category/${category.slug}`}
                  className="group flex w-28 shrink-0 flex-col items-center text-center sm:w-32 md:w-36 lg:w-40"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-full border border-charcoal/80 p-0.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-burgundy">
                    <div className="h-full w-full overflow-hidden rounded-full">
                      <ProductThumbnail
                        src={category.imageUrl}
                        alt={category.name}
                        transform="w-300"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <h3 className="mt-4 font-serif text-xs font-semibold tracking-widest text-charcoal uppercase transition-colors group-hover:text-burgundy sm:text-sm">
                    {category.name}
                  </h3>
                </Link>
              </FadeIn>
            ))}
            <div className="category-slider-copy flex items-center gap-6 sm:gap-8 md:gap-10" aria-hidden="true">
              {categories.map((category) => (
                <Link
                  key={`copy-${category.id}`}
                  href={`/category/${category.slug}`}
                  tabIndex={-1}
                  className="group flex w-28 shrink-0 flex-col items-center text-center sm:w-32 md:w-36 lg:w-40"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-full border border-charcoal/80 p-0.5">
                    <div className="h-full w-full overflow-hidden rounded-full">
                      <ProductThumbnail src={category.imageUrl} alt={category.name} transform="w-300" />
                    </div>
                  </div>
                  <h3 className="mt-4 font-serif text-xs font-semibold tracking-widest text-charcoal uppercase sm:text-sm">
                    {category.name}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}