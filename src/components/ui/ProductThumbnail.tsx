"use client";

import { useState } from "react";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";

interface ProductThumbnailProps {
  src?: string;
  alt?: string;
  className?: string;
  // ImageKit URL transformation, e.g. "w-800" — appended as `?tr=`.
  transform?: string;
}

// Falls back to the decorative placeholder when there's no image yet, or the
// URL fails to load, instead of a broken-image icon.
export function ProductThumbnail({ src, alt = "", className, transform }: ProductThumbnailProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <PlaceholderImage className={className} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={transform ? `${src}?tr=${transform}` : src}
      alt={alt}
      className={`h-full w-full object-cover ${className ?? ""}`}
      onError={() => setFailed(true)}
    />
  );
}
