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
      <span
        className="font-serif font-bold uppercase leading-none tracking-tight text-burgundy sm:self-start"
        style={{ fontSize: "clamp(2.75rem, 15vw, 10rem)" }}
      >
        VYLORE
      </span>

      {/* JEWELLERY — bottom-right on desktop, centered on mobile */}
      <span
        className="font-serif font-bold uppercase leading-none tracking-tight text-charcoal sm:self-end"
        style={{ fontSize: "clamp(2.75rem, 15vw, 10rem)" }}
      >
        JEWELLERY
      </span>
    </div>
  );
}