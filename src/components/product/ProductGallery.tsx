"use client";

import { useEffect, useRef, useState } from "react";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { ProductImage } from "@/types/product";
import { cn } from "@/utils/cn";

interface ProductGalleryProps {
  productName: string;
  images: ProductImage[];
}

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  const views = images.length > 0 ? images : [undefined];

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
  }, [views.length]);

  function goTo(index: number) {
    panelRefs.current[index]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }

  return (
    <div>
      <div ref={trackRef} className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto">
        {views.map((image, index) => (
          <div
            key={index}
            ref={(el) => {
              panelRefs.current[index] = el;
            }}
            className="aspect-[4/5] w-full shrink-0 snap-center overflow-hidden"
          >
            {image ? (
              <ProductThumbnail src={image.url} alt={image.altText ?? productName} transform="w-1200" />
            ) : (
              <PlaceholderImage />
            )}
          </div>
        ))}
      </div>

      {views.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {views.map((image, index) => (
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
              {image ? (
                <ProductThumbnail src={image.url} alt={image.altText ?? productName} transform="w-200" />
              ) : (
                <PlaceholderImage />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
