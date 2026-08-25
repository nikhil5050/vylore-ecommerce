interface BackgroundWordmarkProps {
  innerRef?: React.RefObject<HTMLDivElement | null>;
}

export function BackgroundWordmark({ innerRef }: BackgroundWordmarkProps) {
  return (
    <div
      ref={innerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 flex select-none flex-col items-center justify-center gap-8 overflow-hidden px-8 py-12 sm:items-stretch sm:justify-between sm:gap-0 md:px-16 md:py-20"
    >
      {/* VYLORE — top-left on desktop, centered on mobile */}
      <div
        className="
          relative
          flex
          items-center
          font-serif
          font-bold
          uppercase
          leading-none
          tracking-tight
          text-burgundy
          sm:self-start
        "
        style={{
          fontSize: "clamp(2.75rem, 13vw, 9rem)",
        }}
      >
        {/* VYL */}
        <span className="relative z-10">VYL</span>

        {/* Ring replacing O */}
        <span
          className="
            relative
            z-30
            inline-block
            shrink-0
          "
          style={{
            width: "1.28em",
            height: "1em",
            marginLeft: "-0.08em",
            marginRight: "-0.55em",
          }}
        >
          <img
            src="https://vylore.in/public/ring.png"
            alt=""
            className="
  absolute
  left-1/2
  top-1/2
  z-30
  w-[1.45em]
  max-w-none
  -translate-x-1/2
  -translate-y-[38%]
  object-contain
"          />
        </span>

        {/* RE */}
        <span className="relative z-10">
          RE
        </span>
      </div>

      {/* JEWELLERY — bottom-right on desktop, centered on mobile */}
      <span
        className="
          font-serif
          font-bold
          uppercase
          leading-none
          tracking-tight
          text-charcoal
          sm:self-end
        "
        style={{
          fontSize: "clamp(2.75rem, 15vw, 10rem)",
        }}
      >
        JEWELLERY
      </span>
    </div>
  );
}