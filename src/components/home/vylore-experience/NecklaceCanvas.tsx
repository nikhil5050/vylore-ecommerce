"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SceneState } from "./types";

// Total frames extracted from the video (every 2nd frame from 300 originals).
const TOTAL_FRAMES = 150;

// The video is a 360° rotation. The necklace now starts front-facing and
// spins away from camera as the user scrolls, so we play frames 1 → 60.
const START_FRAME = 1; // front/assembled view
const END_FRAME = 150; // full rotation

function getFramePath(index: number): string {
  // Background-removed WebP — see public/necklace-frames (transparent everywhere
  // except the necklace itself, including its inner gaps between links/stones).
  return `/necklace-frames/frame_${String(index).padStart(4, "0")}.webp`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

interface Pose {
  xVw: number;
  yVh: number;
  scale: number;
  rotateDeg: number;
}

// Matches Tailwind's `sm` breakpoint, which is also where BackgroundWordmark
// switches from its stacked mobile layout (text pinned near the top) to the
// side-by-side desktop one (text left, necklace right).
const MOBILE_BREAKPOINT_PX = 640;

// Where the necklace's own content (not the mostly-empty frame it was shot
// in — see ContentBounds) should sit on mobile, as fractions of the sticky
// viewport height. Two targets, blended by scroll progress (see
// mobileTargetForProgress): at the very top of the scroll, BackgroundWordmark's
// stacked "VYLORE JEWELLERS" heading + description paragraph occupy roughly
// the top third of the screen (pt-[8%] plus the text block itself), so the
// necklace needs to sit lower, leaving clear space below that text — not
// pinned to the same spot it ends at. By the time the About panel has
// scrolled in near the end, it should have risen to sit above that panel
// (which is what MOBILE_ABOUT_* alone used to do for the *entire* scroll,
// crowding the hero text at progress 0).
const MOBILE_HERO_CENTER_Y = 0.6;
const MOBILE_HERO_HEIGHT = 0.3;
const MOBILE_ABOUT_CENTER_Y = 0.28;
const MOBILE_ABOUT_HEIGHT = 0.3;
// Blend completes by this fraction of the scroll — roughly matching when
// BackgroundWordmark/HeroOverlay have finished fading (see VyloreExperience's
// GSAP timeline), so the necklace has already risen out of the way by the
// time the About panel's text starts appearing, rather than drifting for the
// whole scroll.
const MOBILE_TRANSITION_END = 0.55;
const MOBILE_FIT_SCALE_MIN = 1.1;
const MOBILE_FIT_SCALE_MAX = 2.4;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;
}

function mobileTargetForProgress(progress: number): { centerY: number; height: number } {
  const t = easeInOutCubic(Math.min(1, Math.max(0, progress) / MOBILE_TRANSITION_END));
  return {
    centerY: MOBILE_HERO_CENTER_Y + (MOBILE_ABOUT_CENTER_Y - MOBILE_HERO_CENTER_Y) * t,
    height: MOBILE_HERO_HEIGHT + (MOBILE_ABOUT_HEIGHT - MOBILE_HERO_HEIGHT) * t,
  };
}

interface ContainFit {
  dx: number;
  dy: number;
  dw: number;
  dh: number;
}

function computeContainFit(cw: number, ch: number, iw: number, ih: number): ContainFit {
  const scale = Math.min(cw / iw, ch / ih);
  const dw = iw * scale;
  const dh = ih * scale;
  return { dx: (cw - dw) / 2, dy: (ch - dh) / 2, dw, dh };
}

/**
 * Finds candidate "glint" spots on a frame — near-white, low-saturation,
 * opaque pixels, which on these frames means a diamond facet catching
 * light rather than the gold setting or the emerald stones. Also measures
 * the frame's true horizontal center of mass (the necklace rotates, so this
 * shifts frame to frame — a fixed centering offset drifts as soon as the
 * user scrolls or drags to a different rotation angle). Both come from one
 * scan of a small downscaled copy of the frame (not the full 1280x720),
 * since this only needs plausible facet locations and an approximate
 * center, not exact pixels — runs once per frame during preload, not
 * every render.
 */
