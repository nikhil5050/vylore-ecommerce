import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

interface AboutOverlayProps {
  innerRef: React.RefObject<HTMLDivElement | null>;
}

export function AboutOverlay({ innerRef }: AboutOverlayProps) {
  return (
    <div
      ref={innerRef}
      className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end pb-10 opacity-0 sm:pb-14 lg:flex-row lg:items-center lg:pb-0"
    >
      <Container className="w-full max-h-[56dvh] touch-pan-y overscroll-contain overflow-y-auto bg-transparent py-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:max-h-none lg:overflow-visible lg:py-0 lg:grid lg:grid-cols-2 lg:gap-8">
        {/* Compact specifications balance the open space beside the necklace */}
        <div className="hidden lg:flex lg:flex-col lg:justify-end lg:self-stretch lg:pb-2">
          <p className="about-stagger-item eyebrow text-[10px] text-muted">The Vylore Standard</p>
          <div className="about-stagger-item mt-4 max-w-[210px] border-t border-charcoal/15">
            <div className="flex items-center justify-between border-b border-charcoal/10 py-3">
              <span className="text-xs text-muted">Material</span>
              <span className="text-xs font-medium text-charcoal">Sterling silver</span>
            </div>
            <div className="flex items-center justify-between border-b border-charcoal/10 py-3">
              <span className="text-xs text-muted">Finish</span>
              <span className="text-xs font-medium text-charcoal">Hand polished</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <span className="text-xs text-muted">Made for</span>
              <span className="text-xs font-medium text-charcoal">Special occasions</span>
            </div>
          </div>
        </div>
        {/* Text on the RIGHT so it doesn't obstruct the necklace (left-of-center) */}
        <div className="pointer-events-auto flex max-w-md flex-col items-start px-6 lg:px-0 lg:justify-self-end">
          <p className="about-stagger-item eyebrow text-xs  text-[#810201]">The Vylore Philosophy</p>
          <h5 className="about-stagger-item mt-3 max-w-md font-serif text-2xl leading-tight text-charcoal sm:mt-4 sm:text-2xl lg:text-3xl">
            More Than an Ornament. Jewellery That Defines You.
          </h5>
          <p className="about-stagger-item mt-4 max-w-md text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
            At Vylore, we create contemporary silver jewellery that reflects
            your individuality. Every piece combines modern design, refined
            craftsmanship and distinctive details to create jewellery made for
            everyday expression.
            From elegant silver rings and earrings to necklaces and statement
            pieces, Vylore jewellery is designed to complement your style and
            become a meaningful part of who you are.
          </p>
          <p className="about-stagger-item mt-4 max-w-md text-sm font-medium leading-relaxed text-charcoal sm:mt-6 sm:text-base">
            Vylore — More Than an Ornament. It&rsquo;s Part of Your Identity.
          </p>

          <Button
            href="/about"
            variant="primary"
            size="lg"
            className="about-stagger-item group mt-6 rounded-full px-8 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-burgundy/25 hover:-translate-y-0.5 active:translate-y-0 sm:mt-9"
          >
            Discover Vylore
            <svg
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Button>
        </div>
      </Container>
    </div>
  );
}
