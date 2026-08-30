import { Playfair_Display } from "next/font/google";
import Image from "next/image";

// A dedicated display serif for this oversized background wordmark — richer
// letterforms and more presence at huge sizes than the site's default
// --font-display (currently a sans-serif placeholder, see layout.tsx).
const wordmarkFont = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

interface BackgroundWordmarkProps {
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export function BackgroundWordmark({ innerRef }: BackgroundWordmarkProps) {
  return (
    <div
      ref={innerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-[15] flex select-none flex-col items-center justify-start overflow-hidden px-6 pt-[15%] sm:items-start sm:justify-center sm:px-10 sm:pt-0 md:px-16"
    >
      {/* VYLORE sits close above JEWELLERS */}
      <div
        className={`
          relative
          flex
          items-center
          ${wordmarkFont.className}
          font-bold
          uppercase
          leading-none
          tracking-tight
          text-burgundy
          self-center sm:self-start
        `}
        style={{
          fontSize: "clamp(2.15rem, 7.5vw, 5.75rem)",
        }}
      >
        {/* VYL */}
        <span className="relative z-10 ">VYL</span>

        {/* Ring replacing O */}
        <span
          className="
            relative
            z-30
            inline-block
            shrink-0
          "
          style={{
            width: "1.38em",
            height: "1.08em",
            marginLeft: "-0.09em",
            marginRight: "-0.6em",
          }}
        >
          <Image
            src="/ring.png"
            alt=""
            width={555}
            height={348}
            sizes="(max-width: 640px) 130px, 240px"
            className="
  absolute
  left-1/2
  top-1/2
  z-30
  w-[1.55em]
  max-w-none
  -translate-x-1/2
  -translate-y-[35%]
  object-contain
"
          />
        </span>

        {/* RE */}
        <span className="relative z-10">RE</span>
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
        Thoughtfully crafted jewellery for every story — timeless designs in
        fine silver, made to be worn and loved for a lifetime.
      </p>

      {/* Product label chip — mobile only. Placed in normal flow right after
          the description (not absolutely positioned) so it always lands
          directly beneath the text — right above the necklace, which starts
          just below it — no matter how many lines the description wraps to. */}
      <div className="pointer-events-auto mt-5 flex w-full max-w-[290px] items-center gap-2 overflow-hidden rounded-full border border-white/50 bg-ivory/75 px-3 py-1.5 shadow-md backdrop-blur-md sm:hidden">
        <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-white shadow-inner">
          <Image
            src="/necklace-frames/frame_0001.webp"
            alt="Emerald & diamond necklace detail"
            fill
            sizes="24px"
            className="object-cover"
          />
        </div>
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
        <p className="eyebrow min-w-0 flex-1 truncate text-[10px] font-medium text-charcoal/90">
          Emerald & Diamond Necklace
        </p>
      </div>
    </div>
  );
}
