"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { Category } from "@/types/category";

interface CategoryAutoScrollerProps {
  categories: Category[];
}

const AUTO_SCROLL_PX_PER_SEC = 28;
const RESUME_DELAY_MS = 2500;

/**
 * Mobile category row: auto-scrolls sideways on its own, but a touch/drag
 * pauses it immediately and hands control back to the user — normal native
 * scrolling — resuming the auto-scroll a couple of seconds after they let
 * go. Desktop keeps the original centered, wrapping grid (no scrolling,
 * see globals.css's max-width:767px gate on .category-slider-track) and
 * isn't touched by any of this.
 *
 * The row's contents are duplicated (categories + a copy) so the auto-scroll
 * can loop seamlessly: once scrollLeft passes the width of one full set, it
 * wraps back by that same width with no visible jump.
 */
export function CategoryAutoScroller({ categories }: CategoryAutoScrollerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number | null>(null);
  const pausedRef = useRef(false);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion, setReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion || categories.length === 0) return;

    function tick(ts: number) {
      if (!track) return;
      if (pausedRef.current) {
        lastTsRef.current = ts;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (lastTsRef.current !== null) {
        const dt = (ts - lastTsRef.current) / 1000;
        const loopWidth = track.scrollWidth / 2;
        let next = track.scrollLeft + AUTO_SCROLL_PX_PER_SEC * dt;
        if (loopWidth > 0 && next >= loopWidth) next -= loopWidth;
        track.scrollLeft = next;
      }
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [reducedMotion, categories.length]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      pausedRef.current = false;
      resumeTimerRef.current = null;
    }, RESUME_DELAY_MS);
  }, []);

  useEffect(() => () => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="category-slider-viewport">
      <div
        ref={trackRef}
        className="category-slider-track no-scrollbar flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10"
        onPointerDown={pause}
        onPointerUp={scheduleResume}
        onPointerCancel={scheduleResume}
        onTouchStart={pause}
        onTouchEnd={scheduleResume}
        onWheel={pause}
      >
        {categories.map((category, index) => (
          <FadeIn key={category.id} delay={index * 0.05}>
            <Link
              href={`/category/${category.slug}`}
              className="group flex w-28 shrink-0 flex-col items-center text-center sm:w-32 md:w-36 lg:w-40"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-charcoal/80 p-0.5 transition-transform duration-300 group-hover:scale-105 group-hover:border-burgundy">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <ProductThumbnail
                    src={category.imageUrl}
                    alt={category.name}
                    transform="w-300"
                    className="transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>

              <h3 className="mt-4 font-serif text-xs font-semibold tracking-widest text-charcoal uppercase transition-colors group-hover:text-burgundy sm:text-sm">
                {category.name}
              </h3>
            </Link>
          </FadeIn>
        ))}
        <div className="category-slider-copy flex items-center gap-6 sm:gap-8 md:gap-10" aria-hidden="true">
          {categories.map((category) => (
            <Link
              key={`copy-${category.id}`}
              href={`/category/${category.slug}`}
              tabIndex={-1}
              className="group flex w-28 shrink-0 flex-col items-center text-center sm:w-32 md:w-36 lg:w-40"
            >
              <div className="relative aspect-square w-full overflow-hidden rounded-full border border-charcoal/80 p-0.5">
                <div className="h-full w-full overflow-hidden rounded-full">
                  <ProductThumbnail src={category.imageUrl} alt={category.name} transform="w-300" />
                </div>
              </div>
              <h3 className="mt-4 font-serif text-xs font-semibold tracking-widest text-charcoal uppercase sm:text-sm">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