interface ContentBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface FrameAnalysis {
  glintPoints: { x: number; y: number }[];
  centerX: number;
  // Bounding box (normalized 0-1) of the necklace's actual pixels within the
  // frame. The source frames are wide 16:9 product photos with a lot of dead
  // space around the necklace itself (see getPose's mobile-fit comment) — this
  // is what lets the mobile layout scale/position the necklace itself rather
  // than the mostly-empty frame it was shot in.
  bounds: ContentBounds;
}

function analyzeFrame(img: HTMLImageElement, maxGlintPoints: number): FrameAnalysis {
  const SAMPLE_W = 160;
  const SAMPLE_H = Math.max(1, Math.round(SAMPLE_W * (img.naturalHeight / img.naturalWidth)));
  const sampler = document.createElement("canvas");
  sampler.width = SAMPLE_W;
  sampler.height = SAMPLE_H;
  const sctx = sampler.getContext("2d", { willReadFrequently: true });
  const fallback: FrameAnalysis = {
    glintPoints: [],
    centerX: 0.5,
    bounds: { minX: 0, maxX: 1, minY: 0, maxY: 1 },
  };
  if (!sctx) return fallback;
  sctx.drawImage(img, 0, 0, SAMPLE_W, SAMPLE_H);

  let data: Uint8ClampedArray;
  try {
    data = sctx.getImageData(0, 0, SAMPLE_W, SAMPLE_H).data;
  } catch {
    return fallback; // canvas tainted (shouldn't happen for same-origin /public assets) — fail quietly
  }

  const candidates: { x: number; y: number; brightness: number }[] = [];
  // Mass-weighted, not bounding-box midpoint: a single thin chain link
  // reaching further out than the rest of the necklace would otherwise pull
  // a min/max-based center toward it, even though the dense, eye-catching
  // cluster of stones sits elsewhere — this tracks where the pixels (and so
  // the visual weight) actually are instead.
  let sumX = 0;
  let count = 0;
  let minX = SAMPLE_W;
  let maxX = 0;
  let minY = SAMPLE_H;
  let maxY = 0;

  for (let y = 0; y < SAMPLE_H; y++) {
    for (let x = 0; x < SAMPLE_W; x++) {
      const i = (y * SAMPLE_W + x) * 4;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      if (a < 200) continue; // transparent background, not the necklace
      sumX += x;
      count++;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
      const brightness = (r + g + b) / 3;
      const saturation = Math.max(r, g, b) - Math.min(r, g, b);
      if (brightness > 232 && saturation < 22) {
        candidates.push({ x: x / SAMPLE_W, y: y / SAMPLE_H, brightness });
      }
    }
  }

  candidates.sort((a, b) => b.brightness - a.brightness);
  const picked: { x: number; y: number }[] = [];
  const MIN_SEPARATION = 0.06; // normalized fraction of image size — keeps points spread out
  for (const c of candidates) {
    if (picked.length >= maxGlintPoints) break;
    if (picked.every((p) => Math.hypot(p.x - c.x, p.y - c.y) > MIN_SEPARATION)) {
      picked.push({ x: c.x, y: c.y });
    }
  }

  const centerX = count > 0 ? sumX / count / SAMPLE_W : 0.5;
  const bounds: ContentBounds =
    count > 0
      ? { minX: minX / SAMPLE_W, maxX: maxX / SAMPLE_W, minY: minY / SAMPLE_H, maxY: maxY / SAMPLE_H }
      : fallback.bounds;
  return { glintPoints: picked, centerX, bounds };
}

