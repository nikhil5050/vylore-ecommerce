"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "@/components/icons/Icons";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import type { ProductImage } from "@/types/product";
import { cn } from "@/utils/cn";

// Pan/pinch-zoom gesture handling is only needed once someone actually opens
// it, so it stays out of the initial product-page bundle until then.
const ProductImageZoom = dynamic(
  () => import("./ProductImageZoom").then((mod) => mod.ProductImageZoom),
  { ssr: false }
);

interface ProductGalleryProps {
  productName: string;
  images: ProductImage[];
}

export function ProductGallery({ productName, images }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomIndex, setZoomIndex] = useState<number | null>(null);
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
            className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden"
          >
            {image ? (
              <button
                type="button"
                onClick={() => setZoomIndex(index)}
                aria-label={`${productName} — zoom image ${index + 1}`}
                className="group block h-full w-full cursor-zoom-in"
              >
                <ProductThumbnail src={image.url} alt={image.altText ?? productName} transform="w-1200" />
                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-charcoal shadow-md backdrop-blur-sm transition-transform group-hover:scale-110">
                  <SearchIcon className="h-4 w-4" aria-hidden />
                </span>
              </button>
            ) : (
              <PlaceholderImage />
            )}
          </div>
        ))}
      </div>

      {zoomIndex !== null && (
        <ProductImageZoom
          productName={productName}
          images={images}
          initialIndex={zoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}

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
