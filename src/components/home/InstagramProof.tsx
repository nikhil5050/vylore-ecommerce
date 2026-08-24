import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

export function InstagramProof() {
  return (
    <section className="py-16 lg:py-[120px]">
      <Container>
        <FadeIn className="flex flex-col items-center text-center">
          <p className="eyebrow text-xs text-muted">Follow Along</p>
          <h2 className="mt-4 font-serif text-4xl text-charcoal sm:text-5xl">@vylore</h2>
        </FadeIn>

        <div className="mt-10 grid grid-cols-3 gap-2 sm:gap-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <FadeIn key={index} delay={index * 0.04}>
              <div className="aspect-square overflow-hidden">
                <PlaceholderImage />
              </div>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          {/* href placeholder — point to the real Vylore handle once confirmed */}
          <Button href="#" variant="secondary" size="md">
            Follow on Instagram
          </Button>
        </div>
      </Container>
    </section>
  );
}
