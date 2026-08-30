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
      <Container className="w-full max-h-[56dvh] overflow-y-auto bg-transparent py-6 lg:max-h-none lg:overflow-visible lg:py-0 lg:grid lg:grid-cols-2 lg:gap-8">
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
          <p className="about-stagger-item eyebrow text-xs text-muted">Our Story</p>
          <h2 className="about-stagger-item mt-3 max-w-md font-serif text-2xl leading-tight text-charcoal sm:mt-4 sm:text-4xl lg:text-5xl">
            Built on Legacy. Designed for What&apos;s Next.
          </h2>
          <p className="about-stagger-item mt-4 max-w-md text-sm leading-relaxed text-muted sm:mt-6 sm:text-base">
            Vylore is built on more than twenty-five years of family experience in the
            jewellery business, carried forward with a modern point of view. The result is
            fine jewellery designed for a new generation — distinctive, considered, and
            made without compromise.
          </p>

          <Button
            href="/shop"
            variant="primary"
            size="lg"
            className="about-stagger-item group mt-6 rounded-full px-8 shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-burgundy/25 hover:-translate-y-0.5 active:translate-y-0 sm:mt-9"
          >
            Explore Collection
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
