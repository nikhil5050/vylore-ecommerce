"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { cn } from "@/utils/cn";

interface Feature {
  id: string;
  label: string;
  detail: string;
  side: "left" | "right";
  textStyle: string;
  // Percentage coordinates relative to container width (x) and height (y)
  textPoint: { x: number; y: number };
  targetPoint: { x: number; y: number };
}

const materialDetails: Feature[] = [
  // Left Side Features -> Connecting to Ring parts
  {
    id: "silver-base",
    label: "Sterling Silver Base",
    detail: "Chosen for lasting brilliance & durability",
    side: "left",
    textStyle: "top-[15%] left-[2%] lg:left-[4%]",
    textPoint: { x: 25, y: 18 },
    targetPoint: { x: 44, y: 30 },
  },
  {
    id: "thoughtful-design",
    label: "Thoughtful Design",
    detail: "Precision carved band for a comfortable fit",
    side: "left",
    textStyle: "top-[46%] left-[2%] lg:left-[4%]",
    textPoint: { x: 25, y: 49 },
    targetPoint: { x: 38, y: 50 },
  },
  {
    id: "hand-finished",
    label: "Hand-Finished Polish",
    detail: "Refined finish crafted by master jewelers",
    side: "left",
    textStyle: "top-[78%] left-[2%] lg:left-[4%]",
    textPoint: { x: 25, y: 81 },
    targetPoint: { x: 40.5, y: 74 },
  },
  // Right Side Features -> Connecting to Ring parts
  {
    id: "zirconia",
    label: "Brilliant Cubic Zirconia",
    detail: "Hand-set stones for an unmatched sparkle",
    side: "right",
    textStyle: "top-[15%] right-[2%] lg:right-[4%]",
    textPoint: { x: 75, y: 18 },
    targetPoint: { x: 54, y: 22.5 },
  },
  {
    id: "micro-pave",
    label: "Polished Band",
    detail: "Seamless, high-shine finish for everyday wear",
    side: "right",
    textStyle: "top-[46%] right-[2%] lg:right-[4%]",
    textPoint: { x: 75, y: 49 },
    targetPoint: { x: 62, y: 37 },
  },
  {
    id: "made-to-last",
    label: "Made to Last",
    detail: "Hypoallergenic coating built for every chapter",
    side: "right",
    textStyle: "top-[78%] right-[2%] lg:right-[4%]",
    textPoint: { x: 75, y: 81 },
    targetPoint: { x: 57, y: 57 },
  },
];

function ProductPortrait({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* Soft glow behind the ring */}
      <div className="absolute left-1/2 top-1/2 h-[85%] w-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy/5 blur-3xl" />
      <motion.div
        className="relative h-full w-full"
        animate={{ scale: [1, 1.03, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src="https://ik.imagekit.io/vyloreimgs/vylore/ringmeterial.png"
          alt="Vylore Premium Gold Rings"
          fill
          priority
          sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 400px"
          className="object-contain"
        />
      </motion.div>
    </div>
  );
}

export function MaterialStory() {
  return (
    <section className="overflow-hidden border-y border-charcoal/5 bg-white py-16 sm:py-20 lg:py-24">
      <Container>
        {/* Top Header */}
        <FadeIn className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-burgundy/20 bg-burgundy/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-burgundy">
            <span className="h-1.5 w-1.5 rounded-full bg-burgundy animate-pulse" />
            Basic And Exquisite
          </span>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
            Best Material
          </h2>
        </FadeIn>

        {/* Desktop Diagram */}
        <div className="relative mx-auto mt-12 hidden max-w-5xl sm:mt-16 sm:block sm:h-[520px] lg:h-[580px]">
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {materialDetails.map((item, index) => (
              <g key={`svg-${item.id}`}>
                {/* Animated Dashed Connecting Line */}
                <motion.line
                  x1={item.textPoint.x}
                  y1={item.textPoint.y}
                  x2={item.targetPoint.x}
                  y2={item.targetPoint.y}
                  stroke="#8B263E"
                  strokeWidth="0.35"
                  strokeDasharray="1.2 1.2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.2,
                    delay: 0.2 + index * 0.15,
                    ease: "easeInOut",
                  }}
                />

                {/* Location-ping ring, pulsing outward */}
                <motion.circle
                  cx={item.targetPoint.x}
                  cy={item.targetPoint.y}
                  r="0.8"
                  fill="none"
                  stroke="#8B263E"
                  strokeWidth="0.3"
                  initial={{ scale: 1, opacity: 0 }}
                  whileInView={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1.6,
                    delay: 1.4 + index * 0.15,
                    repeat: Infinity,
                    repeatDelay: 1.2,
                    ease: "easeOut",
                  }}
                />

                {/* Target Point Touch Circle on Product */}
                <motion.circle
                  cx={item.targetPoint.x}
                  cy={item.targetPoint.y}
                  r="0.8"
                  fill="#6B1D2F"
                  stroke="#ffffff"
                  strokeWidth="0.3"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: 1.3 + index * 0.15,
                    ease: "backOut",
                  }}
                />
              </g>
            ))}
          </svg>

          <ProductPortrait className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 lg:h-[400px] lg:w-[400px]" />

          {/* Feature Text Labels */}
          {materialDetails.map((item, index) => (
            <FadeIn
              key={item.id}
              delay={0.1 + index * 0.1}
              className={`absolute max-w-[190px] lg:max-w-[230px] ${item.textStyle} ${
                item.side === "left" ? "text-right" : "text-left"
              }`}
            >
              <p className="font-serif text-sm font-semibold text-charcoal lg:text-base">
                {item.label}
              </p>
              <p className="mt-0.5 text-[11px] leading-tight text-muted">
                {item.detail}
              </p>
              <div
                className={`mt-2 flex ${
                  item.side === "left" ? "justify-end" : "justify-start"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`material-arrow ${
                    item.side === "left"
                      ? "material-arrow-right"
                      : "material-arrow-left"
                  }`}
                />
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Mobile Layout */}
        <div className="mt-7 sm:hidden">
          <ProductPortrait className="relative mx-auto h-[210px] w-[210px]" />

          <div className="mt-5 grid gap-3 border-t border-charcoal/10 pt-5">
            {materialDetails.map((item, index) => (
              <FadeIn key={`mobile-${item.id}`} delay={0.05 * index} direction="scale">
                <div className="rounded-xl border border-charcoal/10 bg-[#FAF9F6] p-3.5">
                  <div className={cn(
                    "flex items-center gap-3",
                    item.side === "right" ? "flex-row-reverse text-right" : "text-left"
                  )}>
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-burgundy/10 text-burgundy">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-sm font-semibold leading-snug text-charcoal">
                        {item.label}
                      </p>
                      <p className="mt-1 text-xs leading-snug text-muted">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                  <div className={cn(
                    "mt-3 flex items-center gap-2",
                    item.side === "right" ? "justify-start" : "justify-end"
                  )}>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "material-arrow w-24",
                        item.side === "left" ? "material-arrow-right" : "material-arrow-left"
                      )}
                    />
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-burgundy" aria-hidden="true" />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}