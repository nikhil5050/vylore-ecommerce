import { HeroCategorySearch } from "./HeroCategorySearch";
import Image from "next/image";

interface BackgroundWordmarkProps {
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export function BackgroundWordmark({ innerRef }: BackgroundWordmarkProps) {
  return (
    <div
      ref={innerRef}
      className="pointer-events-none absolute inset-0 z-[15] flex select-none flex-col items-center justify-start overflow-hidden px-6 pt-[15%] sm:items-start sm:justify-center sm:px-10 sm:pt-0 md:px-16"
    >
      {/* Decorative wordmark, subhead, and tagline — grouped and hidden from
          assistive tech as a unit. `contents` keeps them as direct flex
          children (unaffected layout) while letting this wrapper carry
          aria-hidden without swallowing the search bar below, which needs
          to stay reachable. */}
      <div aria-hidden="true" className="contents">
        {/* VYLORE sits close above JEWELLERS. */}
        <Image
          src="https://ik.imagekit.io/vyloreimgs/vylore/branding/Secondary%20Logo-04%20(1).png"
          alt=""
          width={600}
          height={200}
          className="relative block h-auto self-center sm:self-start"
          style={{
            width: "clamp(11rem, 33vw, 26rem)",
          }}
        />

        {/* JEWELLERS sits directly below VYLORE — same display face, deliberately smaller than the wordmark above it so VYLORE reads as the primary word */}
        <span
          className="
          mt-1
          font-serif
          font-bold
          
          leading-none
          opacity-50
          tracking-[0.08em]
          text-charcoal
          self-center sm:mt-0.5 sm:self-start
        "
          style={{
            fontSize: "clamp(1rem, 2.2vw, 1.5rem)",
          }}
        >
          Jewellery That Speaks Your Style.
        </span>

        {/* Quiet supporting line — clearly separated from the heading, not crowding it */}
        <p className="mt-4 max-w-[290px] text-center text-xs leading-relaxed tracking-[0.05em] text-charcoal/60 sm:mt-5 sm:max-w-[560px] sm:self-start sm:text-left sm:text-sm">
          Discover contemporary silver jewellery designed with intention.
          Explore distinctive rings, necklaces, earrings, bracelets, anklets
          and ear cuffs created for everyday .
        </p>

        <div className="no-scrollbar mt-5 flex w-full max-w-[560px] items-center justify-start gap-4 overflow-x-auto whitespace-nowrap sm:mt-6 sm:gap-5">
          <span className="inline-flex shrink-0 items-center gap-2 border-l-2 border-burgundy/70 pl-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-charcoal/75 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" aria-hidden="true" />
            925 Sterling Silver
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 border-l-2 border-burgundy/70 pl-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-charcoal/75 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" aria-hidden="true" />
            Korean-Inspired Finish
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 border-l-2 border-burgundy/70 pl-3 text-[9px] font-semibold uppercase tracking-[0.1em] text-charcoal/75 sm:text-[10px]">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy" aria-hidden="true" />
            Contemporary Heirloom Design
          </span>
        </div>
      </div>

      {/* Category search — mobile only. Placed in normal flow right after the
          description (not absolutely positioned) so it always lands directly
          beneath the text — right above the necklace, which starts just below
          it — no matter how many lines the description wraps to. */}
      <HeroCategorySearch />
    </div>
  );
}
