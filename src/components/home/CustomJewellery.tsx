import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function CustomJewellery() {
  return (
    <section className="py-16 lg:py-[120px]">
      <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <FadeIn className="order-2 lg:order-1">
          <p className="eyebrow text-xs text-muted">Custom Jewellery</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
            Made For You.
          </h2>
          <p className="mt-6 max-w-md text-base text-muted">
            Have an idea in mind? Work with Vylore to create jewellery shaped around your
            requirements.
          </p>
          <Button href="/custom-jewellery" variant="primary" size="lg" className="mt-8">
            Start a Custom Design
          </Button>
        </FadeIn>

        <FadeIn delay={0.1} className="order-1 lg:order-2">
          <div className="aspect-[4/5] overflow-hidden">
            <PlaceholderImage tone="burgundy" />
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
