"use client";

import { useEffect, useRef, useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { cn } from "@/utils/cn";

// Thumbnails are identical placeholders until real photography exists — only the border/track position reflects selection.
const VIEW_COUNT = 4;

export function ProductGallery({ productName }: { productName: string }) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (!visible) return;
        const index = panelRefs.current.findIndex((panel) => panel === visible.target);
        if (index !== -1) setActive(index);
      },
      { root: track, threshold: 0.6 },
    );

    panelRefs.current.forEach((panel) => panel && observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    panelRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <div>
      <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
        {Array.from({ length: VIEW_COUNT }).map((_, index) => (
          <div
            key={index}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className="aspect-[4/5] w-full shrink-0 snap-center overflow-hidden"
          >
            <PlaceholderImage />
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-3">
        {Array.from({ length: VIEW_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`${productName} — view ${index + 1}`}
            aria-current={active === index}
            className={cn(
              "aspect-[4/5] overflow-hidden border transition-colors",
              active === index ? "border-burgundy" : "border-transparent",
            )}
          >
            <PlaceholderImage />
          </button>
        ))}
      </div>
    </div>
  );
}
