import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { GemIcon } from "@/components/icons/Icons";
import { siteConfig } from "@/config/site";

export function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center overflow-hidden bg-charcoal text-ivory">
      {/* Background Video */}
      {/* <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center "
        src="/hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      /> */}

      {/* Subtle Dark Gradient Overlay for Readability */}
      {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-transparent" /> */}

      <Container className="relative z-10 py-20 lg:py-32">
        <FadeIn>
          {/* Eyebrow with Gem Icon on Left */}
          <div className="flex items-center gap-2">
            <GemIcon className="h-4 w-4 text-champagne" />
            <p className="eyebrow text-xs tracking-widest text-champagne">
              Vylore — Silver Jewellery
            </p>
          </div>

          <h1 className="mt-5 max-w-2xl font-serif text-5xl leading-[1.1] sm:text-6xl lg:text-7xl">
            {siteConfig.tagline}
          </h1>

          <p className="mt-6 max-w-md text-base text-ivory/80 leading-relaxed">
            {siteConfig.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/collections" variant="inverse" size="lg">
              Explore Collection
            </Button>
            <Button href="/about" variant="inverse-outline" size="lg">
              Discover Vylore
            </Button>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}