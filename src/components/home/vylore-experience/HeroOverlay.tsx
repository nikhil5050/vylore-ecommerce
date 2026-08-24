import Image from "next/image";
import { GemIcon } from "@/components/icons/Icons";

interface HeroOverlayProps {
  innerRef: React.RefObject<HTMLDivElement | null>;
}

export function HeroOverlay({ innerRef }: HeroOverlayProps) {
  return (
    <div ref={innerRef} className="absolute inset-0 z-20">
      {/* Eyebrow tagline, top */}
      <div className="absolute left-0 right-0 top-8 flex justify-center px-6 sm:top-12">
        <div className="flex items-center gap-2">
          <GemIcon className="h-3.5 w-3.5 text-champagne" />
          <p className="eyebrow text-[11px] text-charcoal/70 sm:text-xs">
            Jewellery that becomes part of your story
          </p>
        </div>
      </div>

      {/* Floating detail callout — top right (tablet/desktop) */}
      <div className="hero-callout absolute right-4 top-[22%] hidden max-w-[190px] sm:right-8 sm:block lg:top-[26%]">
        <div className="flex items-center gap-3 border border-charcoal/10 bg-ivory/70 px-3 py-2.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
          <p className="eyebrow text-[10px] leading-snug text-charcoal/80">
            18K Gold &amp; Emerald-Cut Diamonds
          </p>
        </div>
      </div>

      {/* Floating detail callout — bottom left, with reference thumbnail (tablet/desktop) */}
      {/* <div className="hero-callout absolute bottom-[16%] left-4 hidden items-center gap-3 sm:left-8 sm:flex lg:bottom-[20%]">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-charcoal/10 bg-white shadow-sm">
          <Image
            src="/animationimg.png"
            alt="Vylore diamond bangle detail"
            fill
            sizes="56px"
            className="object-cover mix-blend-multiply"
          />
        </div>
        <p className="eyebrow max-w-[130px] text-[10px] leading-snug text-charcoal/70">
          Velora / 01 — Diamond Bangle
        </p>
      </div> */}

      {/* Bottom group: mobile chip (if any) + scroll cue, stacked with a guaranteed gap so they never collide */}
      <div className="hero-callout absolute inset-x-6 bottom-6 flex flex-col items-center gap-4 sm:bottom-10 sm:gap-2">
        {/* Compact detail callout — mobile only, single centered chip so it never collides with the model */}
        <div className="flex items-center gap-2.5 border border-charcoal/10 bg-ivory/80 px-3 py-2 backdrop-blur-sm sm:hidden">
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-white">
            <Image
              src="/animationimg.png"
              alt="Vylore diamond bangle detail"
              fill
              sizes="24px"
              className="object-cover mix-blend-multiply"
            />
          </div>
          <span className="h-1 w-1 shrink-0 rounded-full bg-champagne" />
          <p className="eyebrow text-[9px] leading-snug text-charcoal/80">
            18K Gold &amp; Emerald-Cut Diamonds
          </p>
        </div>

        {/* <div className="flex flex-col items-center gap-2">
          <span className="eyebrow text-[10px] text-charcoal/50">Scroll to explore</span>
          <span className="h-8 w-px bg-charcoal/25" />
        </div> */}
      </div>
    </div>
  );
}
