"use client";

import Image from "next/image";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface CarouselImage {
  src: string;
  alt: string;
}

// Local product photography — see /public/images/about/. Exactly five: the
// wrap-around math in rotate() below is written for a 5-image, 5-slot ring.
const CAROUSEL_IMAGES: CarouselImage[] = [
  { src: "/images/about/jewellery-1.jpg", alt: "Delicate layered silver necklace" },
  { src: "/images/about/jewellery-2.jpg", alt: "Silver bracelet with brilliant-cut stones" },
  { src: "/images/about/jewellery-3.jpg", alt: "Rings and bracelet detail on the hand" },
  { src: "/images/about/jewellery-4.jpg", alt: "Pearl pendant necklace" },
  { src: "/images/about/jewellery-5.jpg", alt: "Layered necklace detail" },
];

const AUTO_ROTATE_MS = 4200;
const TRANSITION_SECONDS = 1.5;
const SWIPE_THRESHOLD_PX = 45;
// Canonical slot range: always ±2, independent of how many are visibly
// styled — there are exactly 5 images, so this never changes with viewport.
const CANONICAL_MAX_OFFSET = 2;

type Breakpoint = "mobile" | "tablet" | "desktop";

function getBreakpoint(width: number): Breakpoint {
  if (width < 640) return "mobile";
  if (width < 1024) return "tablet";
  return "desktop";
}

// How many slots either side of center are actually shown, how close
// together cards sit (as a fraction of one card's width), and how strongly
// the 3D rotation reads — all dialed back on smaller screens so the
// perspective effect doesn't distort into an unreadable pile of cards.
const BREAKPOINT_CONFIG: Record<Breakpoint, { visibleOffset: number; overlap: number; rotateIntensity: number }> = {
  desktop: { visibleOffset: 2, overlap: 0.72, rotateIntensity: 1 },
  tablet: { visibleOffset: 1, overlap: 0.8, rotateIntensity: 0.85 },
  mobile: { visibleOffset: 1, overlap: 0.88, rotateIntensity: 0.55 },
};

interface SlotStyle {
  x: number;
  scale: number;
  rotationY: number;
  opacity: number;
  zIndex: number;
}

function getSlotStyle(offset: number, spacing: number, config: (typeof BREAKPOINT_CONFIG)[Breakpoint]): SlotStyle {
  const distance = Math.abs(offset);
  const direction = Math.sign(offset);
  const scale = distance === 0 ? 1 : Math.max(0.56, 1 - distance * 0.16);
  const baseRotate = distance === 0 ? 0 : 14 + (distance - 1) * 12;
  const rotationY = -direction * baseRotate * config.rotateIntensity;
  const visible = distance <= config.visibleOffset;
  const opacity = visible ? Math.max(0.42, 1 - distance * 0.3) : 0;
  const zIndex = 50 - distance * 10;
  return { x: offset * spacing, scale, rotationY, opacity, zIndex };
}

