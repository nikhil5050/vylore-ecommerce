import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function BrandIntro() {
  return (
    <section className="py-16 lg:py-[120px]">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <div className="aspect-[3/4] overflow-hidden">
            <PlaceholderImage />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p className="eyebrow text-xs text-muted">Our Story</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Built on Legacy. Designed for What&apos;s Next.
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Vylore is built on more than twenty-five years of family experience in the
            jewellery business, carried forward with a modern point of view. The result is
            silver jewellery designed for a new generation — distinctive, considered, and
            made without compromise.
          </p>
          <Button href="/about" variant="secondary" size="md" className="mt-8">
            Our Story
          </Button>
        </FadeIn>
      </Container>
    </section>
  );
}
