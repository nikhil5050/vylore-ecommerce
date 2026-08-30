"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons/Icons";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { ProductThumbnail } from "@/components/ui/ProductThumbnail";
import type { ProductImage } from "@/types/product";

interface ProductImageZoomProps {
  productName: string;
  images: ProductImage[];
  initialIndex: number;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const TAP_ZOOM_SCALE = 2.5;
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_SLOP_PX = 28;
const SWIPE_THRESHOLD_PX = 50;
const ZOOM_EPSILON = 0.01;

interface Point {
  x: number;
  y: number;
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

/**
 * Full-screen pan/zoom viewer for product images — double-tap or scroll to
 * zoom, drag to pan while zoomed, pinch with two fingers, swipe to move
 * between images while at 1x. Scale/pan are refs applied directly to the
 * transformed element's style (not React state) so drag/pinch stay smooth at
 * 60fps — the same pattern used for the scroll-driven necklace canvas
 * elsewhere in this app, for the same reason.
 */
export function ProductImageZoom({ productName, images, initialIndex, onClose }: ProductImageZoomProps) {
  const [index, setIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const views = images.length > 0 ? images : [undefined];
  const activeImage = views[index];

  const stageRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  const scaleRef = useRef(MIN_SCALE);
  const panRef = useRef<Point>({ x: 0, y: 0 });
  const pointersRef = useRef<Map<number, Point>>(new Map());
  const dragRef = useRef<{ pan: Point; point: Point } | null>(null);
  const pinchRef = useRef<{ dist: number; scale: number; mid: Point } | null>(null);
  const lastTapRef = useRef<{ time: number; point: Point } | null>(null);
  const swipeRef = useRef<Point | null>(null);

  const applyTransform = useCallback(() => {
    const el = imgWrapRef.current;
    if (!el) return;
    el.style.transform = `translate(${panRef.current.x}px, ${panRef.current.y}px) scale(${scaleRef.current})`;
  }, []);

  const clampPan = useCallback((point: Point, scale: number): Point => {
    const el = stageRef.current;
    if (!el) return point;
    const maxX = (el.clientWidth * (scale - 1)) / 2;
    const maxY = (el.clientHeight * (scale - 1)) / 2;
    return {
      x: Math.min(maxX, Math.max(-maxX, point.x)),
      y: Math.min(maxY, Math.max(-maxY, point.y)),
    };
  }, []);

  // Zooms to `nextScale`, keeping the point under `anchor` (viewport
  // coordinates) visually stationary — the same "zoom toward this point"
  // math whether it's a double-tap, a pinch midpoint, or the cursor.
  const setZoom = useCallback(
    (nextScale: number, anchor: Point) => {
      const el = stageRef.current;
      if (!el) return;
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
      const rect = el.getBoundingClientRect();
      const dx = anchor.x - (rect.left + rect.width / 2);
      const dy = anchor.y - (rect.top + rect.height / 2);
      const factor = clamped / scaleRef.current;
      const nextPan = clampPan(
        { x: dx - (dx - panRef.current.x) * factor, y: dy - (dy - panRef.current.y) * factor },
        clamped
      );
      scaleRef.current = clamped;
      panRef.current = nextPan;
      applyTransform();
      setIsZoomed(clamped > MIN_SCALE + ZOOM_EPSILON);
    },
    [applyTransform, clampPan]
  );

  const resetZoom = useCallback(() => {
    scaleRef.current = MIN_SCALE;
    panRef.current = { x: 0, y: 0 };
    applyTransform();
    setIsZoomed(false);
  }, [applyTransform]);

  // Every image starts unzoomed. Reset happens right alongside `setIndex`
  // at each call site (goTo, below) rather than reactively in an effect —
  // setting state synchronously inside an effect body just to mirror
  // another piece of state triggers an extra render pass for no benefit.
  const goTo = useCallback(
    (updater: number | ((current: number) => number)) => {
      const raw = typeof updater === "function" ? updater(index) : updater;
      const next = Math.min(views.length - 1, Math.max(0, raw));
      if (next !== index) {
        setIndex(next);
        resetZoom();
      }
    },
    [index, resetZoom, views.length]
  );

  // Background scroll would fight the modal's own pan/pinch gestures.
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") goTo((i) => i + 1);
      else if (e.key === "ArrowLeft") goTo((i) => i - 1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goTo]);

  function handlePointerDown(e: React.PointerEvent) {
    (e.target as Element).setPointerCapture?.(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1) {
      dragRef.current = { pan: { ...panRef.current }, point: { x: e.clientX, y: e.clientY } };
      swipeRef.current = { x: e.clientX, y: e.clientY };
    } else if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      pinchRef.current = { dist: distance(pts[0], pts[1]), scale: scaleRef.current, mid: midpoint(pts[0], pts[1]) };
      dragRef.current = null;
    }
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!pointersRef.current.has(e.pointerId)) return;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2 && pinchRef.current) {
      const pts = Array.from(pointersRef.current.values());
      const dist = distance(pts[0], pts[1]);
      if (pinchRef.current.dist > 0) {
        setZoom(pinchRef.current.scale * (dist / pinchRef.current.dist), pinchRef.current.mid);
      }
      return;
    }

