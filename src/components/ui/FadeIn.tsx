"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  // Which direction the content settles in from. Defaults to "up", which
  // matches every existing call site's behavior exactly.
  direction?: "up" | "left" | "right" | "scale";
}

const hiddenByDirection: Record<NonNullable<FadeInProps["direction"]>, Variants["hidden"]> = {
  up: { opacity: 0, y: 24 },
  left: { opacity: 0, x: -32 },
  right: { opacity: 0, x: 32 },
  scale: { opacity: 0, scale: 0.94 },
};

export function FadeIn({ children, delay = 0, className, direction = "up" }: FadeInProps) {
  const variants: Variants = {
    hidden: hiddenByDirection[direction],
    visible: { opacity: 1, y: 0, x: 0, scale: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
