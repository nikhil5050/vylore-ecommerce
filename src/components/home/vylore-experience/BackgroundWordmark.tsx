import { HeroCategorySearch } from "./HeroCategorySearch";

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
        <div
          className="
          relative
          flex
          items-center
          uppercase
          leading-none
          tracking-tight
          text-burgundy
          self-center sm:self-start
        "
          style={{
            fontFamily: '"Fleur De Leah", Times, serif',
            fontSize: "clamp(2.15rem, 7.5vw, 5.75rem)",
          }}
        >
          VYLORE
        </div>

        {/* JEWELLERS sits directly below VYLORE — same display face, deliberately smaller than the wordmark above it so VYLORE reads as the primary word */}
        <span
          className="
          mt-1
          font-serif
          font-bold
          uppercase
          leading-none
          opacity-50
          tracking-[0.08em]
          text-charcoal
          self-center sm:mt-0.5 sm:self-start
        "
          style={{
            fontSize: "clamp(1.7rem, 6.25vw, 4.75rem)",
          }}
        >
          JEWELLERS
        </span>

        {/* Quiet supporting line — clearly separated from the heading, not crowding it */}
        <p className="mt-4 max-w-[290px] text-center text-xs leading-relaxed tracking-[0.05em] text-charcoal/60 sm:mt-5 sm:max-w-[360px] sm:self-start sm:text-left sm:text-sm">
          Discover contemporary silver jewellery designed with intention.
          Explore distinctive rings, necklaces, earrings, bracelets, anklets
          and ear cuffs created for everyday expression and individuality.
        </p>
      </div>

      {/* Category search — mobile only. Placed in normal flow right after the
          description (not absolutely positioned) so it always lands directly
          beneath the text — right above the necklace, which starts just below
          it — no matter how many lines the description wraps to. */}
      <HeroCategorySearch />
    </div>
  );
}