/** A small four-point lens-flare glint, additively blended so it reads as light rather than a painted shape. */
function drawGlint(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) {
  ctx.save();
  ctx.globalCompositeOperation = "lighter";
  ctx.globalAlpha = opacity;

  const coreRadius = size * 0.9;
  const core = ctx.createRadialGradient(x, y, 0, x, y, coreRadius);
  core.addColorStop(0, "rgba(255,255,255,1)");
  core.addColorStop(0.4, "rgba(255,255,255,0.5)");
  core.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = core;
  ctx.beginPath();
  ctx.arc(x, y, coreRadius, 0, Math.PI * 2);
  ctx.fill();

  const rayLen = size * 3.2;
  ctx.lineWidth = size * 0.35;

  const horizontal = ctx.createLinearGradient(x - rayLen, y, x + rayLen, y);
  horizontal.addColorStop(0, "rgba(255,255,255,0)");
  horizontal.addColorStop(0.5, "rgba(255,255,255,0.9)");
  horizontal.addColorStop(1, "rgba(255,255,255,0)");
  ctx.strokeStyle = horizontal;
  ctx.beginPath();
  ctx.moveTo(x - rayLen, y);
  ctx.lineTo(x + rayLen, y);
  ctx.stroke();

  const vertical = ctx.createLinearGradient(x, y - rayLen, x, y + rayLen);
  vertical.addColorStop(0, "rgba(255,255,255,0)");
  vertical.addColorStop(0.5, "rgba(255,255,255,0.9)");
  vertical.addColorStop(1, "rgba(255,255,255,0)");
  ctx.strokeStyle = vertical;
  ctx.beginPath();
  ctx.moveTo(x, y - rayLen);
  ctx.lineTo(x, y + rayLen);
  ctx.stroke();

  ctx.restore();
}

const SPARKLE_COUNT = 7;

interface SparkleSlot {
  candidateIndex: number;
  cycleDurationSec: number;
  phaseOffsetSec: number;
  lastPhase: number;
}

function makeSparkleSlots(count: number): SparkleSlot[] {
  return Array.from({ length: count }, (_, i) => ({
    candidateIndex: i,
    cycleDurationSec: 1.6 + Math.random() * 1.8,
    phaseOffsetSec: Math.random() * 4,
    lastPhase: 0,
  }));
}

/**
 * Continuous choreography driven entirely by scroll progress (0→1):
 * As the user scrolls, the necklace smoothly rotates (frames 1 to 150)
 * while smoothly sliding from slightly right-of-center to the left to
 * sit alongside the About copy.
 *
 * Mobile gets a different pose, not just a scaled-down version of desktop's:
 * BackgroundWordmark stacks its text at the top of the screen on narrow
 * viewports (rather than pinning it to the left edge, as on desktop), so the
 * necklace needs its own vertical band below the text instead of sharing the
 * same centered space — sharing it is what caused the overlap this fixes.
 * Where it ends up by progress=1 matters much less on mobile: AboutOverlay's
 * mobile layout is an opaque panel that covers most of the screen, so the
 * necklace is mostly hidden behind it there regardless of exact position.
 */
function getPose(progress: number, isMobile: boolean): Pose {
  const p = Math.max(0, Math.min(1, progress));

  if (isMobile) {
    // Fallback only, used for the handful of frames before the first
    // frame's content bounds are measured — see computeMobileContentFit,
    // which the tick loop uses instead (with the progress-blended target
    // from mobileTargetForProgress) as soon as bounds are available.
    return { xVw: 0, yVh: 4, scale: 1.6, rotateDeg: 0 };
  }

  // Linear slide from right-of-center to left for the About section.
  // No easing — keeps motion perfectly synced with frame rotation.
  return {
    xVw: lerp(0, -30, p),
    yVh: 0,
    scale: 1,
    rotateDeg: 0,
  };
}

/**
 * Fits the necklace's own content bounds (not the wide, mostly-empty 16:9
 * frame it was shot in) into a target band of the mobile viewport.
 *
 * The canvas draws each frame with a `contain` fit against the full
 * (portrait) canvas box, so a landscape photo only fills a slim horizontal
 * strip of it — most of the canvas height is transparent padding above and
 * below the necklace. Naively centering that whole canvas (the old
 * lerp-based mobile pose) left the necklace small and roughly centered in
 * the viewport, which is exactly the mid-screen gap with the necklace
 * dropping in low that the mobile layout was showing: half hidden behind
 * AboutOverlay's bottom panel, with a big empty band above it.
 *
 * This computes the scale/translate needed to place the necklace's actual
 * pixels — not the frame's canvas box — at the given target center/height
 * (fractions of viewport height; see mobileTargetForProgress).
 */