    if (pointersRef.current.size === 1 && dragRef.current && scaleRef.current > MIN_SCALE + ZOOM_EPSILON) {
      const dxTotal = e.clientX - dragRef.current.point.x;
      const dyTotal = e.clientY - dragRef.current.point.y;
      panRef.current = clampPan(
        { x: dragRef.current.pan.x + dxTotal, y: dragRef.current.pan.y + dyTotal },
        scaleRef.current
      );
      applyTransform();
    }
  }

  function handlePointerUp(e: React.PointerEvent) {
    const point = pointersRef.current.get(e.pointerId) ?? { x: e.clientX, y: e.clientY };
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) pinchRef.current = null;

    if (pointersRef.current.size === 0) {
      const now = Date.now();
      const last = lastTapRef.current;
      const isDoubleTap = !!last && now - last.time < DOUBLE_TAP_MS && distance(last.point, point) < DOUBLE_TAP_SLOP_PX;

      if (isDoubleTap) {
        setZoom(scaleRef.current > MIN_SCALE + ZOOM_EPSILON ? MIN_SCALE : TAP_ZOOM_SCALE, point);
        lastTapRef.current = null;
      } else {
        lastTapRef.current = { time: now, point };
      }

      // Swipe between images, only when not zoomed in (otherwise a pan
      // gesture would also flip images, which fights the drag-to-pan above).
      if (!isDoubleTap && scaleRef.current <= MIN_SCALE + ZOOM_EPSILON && swipeRef.current) {
        const dx = point.x - swipeRef.current.x;
        if (Math.abs(dx) > SWIPE_THRESHOLD_PX) {
          goTo((i) => (dx < 0 ? i + 1 : i - 1));
        }
      }
      swipeRef.current = null;
      dragRef.current = null;
    }
  }

  function handleWheel(e: React.WheelEvent) {
    e.preventDefault();
    const factor = 1 - e.deltaY * 0.0015;
    setZoom(scaleRef.current * factor, { x: e.clientX, y: e.clientY });
  }

  function handleDoubleClick(e: React.MouseEvent) {
    setZoom(scaleRef.current > MIN_SCALE + ZOOM_EPSILON ? MIN_SCALE : TAP_ZOOM_SCALE, { x: e.clientX, y: e.clientY });
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-charcoal/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${productName} — zoomed image`}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close zoom"
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-ivory transition-colors hover:bg-white/20"
      >
        <CloseIcon className="h-5 w-5" />
      </button>

      {views.length > 1 && (
        <p className="pointer-events-none absolute left-1/2 top-4 z-10 -translate-x-1/2 text-xs tracking-widest text-ivory/70">
          {index + 1} / {views.length}
        </p>
      )}

      <div
        ref={stageRef}
        className="relative flex-1 touch-none select-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
      >
        <div
          ref={imgWrapRef}
          className="h-full w-full"
          style={{ transform: "translate(0px, 0px) scale(1)", transformOrigin: "center center" }}
        >
          {activeImage ? (
            <ProductThumbnail
              src={activeImage.url}
              alt={activeImage.altText ?? productName}
              transform="w-1600"
              className="pointer-events-none h-full w-full object-contain"
            />
          ) : (
            <PlaceholderImage className="h-full w-full" />
          )}
        </div>
      </div>

      {!isZoomed && (
        <p className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-[11px] tracking-wide text-ivory/60">
          Double-tap or scroll to zoom{views.length > 1 ? " · swipe to browse" : ""}
        </p>
      )}
    </div>
  );
}
