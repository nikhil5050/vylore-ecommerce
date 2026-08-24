import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { getFeaturedCollections } from "@/services/collection.service";

export async function FeaturedCollections() {
  const collections = await getFeaturedCollections();

  return (
    <section className="bg-white py-16 lg:py-[120px]">
      <Container>
        <FadeIn>
          <p className="eyebrow text-xs text-muted">Featured Collections</p>
          <h2 className="mt-4 max-w-xl font-serif text-4xl text-charcoal sm:text-5xl">
            Curated Directions.
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <FadeIn key={collection.id} delay={index * 0.08}>
              <Link href={`/collections/${collection.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <PlaceholderImage
                    tone="burgundy"
                    className="transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-4 font-serif text-xl text-charcoal transition-colors group-hover:text-burgundy">
                  {collection.name}
                </h3>
                <p className="mt-1 text-sm text-muted">{collection.description}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