export function AboutHero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  // Which canonical slot (-2..2) each image currently occupies, by image index.
  const offsetsRef = useRef<number[]>([-2, -1, 0, 1, 2]);
  const spacingRef = useRef(0);
  const breakpointRef = useRef<Breakpoint>("desktop");
  const isAnimatingRef = useRef(false);
  const queueRef = useRef<Array<1 | -1>>([]);
  const dragStartXRef = useRef<number | null>(null);
  const reducedMotionRef = useRef(false);

  const [centerIndex, setCenterIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  const applyLayout = useCallback((immediate: boolean) => {
    const config = BREAKPOINT_CONFIG[breakpointRef.current];
    offsetsRef.current.forEach((offset, i) => {
      const el = cardRefs.current[i];
      if (!el) return;
      const style = getSlotStyle(offset, spacingRef.current, config);
      const vars = { x: style.x, scale: style.scale, rotationY: style.rotationY, opacity: style.opacity, zIndex: style.zIndex };
      if (immediate) gsap.set(el, vars);
      else gsap.to(el, { ...vars, duration: TRANSITION_SECONDS, ease: "power3.inOut" });
    });
  }, []);

  const measure = useCallback(() => {
    const stage = stageRef.current;
    const card = cardRefs.current.find(Boolean) ?? null;
    if (!stage || !card) return;
    const width = stage.getBoundingClientRect().width;
    const bp = getBreakpoint(width);
    breakpointRef.current = bp;
    spacingRef.current = card.getBoundingClientRect().width * BREAKPOINT_CONFIG[bp].overlap;
    applyLayout(true);
  }, [applyLayout]);

  // Recursion happens through this ref (assigned right after the useCallback
  // below, every render) rather than by having the callback close over its
  // own `rotate` binding — the queue drain fires from a GSAP onComplete
  // long after mount, so it always wants the latest identity anyway.
  const rotateRef = useRef<(direction: 1 | -1) => void>(() => {});

  const rotate = useCallback((direction: 1 | -1) => {
    if (isAnimatingRef.current) {
      queueRef.current.push(direction);
      return;
    }
    isAnimatingRef.current = true;

    const config = BREAKPOINT_CONFIG[breakpointRef.current];
    const spacing = spacingRef.current;
    const duration = reducedMotionRef.current ? 0 : TRANSITION_SECONDS;
    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        const next = queueRef.current.shift();
        if (next) rotateRef.current(next);
      },
    });

    offsetsRef.current = offsetsRef.current.map((offset, i) => {
      const el = cardRefs.current[i];
      if (!el) return offset;

      let next = offset - direction;
      let wrapped = false;
      if (next > CANONICAL_MAX_OFFSET) {
        next -= 5;
        wrapped = true;
      } else if (next < -CANONICAL_MAX_OFFSET) {
        next += 5;
        wrapped = true;
      }

      if (wrapped) {
        // This card can't physically slide from one edge to the other in one
        // pass — it exits further off in the direction it was already
        // heading (still reads as a continuation of the slide), and while
        // fully transparent at the midpoint, jumps to the mirrored staging
        // spot on the opposite edge to slide back in from there.
        const exitOffset = direction === 1 ? -(CANONICAL_MAX_OFFSET + 1) : CANONICAL_MAX_OFFSET + 1;
        const entryOffset = -exitOffset;
        const half = duration / 2;
        const exitStyle = getSlotStyle(exitOffset, spacing, config);
        const entryStyle = getSlotStyle(entryOffset, spacing, config);
        const finalStyle = getSlotStyle(next, spacing, config);

        tl.to(el, { x: exitStyle.x, scale: exitStyle.scale, rotationY: exitStyle.rotationY, opacity: 0, duration: half, ease: "power2.in" }, 0);
        tl.set(el, { x: entryStyle.x, scale: entryStyle.scale, rotationY: entryStyle.rotationY, zIndex: finalStyle.zIndex }, half || 0);
        tl.to(
          el,
          { x: finalStyle.x, scale: finalStyle.scale, rotationY: finalStyle.rotationY, opacity: finalStyle.opacity, duration: half, ease: "power2.out" },
          half || 0,
        );
      } else {
        const style = getSlotStyle(next, spacing, config);
        tl.to(el, { x: style.x, scale: style.scale, rotationY: style.rotationY, opacity: style.opacity, zIndex: style.zIndex, duration, ease: "power3.inOut" }, 0);
      }

      return next;
    });

    setCenterIndex(() => {
      const idx = offsetsRef.current.findIndex((o) => o === 0);
      return idx === -1 ? 0 : idx;
    });
  }, []);

  useEffect(() => {
    rotateRef.current = rotate;
  }, [rotate]);

  const goTo = useCallback(
    (targetIndex: number) => {
      const forwardSteps = (targetIndex - centerIndex + 5) % 5;
      const backwardSteps = (centerIndex - targetIndex + 5) % 5;
      if (forwardSteps === 0) return;
      const direction: 1 | -1 = forwardSteps <= backwardSteps ? 1 : -1;
      const steps = Math.min(forwardSteps, backwardSteps);
      for (let s = 0; s < steps; s++) rotate(direction);
    },
    [centerIndex, rotate],
  );

  // Initial mount: read reduced-motion preference, size the stage, and
  // position every card without animating.
  useLayoutEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // GSAP owns `transform` entirely once it writes to an element, so the
    // -50%/-50% centering has to go through its own xPercent/yPercent
    // rather than a plain CSS transform — otherwise the first gsap.set()
    // below would silently discard it. GSAP caches these and keeps
    // composing them into every later x/scale/rotationY tween.
    cardRefs.current.forEach((el) => {
      if (el) gsap.set(el, { xPercent: -50, yPercent: -50 });
    });

    measure();

    const ro = new ResizeObserver(() => measure());
    if (stageRef.current) ro.observe(stageRef.current);
    window.addEventListener("resize", measure);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  // Kill any in-flight tweens on unmount so nothing keeps writing to
  // detached DOM nodes.
  useEffect(() => {
    const cards = cardRefs.current;
    return () => {
      cards.forEach((el) => {
        if (el) gsap.killTweensOf(el);
      });
    };
  }, []);

  useEffect(() => {
    if (reducedMotionRef.current || isPaused) return;
    const id = setInterval(() => rotate(1), AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [isPaused, rotate]);

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragStartXRef.current = e.clientX;
    setIsPaused(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const start = dragStartXRef.current;
    dragStartXRef.current = null;
    setIsPaused(false);
    if (start === null) return;
    const delta = e.clientX - start;
    if (Math.abs(delta) > SWIPE_THRESHOLD_PX) rotate(delta < 0 ? 1 : -1);
  }

  function handlePointerCancel() {
    dragStartXRef.current = null;
    setIsPaused(false);
  }

  return (
    <section className="relative w-full overflow-hidden bg-white py-14 sm:py-20 lg:py-28">
      <Container>
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "About" }]} />

        <div className="mt-8 text-center sm:mt-10">
          <p className="eyebrow text-xs tracking-widest text-[#8B7A6A]">About Vylore</p>
          <h1 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl lg:text-5xl">Celestial silver, crafted for your story.</h1>
           <p className="eyebrow text-xs   text-muted mt-8">Vylore crafts modern silver jewelry backed by 25+ years of family expertise in gold and jewellery-making distinctive pieces for the modern wearer.</p>
        
        </div>
      </Container>

      <div
        ref={stageRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="Vylore jewellery highlights"
        className="relative mx-auto mt-12 h-[118vw] max-h-[500px] min-h-[360px] w-full max-w-5xl touch-pan-y select-none sm:mt-16 sm:h-[46vw] sm:max-h-[440px] sm:min-h-[280px] lg:h-[26vw]"
        style={{ perspective: "1400px" }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          dragStartXRef.current = null;
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
      >
        {CAROUSEL_IMAGES.map((image, i) => (
          <div
            key={image.src}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 aspect-[13/20] w-[74vw] max-w-[300px] overflow-hidden rounded-[18px] shadow-[0_18px_40px_-26px_rgba(20,20,20,0.4)] will-change-transform sm:w-[42vw] sm:max-w-[280px] lg:w-[19vw] lg:rounded-[20px]"
          >
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={i === 2}
                sizes="(max-width: 640px) 74vw, (max-width: 1024px) 42vw, 19vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center gap-2 sm:mt-14">
        {CAROUSEL_IMAGES.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${image.alt}`}
            aria-current={i === centerIndex}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === centerIndex ? "w-6 bg-burgundy" : "w-1.5 bg-charcoal/20 hover:bg-charcoal/40"}`}
          />
        ))}
      </div>
    </section>
  );
}
