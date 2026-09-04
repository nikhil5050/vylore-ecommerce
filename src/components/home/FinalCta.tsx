import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";

// Internal category links doubled as an ItemList below — kept in one place so
// the visible chips and the structured data never drift apart.
const categories = [
  { label: "Rings", href: "/category/rings" },
  { label: "Necklaces", href: "/category/necklaces" },
  { label: "Earrings", href: "/category/earrings" },
  { label: "Anklets", href: "/category/anklets" },
  { label: "New Arrivals", href: "/new-arrivals" },
];

const trustFacts = [
  "925 Sterling Silver",
  "Cash on Delivery Available",
  "Track Your Order Anytime",
];

// GEO/AEO: an explicit, machine-readable list of what Vylore sells, so
// answer/generative engines can lift a structured summary of the catalog
// straight from this section instead of inferring it from prose.
const categoryListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Vylore Sterling Silver Jewellery Categories",
  itemListElement: categories.map((category, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: category.label,
    url: `https://www.vylore.in${category.href}`,
  })),
};

export function FinalCta() {
  return (
    <section className="border-t border-silver/30 bg-white py-16 sm:py-20 lg:py-[120px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(categoryListJsonLd) }}
      />
      <Container className="flex flex-col items-center text-center">
        <FadeIn>
          <p className="eyebrow text-xs text-[#810201]">Shop Vylore</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-[#680307] sm:text-5xl lg:text-6xl">
            Your Story, Set in Silver.
          </h2>
        </FadeIn>

        <FadeIn delay={0.05}>
          {/* First sentence is written as a direct, quotable answer to
              "what is Vylore" for AEO/GEO extraction; keeps real product
              nouns (rings, necklaces, earrings, bracelets, anklets, ear
              cuffs) for SEO. */}
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-charcoal sm:text-lg">
            Vylore is a contemporary sterling silver jewellery brand offering
            rings, necklaces, earrings, bracelets, anklets and ear cuffs,
            designed in India for everyday wear and individual style.
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Every piece is made in genuine 925 sterling silver, with
            transparent pricing and clear product details — so you always
            know exactly what you&rsquo;re wearing.
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button href="/shop" variant="primary" size="lg" className="w-full sm:w-auto">
            Shop All Jewellery
          </Button>
          <Button href="/about" variant="secondary" size="lg" className="w-full sm:w-auto">
            Discover Our Story
          </Button>
        </FadeIn>

        <FadeIn delay={0.15} className="mt-10 flex w-full max-w-2xl flex-wrap items-center justify-center gap-x-3 gap-y-2">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-full border border-charcoal/15 bg-white px-4 py-1.5 text-xs uppercase tracking-wide text-muted transition-colors hover:border-burgundy hover:text-burgundy"
            >
              {category.label}
            </Link>
          ))}
        </FadeIn>

        <FadeIn
          delay={0.2}
          className="mt-10 flex w-full max-w-xl flex-col items-center justify-center gap-3 border-t border-charcoal/10 pt-8 text-xs uppercase tracking-wide text-muted sm:flex-row sm:gap-6"
        >
          {trustFacts.map((fact, index) => (
            <span key={fact} className="flex items-center gap-3 sm:gap-6">
              {fact}
              {index < trustFacts.length - 1 && (
                <span aria-hidden="true" className="hidden h-1 w-1 rounded-full bg-charcoal/20 sm:block" />
              )}
            </span>
          ))}
        </FadeIn>
      </Container>
    </section>
  );
}
