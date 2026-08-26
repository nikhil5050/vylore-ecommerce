"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SceneState } from "./types";

// Total frames extracted from the video (every 2nd frame from 300 originals).
const TOTAL_FRAMES = 150;

// The video is a 360° rotation. The necklace now starts front-facing and
// spins away from camera as the user scrolls, so we play frames 1 → 60.
const START_FRAME = 1; // front/assembled view
const END_FRAME = 60; // side/rotated view

// Rotation only plays out over the first part of the scroll (the "spin"
// phase) — past this point the frame holds while the necklace repositions
// for the About section. Matches the wordmark/hero fade timing in
// VyloreExperience's GSAP timeline.
const SPIN_END_PROGRESS = 0.45;

function getFramePath(index: number): string {
  // Background-removed WebP — see public/necklace-frames (transparent everywhere
  // except the necklace itself, including its inner gaps between links/stones).
  return `/necklace-frames/frame_${String(index).padStart(4, "0")}.webp`;
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface Pose {
  xVw: number;
  scale: number;
  rotateDeg: number;
}

/**
 * Two-phase choreography driven entirely by scroll progress (0→1):
 *  - Phase A (0 → SPIN_END_PROGRESS): necklace sits right-of-center (its
 *    drawn pose is already right-of-center at xVw=0 — see note below) and
 *    drifts slightly further right as it spins away from camera.
 *  - Phase B (SPIN_END_PROGRESS → 1): the necklace crosses to the left,
 *    scaling down and tilting slightly to sit alongside the About copy
 *    (which occupies the right column during this phase).
 *
 * xVw values are deliberately small: the source frames already draw the
 * necklace right-of-center within the canvas (its own composition), so
 * translateX stacks on top of that — a large positive value here pushes
 * the necklace's right edge past the viewport and clips it.
 */
function getPose(progress: number): Pose {
  const p = Math.max(0, Math.min(1, progress));
  const PHASE_A_END_X = 6;

  if (p <= SPIN_END_PROGRESS) {
    const t = easeInOutCubic(p / SPIN_END_PROGRESS);
    return { xVw: lerp(0, PHASE_A_END_X, t), scale: 1, rotateDeg: 0 };
  }

  const t = easeInOutCubic((p - SPIN_END_PROGRESS) / (1 - SPIN_END_PROGRESS));
  return {
    xVw: lerp(PHASE_A_END_X, -34, t),
    scale: lerp(1, 0.72, t),
    rotateDeg: lerp(0, -6, t),
  };
}

interface NecklaceCanvasProps {
  sceneState: React.RefObject<SceneState>;
  reducedMotion: boolean;
}

/**
 * Scroll-driven frame-sequence canvas inspired by Apple's AirPods technique.
 * Preloads all frames as Image objects on mount; on every rAF tick, reads
 * `sceneState.progress` (0→1, set by GSAP ScrollTrigger in the parent),
 * draws the matching frame onto a <canvas>, and repositions the canvas
 * itself per `getPose` above. The necklace starts front-facing on the right
 * and spins toward its side profile over the first ~45% of the scroll, then
 * holds that pose while it crosses to the left for the About section.
 */
export function NecklaceCanvas({ sceneState, reducedMotion }: NecklaceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  // Build the ordered list of frame indices for the scroll sequence.
  // Goes from START_FRAME up to END_FRAME.
  const frameSequence = useRef<number[]>([]);
  if (frameSequence.current.length === 0) {
    const seq: number[] = [];
    for (let i = START_FRAME; i <= END_FRAME; i++) {
      seq.push(i);
    }
    frameSequence.current = seq;
  }

  const totalSequenceFrames = frameSequence.current.length;

  // Draw a specific frame onto the canvas, centered and scaled to cover.
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[frameIdx];
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // "contain" fit — show the full necklace without cropping.
    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  }, []);

  // Preload all frame images.
  useEffect(() => {
    let loaded = 0;
    const totalToLoad = totalSequenceFrames;
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES + 1);

    // Load the first frame immediately for instant display.
    const firstImg = new Image();
    firstImg.src = getFramePath(frameSequence.current[0]);
    firstImg.onload = () => {
      images[frameSequence.current[0]] = firstImg;
      imagesRef.current = images;
      // Draw right away once the canvas is sized.
      requestAnimationFrame(() => drawFrame(frameSequence.current[0]));
    };

    // Load all frames in the sequence.
    const promises = frameSequence.current.map((fi) => {
      return new Promise<void>((resolve) => {
        // Already loaded the first one above.
        if (fi === frameSequence.current[0] && firstImg.complete) {
          loaded++;
          setLoadingProgress(Math.round((loaded / totalToLoad) * 100));
          resolve();
          return;
        }
        const img = new Image();
        img.src = getFramePath(fi);
        img.onload = () => {
          images[fi] = img;
          loaded++;
          setLoadingProgress(Math.round((loaded / totalToLoad) * 100));
          resolve();
        };
        img.onerror = () => {
          loaded++;
          setLoadingProgress(Math.round((loaded / totalToLoad) * 100));
          resolve();
        };
      });
    });

    Promise.all(promises).then(() => {
      imagesRef.current = images;
      setIsReady(true);
    });
  }, [totalSequenceFrames, drawFrame]);

  // Resize canvas to match CSS pixel size (retina-aware).
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        // Redraw at current frame after resize.
        if (lastFrameRef.current >= 0) {
          drawFrame(lastFrameRef.current);
        }
      }
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [drawFrame]);

  // Animation loop: read progress, draw the matching frame, and reposition
  // the canvas per the current pose.
  useEffect(() => {
    function tick() {
      const progress = sceneState.current.progress;
      const clamped = Math.max(0, Math.min(1, progress));

      // Rotation only advances through SPIN_END_PROGRESS, then holds.
      const rotationProgress = Math.min(clamped / SPIN_END_PROGRESS, 1);
      const seqIdx = Math.round(rotationProgress * (totalSequenceFrames - 1));
      const frameIdx = frameSequence.current[seqIdx];

      if (frameIdx !== lastFrameRef.current && frameIdx !== undefined) {
        lastFrameRef.current = frameIdx;
        drawFrame(frameIdx);
      }

      const wrapper = wrapperRef.current;
      if (wrapper) {
        const { xVw, scale, rotateDeg } = getPose(clamped);
        wrapper.style.transform = `translateX(${xVw}vw) scale(${scale}) rotate(${rotateDeg}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sceneState, totalSequenceFrames, drawFrame]);

  if (reducedMotion) {
    // Static fallback: front-facing pose, centered, no motion.
    return (
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getFramePath(START_FRAME)}
          alt="Vylore emerald necklace"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute inset-0 z-10"
      style={{ willChange: "transform" }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-label="Scroll-driven necklace assembly animation"
        role="img"
      />

      {/* Loading shimmer — visible until all frames are loaded */}
      {!isReady && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-sm transition-opacity duration-700">
          <div className="h-1 w-48 overflow-hidden rounded-full bg-charcoal/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="eyebrow text-[10px] tracking-widest text-charcoal/50">
            Loading experience
          </p>
        </div>
      )}

      {/* Subtle emerald glow overlay at full assembly */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-1000"
        style={{
          opacity: isReady ? 1 : 0,
          background:
            "radial-gradient(ellipse 40% 50% at 55% 55%, rgba(16, 185, 129, 0.06) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
