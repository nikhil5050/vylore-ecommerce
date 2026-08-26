"use client";

import { useState } from "react";
import { ImagePlaceholder } from "@/components/admin/ImagePlaceholder";

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
  // ImageKit URL transformation, e.g. "w-400" — appended as `?tr=`.
  transform?: string;
}

// Wraps a plain <img> with a fallback to the placeholder if the URL is
// missing or fails to load (broken ImageKit asset, network hiccup, etc.)
// instead of showing the browser's broken-image icon.
export function SafeImage({ src, alt = "", className, transform }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) return <ImagePlaceholder className={className} />;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={transform ? `${src}?tr=${transform}` : src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
