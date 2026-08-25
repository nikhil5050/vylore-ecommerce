import React from "react";
import Image from "next/image";
import { GemIcon } from "@/components/icons/Icons";

interface HeroOverlayProps {
  innerRef: React.RefObject<HTMLDivElement | null>;
}

export function HeroOverlay({ innerRef }: HeroOverlayProps) {
  return (
    <div ref={innerRef} className="absolute inset-0 z-20 pointer-events-none">
      {/* Top Eyebrow Tagline */}
      <div className="absolute left-0 right-0 top-8 flex justify-center px-6 sm:top-12">
        <div className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-charcoal/10 bg-ivory/60 px-4 py-1.5 shadow-sm backdrop-blur-md transition-all hover:bg-ivory/80">
          <GemIcon className="h-3.5 w-3.5 text-champagne animate-pulse" />
          <p className="eyebrow text-[11px] font-medium tracking-wide text-charcoal/80 sm:text-xs">
            Jewellery that becomes part of your story
          </p>
        </div>
      </div>

      {/* Floating Detail Callout — Top Right (Tablet/Desktop) */}
      <div className="hero-callout absolute right-6 top-[20%] hidden max-w-[210px] sm:right-10 sm:block lg:top-[24%]">
        <div className="pointer-events-auto flex items-center gap-3 rounded-xl border border-white/40 bg-ivory/50 p-3 shadow-lg shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-ivory/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-champagne opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-champagne" />
          </span>
          <p className="eyebrow text-[10px] font-medium uppercase tracking-wider text-charcoal/90 leading-tight">
            Silver &amp; Emerald-Cut Diamonds
          </p>
        </div>
      </div>

      {/* Floating Detail Callout — Bottom Left (Tablet/Desktop) */}
      {/* <div className="hero-callout absolute bottom-[18%] left-6 hidden items-center gap-3.5 sm:left-10 sm:flex lg:bottom-[22%]">
        <div className="pointer-events-auto flex items-center gap-3.5 rounded-2xl border border-white/50 bg-ivory/60 p-2 pr-4 shadow-xl shadow-black/5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-ivory/80">
          <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-charcoal/10 bg-white shadow-inner">
            <Image
              src="/animationimg.png"
              alt="Velora diamond ring detail"
              fill
              sizes="48px"
              className="object-cover transition-transform duration-500 hover:scale-110"
            />
          </div>
          <div>
            <span className="block text-[9px] font-semibold uppercase tracking-widest text-champagne">
              Featured Piece
            </span>
            <p className="eyebrow text-[11px] font-medium text-charcoal/80">
              Velora / 01 — Silver Ring
            </p>
          </div>
        </div>
      </div> */}

      {/* Bottom Group: Mobile Chip & Interactive Scroll Indicator */}
      <div className="hero-callout absolute inset-x-6 bottom-6 flex flex-col items-center gap-6 sm:bottom-8">
        {/* Compact Detail Callout — Mobile Only */}
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/50 bg-ivory/75 px-3.5 py-1.5 shadow-md backdrop-blur-md sm:hidden">
          <div className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full bg-white shadow-inner">
            <Image
              src="/animationimg.png"
              alt="Velora diamond ring detail"
              fill
              sizes="24px"
              className="object-cover"
            />
          </div>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
          <p className="eyebrow text-[10px] font-medium text-charcoal/90">
            Silver &amp; Emerald-Cut Diamonds
          </p>
        </div>

        {/* Floating Animated Scroll Indicator */}
        <div className="pointer-events-auto flex flex-col items-center gap-2 transition-opacity duration-300 hover:opacity-100 opacity-70">
          <span className="eyebrow text-[9px] font-semibold uppercase tracking-widest text-charcoal/60">
            Scroll to explore
          </span>
          <div className="relative h-8 w-4 rounded-full border border-charcoal/30 p-1">
            <div className="h-1.5 w-1.5 animate-bounce rounded-full bg-charcoal/60" />
          </div>
        </div>
      </div>
    </div>
  );
}