function computeMobileContentFit(
  canvas: HTMLCanvasElement,
  img: HTMLImageElement,
  bounds: ContentBounds,
  targetCenterY: number,
  targetHeight: number
): { scale: number; yVh: number } {
  const cw = canvas.width;
  const ch = canvas.height;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  if (!cw || !ch || !iw || !ih) return { scale: 1.6, yVh: 4 };

  // Same contain-fit math as drawFrame: how much of the canvas height the
  // drawn (letterboxed) image actually occupies, and where its vertical
  // center falls within the canvas.
  const fitScale = Math.min(cw / iw, ch / ih);
  const dh = ih * fitScale;
  const dy = (ch - dh) / 2;

  const boundsHeightFrac = Math.max(0.01, bounds.maxY - bounds.minY);
  const contentHeightInCanvasFrac = (boundsHeightFrac * ih * fitScale) / ch;
  const contentCenterYInCanvasFrac = (dy + ((bounds.minY + bounds.maxY) / 2) * ih * fitScale) / ch;

  const rawScale = targetHeight / contentHeightInCanvasFrac;
  const scale = Math.min(MOBILE_FIT_SCALE_MAX, Math.max(MOBILE_FIT_SCALE_MIN, rawScale));

  // wrapper.style.transform applies `scale` around the wrapper's own center
  // (50% of viewport) before `translate` — so the translate needed to move
  // the (now-scaled) content center to the target has to account for scale.
  const yVh = 100 * (targetCenterY - 0.5 - (contentCenterYInCanvasFrac - 0.5) * scale);

  return { scale, yVh };
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
 * itself per `getPose` above. The necklace spins continuously through all frames
 * as the user scrolls, while crossing to the left for the About section.
 */
export function NecklaceCanvas({ sceneState, reducedMotion }: NecklaceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const glintPointsRef = useRef<Map<number, { x: number; y: number }[]>>(new Map());
  // Per-frame horizontal center of mass (0-1) — see analyzeFrame. Used to
  // dynamically recenter the mobile pose regardless of rotation angle.
  const centerXRef = useRef<Map<number, number>>(new Map());
  // Per-frame content bounding box (0-1) — see analyzeFrame/computeMobileContentFit.
  const boundsRef = useRef<Map<number, ContentBounds>>(new Map());
  const sparkleSlotsRef = useRef<SparkleSlot[]>([]);
  if (sparkleSlotsRef.current.length === 0) {
    sparkleSlotsRef.current = makeSparkleSlots(SPARKLE_COUNT);
  }
  const lastFrameRef = useRef(-1);
  const rafRef = useRef<number>(0);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  // Gates the "Loading experience" card, separately from `isReady` (which
  // waits for all 150 frames). Waiting on all of them left the loader on
  // screen far longer than needed — the canvas is drawable, scrollable, and
  // spinnable the moment just the first frame has loaded; the rest stream in
  // silently behind it (drawFrame just holds the last-loaded frame for any
  // rotation angle that hasn't arrived yet, so there's nothing to block on).
  const [firstFrameLoaded, setFirstFrameLoaded] = useState(false);

  // Touch-drag rotation (mobile): a horizontal swipe spins the necklace
  // independently of scroll, since touch users expect to be able to "spin"
  // a product photo directly rather than only via the page scroll. Additive
  // to the scroll-driven frame index (see tick(), below) and wraps around
  // continuously rather than clamping, so it feels like a real 360° spin.
  const touchStartXRef = useRef<number | null>(null);
  const touchRotationOffsetRef = useRef(0);

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
    const firstFrameIndex = frameSequence.current[0];

    function recordAnalysis(fi: number, img: HTMLImageElement) {
      images[fi] = img;
      const analysis = analyzeFrame(img, SPARKLE_COUNT);
      glintPointsRef.current.set(fi, analysis.glintPoints);
      centerXRef.current.set(fi, analysis.centerX);
      boundsRef.current.set(fi, analysis.bounds);
    }

    // Load the first frame immediately for instant display — the loader
    // card comes down as soon as this one is in, not the whole sequence.
    const firstImg = new Image();
    const firstPromise = new Promise<void>((resolve) => {
      firstImg.onload = () => {
        recordAnalysis(firstFrameIndex, firstImg);
        imagesRef.current = images;
        setFirstFrameLoaded(true);
        // Draw right away once the canvas is sized.
        requestAnimationFrame(() => drawFrame(firstFrameIndex));
        loaded++;
        setLoadingProgress(Math.round((loaded / totalToLoad) * 100));
        resolve();
      };
      firstImg.onerror = () => {
        setFirstFrameLoaded(true);
        loaded++;
        setLoadingProgress(Math.round((loaded / totalToLoad) * 100));
        resolve();
      };
    });
    firstImg.src = getFramePath(firstFrameIndex);

    // Load the rest of the sequence (the first frame is already in flight above).
    const restPromises = frameSequence.current
      .filter((fi) => fi !== firstFrameIndex)
      .map((fi) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = getFramePath(fi);
          img.onload = () => {
            recordAnalysis(fi, img);
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

    Promise.all([firstPromise, ...restPromises]).then(() => {
      imagesRef.current = images;
      setIsReady(true);
    });
  }, [totalSequenceFrames, drawFrame]);

  // Resize both canvases to match CSS pixel size (retina-aware).
  useEffect(() => {
    const canvas = canvasRef.current;
    const sparkleCanvas = sparkleCanvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !sparkleCanvas || !wrapper) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        sparkleCanvas.width = width * dpr;
        sparkleCanvas.height = height * dpr;
        // Redraw at current frame after resize.
        if (lastFrameRef.current >= 0) {
          drawFrame(lastFrameRef.current);
        }
      }
    });

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [drawFrame]);

  // Touch drag → rotation. Passive listeners throughout: this only ever
  // reads touch position, it never needs to block the browser's own
  // handling, and touchAction: "pan-y" on the wrapper (below) is what keeps
  // vertical page scroll working smoothly alongside this.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const PIXELS_PER_FRAME = 4;

    function handleTouchStart(e: TouchEvent) {
      touchStartXRef.current = e.touches[0].clientX;
    }

    function handleTouchMove(e: TouchEvent) {
      if (touchStartXRef.current === null) return;
      const currentX = e.touches[0].clientX;
      const deltaX = currentX - touchStartXRef.current;
      touchStartXRef.current = currentX;
      touchRotationOffsetRef.current += deltaX / PIXELS_PER_FRAME;
    }

    function handleTouchEnd() {
      touchStartXRef.current = null;
    }

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    el.addEventListener("touchmove", handleTouchMove, { passive: true });
    el.addEventListener("touchend", handleTouchEnd, { passive: true });
    el.addEventListener("touchcancel", handleTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
      el.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  // Draws the twinkling glints on the sparkle canvas. Runs every tick
  // (unlike drawFrame, which only redraws when the rotation frame changes)
  // since sparkles animate on real elapsed time, independent of scroll.
  const drawSparkles = useCallback((frameIdx: number, timestampMs: number) => {
    const canvas = sparkleCanvasRef.current;
    const img = imagesRef.current[frameIdx];
    const points = glintPointsRef.current.get(frameIdx);
    if (!canvas || !img || !points || points.length === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const { dx, dy, dw, dh } = computeContainFit(canvas.width, canvas.height, img.naturalWidth, img.naturalHeight);
    const glintSize = Math.max(1.2, dw * 0.005);
    const t = timestampMs / 1000;

    for (const slot of sparkleSlotsRef.current) {
      const phase = ((t + slot.phaseOffsetSec) % slot.cycleDurationSec) / slot.cycleDurationSec;
      // Re-roll which facet this slot flashes on each time its cycle restarts.
      if (phase < slot.lastPhase) {
        slot.candidateIndex = Math.floor(Math.random() * points.length);
      }
      slot.lastPhase = phase;

      const opacity = Math.max(0, Math.sin(phase * Math.PI)) ** 3;
      if (opacity < 0.02) continue;

      const point = points[slot.candidateIndex % points.length];
      const px = dx + point.x * dw;
      const py = dy + point.y * dh;
      drawGlint(ctx, px, py, glintSize, opacity);
    }
  }, []);

  // Animation loop: read progress, draw the matching frame, reposition the
  // canvas per the current pose, and animate the sparkle overlay.
  useEffect(() => {
    function tick(timestampMs: number) {
      const progress = sceneState.current.progress;
      const clamped = Math.max(0, Math.min(1, progress));

      // Continuous rotation through all 150 frames across the entire scroll,
      // plus whatever a touch drag has added on top — wrapped, not clamped,
      // so dragging keeps spinning smoothly past either end of the sequence.
      const scrollIdx = clamped * (totalSequenceFrames - 1);
      const rawIdx = Math.round(scrollIdx + touchRotationOffsetRef.current);
      const seqIdx = ((rawIdx % totalSequenceFrames) + totalSequenceFrames) % totalSequenceFrames;
      const frameIdx = frameSequence.current[seqIdx];

      if (frameIdx !== lastFrameRef.current && frameIdx !== undefined) {
        lastFrameRef.current = frameIdx;
        drawFrame(frameIdx);
      }

      if (frameIdx !== undefined) {
        drawSparkles(frameIdx, timestampMs);
      }

      const wrapper = wrapperRef.current;
      if (wrapper) {
        const isMobile = window.innerWidth < MOBILE_BREAKPOINT_PX;
        // eslint-disable-next-line prefer-const -- scale/yVh are reassigned below once bounds are known
        let { xVw, yVh, scale, rotateDeg } = getPose(clamped, isMobile);

        // Recenter using the currently-displayed frame's own measured
        // center — see analyzeFrame. Desktop's xVw is a deliberate
        // choreographed slide (right-of-center hero → left for About), so
        // this correction only applies on mobile, where the goal is to
        // just keep the necklace centered regardless of rotation angle.
        let correction = 0;
        if (isMobile && frameIdx !== undefined) {
          const canvas = canvasRef.current;
          const img = imagesRef.current[frameIdx];
          const bounds = boundsRef.current.get(frameIdx);
          if (canvas && img && img.complete && img.naturalWidth && bounds) {
            const target = mobileTargetForProgress(clamped);
            const fit = computeMobileContentFit(canvas, img, bounds, target.centerY, target.height);
            scale = fit.scale;
            yVh = fit.yVh;
          }
          const centerX = centerXRef.current.get(frameIdx) ?? 0.5;
          correction = -(centerX - 0.5) * 100 * scale;
        }

        wrapper.style.transform = `translate(${xVw + correction}vw, ${yVh}vh) scale(${scale}) rotate(${rotateDeg}deg)`;
      }

      rafRef.current = requestAnimationFrame(tick);
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [sceneState, totalSequenceFrames, drawFrame, drawSparkles]);

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
      style={{ willChange: "transform", touchAction: "pan-y" }}
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        aria-label="Scroll-driven necklace assembly animation"
        role="img"
        style={{
          filter:
            "drop-shadow(0 25px 35px rgba(0,0,0,0.12)) drop-shadow(0 8px 12px rgba(0,0,0,0.08))",
        }}
      />

      {/* Twinkling glints over the diamond facets — see analyzeFrame/drawSparkles */}
      <canvas ref={sparkleCanvasRef} className="pointer-events-none absolute inset-0 z-[8] h-full w-full" aria-hidden="true" />

      {/* Dynamic bottom shadow — sits beneath the necklace, follows its position */}
      <div
        className="pointer-events-none absolute left-1/2 z-[5]"
        style={{
          bottom: "12%",
          width: "40%",
          height: "6%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.05) 40%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Loading indicator — fades out as soon as the first frame is drawable
          (the rest of the sequence streams in silently behind it), rather
          than blocking on all 150 frames. Always mounted so the fade is a
          smooth opacity transition instead of an abrupt pop. */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-500 ease-out ${
          firstFrameLoaded ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
        aria-hidden={firstFrameLoaded}
      >
        <div className="flex flex-col items-center gap-2 rounded-xl bg-white/85 px-4 py-3 shadow-md backdrop-blur-sm">
          <div className="h-0.5 w-20 overflow-hidden rounded-full bg-charcoal/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 transition-all duration-300 ease-out"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
          <p className="eyebrow text-[9px] tracking-widest text-charcoal/50">
            Loading experience
          </p>
        </div>
      </div>

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
