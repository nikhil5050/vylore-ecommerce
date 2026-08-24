"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { GemIcon } from "@/components/icons/Icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { AboutOverlay } from "./AboutOverlay";
import { BackgroundWordmark } from "./BackgroundWordmark";
import { HeroOverlay } from "./HeroOverlay";
import { StagePoster } from "./StagePoster";
import type { SceneState } from "./types";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Scene = dynamic(() => import("./Scene").then((mod) => mod.Scene), {
  ssr: false,
  loading: () => <StagePoster />,
});

/**
 * Hero -> About scroll experience: a sticky stage holds the 3D canvas while
 * GSAP ScrollTrigger drives a shared progress ref (0 = hero, 1 = about) that
 * the R3F bracelet billboard reads imperatively in useFrame, plus a
 * text-layer timeline (hero copy + background wordmark fade/parallax out,
 * About content fades and staggers in).
 */
export function VyloreExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const sceneState = useRef<SceneState>({ progress: 0 });
  const reducedMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

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
          { autoAlpha: 0, y: -50, filter: "blur(8px)", ease: "power1.in", duration: 0.4 },
          0
        )
        .to(
          wordmarkRef.current,
          { autoAlpha: 0, x: "-5vw", y: -30, filter: "blur(6px)", ease: "power1.in", duration: 0.45 },
          0
        )
        .fromTo(
          aboutRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, ease: "power1.out", duration: 0.3 },
          0.55
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
          0.58
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return <StaticExperience />;
  }

  return (
    <section ref={containerRef} className="relative h-[200dvh] w-full bg-ivory lg:h-[220dvh]">
      <div className="sticky top-0 h-dvh w-full overflow-hidden">
        <BackgroundWordmark innerRef={wordmarkRef} />
        <Scene sceneState={sceneState} reducedMotion={false} isDesktop={isDesktop} />
        <HeroOverlay innerRef={heroRef} />
        <AboutOverlay innerRef={aboutRef} />
      </div>
    </section>
  );
}

/** No-JS-animation fallback for prefers-reduced-motion: a static hero pose plus a normal-flow about section. */
function StaticExperience() {
  const sceneState = useRef<SceneState>({ progress: 0 });
  const isDesktop = useIsDesktop();

  return (
    <>
      <section className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-ivory">
        <BackgroundWordmark />
        <Scene sceneState={sceneState} reducedMotion isDesktop={isDesktop} />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-end gap-3 pb-16">
          <div className="flex items-center gap-2">
            <GemIcon className="h-3.5 w-3.5 text-champagne" />
            <p className="eyebrow text-xs text-charcoal/70">
              Jewellery that becomes part of your story
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-[120px]">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <FadeIn>
            <div className="relative aspect-[4/3] overflow-hidden bg-white">
              <Image
                src="/images/jewellery/vylore-bracelet-v2.png"
                alt="Vylore silver diamond bracelet"
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-contain"
              />
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="eyebrow text-xs text-muted">Our Story</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Built on Legacy. Designed for What&apos;s Next.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
              Vylore is built on more than twenty-five years of family experience in the
              jewellery business, carried forward with a modern point of view. The result is
              fine jewellery designed for a new generation — distinctive, considered, and
              made without compromise.
            </p>
            <Button href="/collections" variant="secondary" size="md" className="mt-8">
              Explore Collection
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
