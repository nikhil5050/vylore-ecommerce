"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { GemIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AboutOverlay } from "./AboutOverlay";
import { BackgroundWordmark } from "./BackgroundWordmark";
import { HeroOverlay } from "./HeroOverlay";
import { NecklaceCanvas } from "./NecklaceCanvas";
import type { SceneState } from "./types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers fire resize events when the address bar shows/hides
  // during scroll (timing varies by browser/OS) — without this,
  // ScrollTrigger's default resize handling recalculates this section's
  // start/end mid-scroll, which is what made the animation work on some
  // phones but stall or jump on others.
  ScrollTrigger.config({ ignoreMobileResize: true });
  // Touch scroll delivers input in discrete, sometimes-paused chunks (vs.
  // a mouse wheel's steady stream), which this pinned/scrubbed section reads
  // as scroll "stalling" mid-animation — the pin only releases into the next
  // section once the touch-driven scroll fully catches up. normalizeScroll
  // smooths touch input into consistent scroll deltas, fixing that stutter.
  // Scoped to coarse pointers only, so desktop wheel/trackpad is untouched.
  if (window.matchMedia("(pointer: coarse)").matches) {
    ScrollTrigger.normalizeScroll(true);
  }
}

/**
 * Hero → About scroll experience: a sticky stage holds the scroll-driven
 * necklace assembly canvas while GSAP ScrollTrigger drives a shared progress
 * ref (0 = side/fragmented view, 1 = fully assembled necklace). The necklace
 * visually assembles from scattered fragments into its complete form as the
 * user scrolls, ending with the emerald pendant settling into place.
 *
 * Text overlays (hero copy + background wordmark) fade/parallax out as the
 * necklace assembles, then About content fades and staggers in.
 */
export function VyloreExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const sceneState = useRef<SceneState>({ progress: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            sceneState.current.progress = self.progress;
          },
        },
      });

      timeline
        .to(
          heroRef.current,
          {
            autoAlpha: 0,
            y: -50,
            filter: "blur(8px)",
            ease: "power1.in",
            duration: 0.4,
          },
          0,
        )
        .to(
          wordmarkRef.current,
          {
            autoAlpha: 0,
            x: "-5vw",
            y: -30,
            filter: "blur(6px)",
            ease: "power1.in",
            duration: 0.45,
          },
          0,
        )
        .fromTo(
          aboutRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "power1.out", duration: 0.3 },
          0.55,
        );

      if (aboutRef.current) {
        timeline.fromTo(
          aboutRef.current.querySelectorAll(".about-stagger-item"),
          { autoAlpha: 0, x: 80, filter: "blur(8px)" },
          {
            autoAlpha: 1,
            x: 0,
            filter: "blur(0px)",
            ease: "power3.out",
            duration: 1,
            stagger: 0.12,
          },
          0.58,
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <StaticExperience />;
  }

  return (
    <section
      ref={containerRef}
      className="relative h-[250dvh] w-full bg-white lg:h-[280dvh]"
    >
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        {/* The visible "VYLORE JEWELLERS" wordmark below is a stylized
            logotype, not real heading text — this is the page's actual,
            crawlable H1 (see SEO content brief). */}
        <h1 className="sr-only">
          Sterling Silver Jewellery With A Point Of View.
        </h1>
        <BackgroundWordmark innerRef={wordmarkRef} />
        <NecklaceCanvas sceneState={sceneState} reducedMotion={false} />
        <HeroOverlay innerRef={heroRef} />
        <AboutOverlay innerRef={aboutRef} />
      </div>
    </section>
  );
}

/** No-JS-animation fallback for prefers-reduced-motion: a static necklace image plus a normal-flow about section. */
function StaticExperience() {
  return (
    <>
      <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-white">
        <h1 className="sr-only">
          Sterling Silver Jewellery With A Point Of View.
        </h1>
        <BackgroundWordmark />
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/necklace-frames/frame_0001.webp"
            alt="Vylore emerald and diamond necklace"
            className="h-full w-full object-contain"
          />
        </div>
      </section>

      <section className="py-16 lg:py-[120px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/necklace-frames/frame_0001.webp"
                alt="Vylore emerald necklace — assembled view"
                className="h-full w-full object-contain"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow text-xs text-muted">The Vylore Philosophy</p>
            <h5 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              More Than an Ornament. Jewellery That Defines You.
            </h5>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              At Vylore, we create contemporary silver jewellery that reflects
              your individuality. Every piece combines modern design, refined
              craftsmanship and distinctive details to create jewellery made for
              everyday expression.
            </p>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
              From elegant silver rings and earrings to necklaces and
              statement pieces, Vylore jewellery is designed to complement
              your style and become a meaningful part of who you are.
            </p>
            <p className="mt-4 max-w-lg text-base font-medium leading-relaxed text-charcoal">
              Vylore — More Than an Ornament. It&rsquo;s Part of Your Identity.
            </p>

            <Button
              href="/about"
              variant="secondary"
              size="md"
              className="mt-8"
            >
              Discover Our Story
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
