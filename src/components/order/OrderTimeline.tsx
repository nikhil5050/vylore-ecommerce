"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { OrderStatus } from "@/types/order";
import { cn } from "@/utils/cn";

const DELIVERY_RIDER_IMG = "https://ik.imagekit.io/vyloreimgs/vylore/dilveryicon.png";

// Provider-agnostic labels so a real shipping API can slot in later without
// UI changes — index maps to how far order_status has progressed.
const timelineSteps = ["Order Placed", "Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const STATUS_TO_STEP: Record<OrderStatus, number> = {
  pending_payment: 0,
  payment_failed: 0,
  paid: 1,
  processing: 2,
  shipped: 3,
  out_for_delivery: 4,
  delivered: 5,
  cancelled: 0,
  refund_pending: 0,
  refunded: 0,
};

const HALTED_STATUS_LABEL: Partial<Record<OrderStatus, string>> = {
  payment_failed: "Payment failed",
  cancelled: "Order cancelled",
  refund_pending: "Refund in progress",
  refunded: "Refunded",
};

const STEP_COUNT = timelineSteps.length;
const STEP_SPAN = 100 / STEP_COUNT;
const HALF_SPAN = STEP_SPAN / 2;

interface OrderTimelineProps {
  status?: OrderStatus;
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStep = status ? STATUS_TO_STEP[status] : 0;
  const haltedLabel = status ? HALTED_STATUS_LABEL[status] : undefined;

  // Rider starts at step 0 and animates forward to the real position on
  // mount/status-change, so the "moves forward" motion is always visible
  // instead of just appearing already-there.
  const [ridden, setRidden] = useState(0);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setRidden(currentStep));
    return () => cancelAnimationFrame(frame);
  }, [currentStep]);

  const railProgress = ridden * STEP_SPAN;
  const riderOffset = ridden * STEP_SPAN + HALF_SPAN;

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <p className="eyebrow text-xs text-muted">Order Status</p>
        {haltedLabel && <span className="text-xs font-medium text-burgundy">{haltedLabel}</span>}
      </div>

      {/* Mobile: vertical rail, rider travels top -> bottom */}
      <div className="mt-6 sm:hidden">
        <div className="relative" style={{ height: STEP_COUNT * 56 }}>
          <div
            className="absolute left-[15px] w-px bg-silver/40"
            style={{ top: `${HALF_SPAN}%`, bottom: `${HALF_SPAN}%` }}
          />
          <div
            className="order-rail-transition absolute left-[15px] w-px bg-burgundy transition-[height] duration-[1100ms] ease-out"
            style={{ top: `${HALF_SPAN}%`, height: `${railProgress}%` }}
          />
          <div
            className="order-rail-transition absolute left-[15px] z-20 -translate-x-1/2 -translate-y-1/2 transition-[top] duration-[1100ms] ease-out"
            style={{ top: `${riderOffset}%` }}
          >
            <RiderBadge size={30} />
          </div>

          <ol className="relative flex h-full flex-col justify-between">
            {timelineSteps.map((step, index) => (
              <li key={step} className="flex items-center gap-3" style={{ height: 56 }}>
                <span className="relative z-10 flex h-[30px] w-[30px] shrink-0 items-center justify-center">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 rounded-full ring-4 ring-white transition-colors duration-500",
                      index <= currentStep ? "bg-burgundy" : "bg-silver/60",
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "text-sm transition-colors duration-500",
                    index <= currentStep ? "font-medium text-charcoal" : "text-muted",
                  )}
                >
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Desktop / tablet: horizontal rail, rider travels left -> right */}
      <div className="mt-10 hidden sm:block">
        {/* Rail row: line, rider and dots all share this row's vertical center */}
        <div className="relative h-[34px]">
          <div
            className="absolute top-1/2 -translate-y-1/2 h-px bg-silver/40"
            style={{ left: `${HALF_SPAN}%`, right: `${HALF_SPAN}%` }}
          />
          <div
            className="order-rail-transition absolute top-1/2 -translate-y-1/2 h-px bg-burgundy transition-[width] duration-[1100ms] ease-out"
            style={{ left: `${HALF_SPAN}%`, width: `${railProgress}%` }}
          />
          <div
            className="order-rail-transition absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-[left] duration-[1100ms] ease-out"
            style={{ left: `${riderOffset}%` }}
          >
            <RiderBadge size={34} />
          </div>

          <div className="relative flex h-full">
            {timelineSteps.map((step, index) => (
              <div key={step} className="flex flex-1 items-center justify-center">
                <span
                  className={cn(
                    "h-2.5 w-2.5 rounded-full ring-4 ring-white transition-colors duration-500",
                    index <= currentStep ? "bg-burgundy" : "bg-silver/60",
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Labels row: separate flex-1 columns, aligned under the dots above */}
        <ol className="mt-2 flex">
          {timelineSteps.map((step, index) => (
            <li key={step} className="flex flex-1 justify-center px-1">
              <span
                className={cn(
                  "max-w-[6.5rem] text-center text-[11px] leading-tight transition-colors duration-500 lg:text-xs",
                  index <= currentStep ? "font-medium text-charcoal" : "text-muted",
                )}
              >
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function RiderBadge({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center rounded-full border-2 border-burgundy bg-white shadow-[0_2px_10px_rgba(0,0,0,0.18)]"
      style={{ height: size, width: size }}
    >
      <Image
        src={DELIVERY_RIDER_IMG}
        alt="Delivery rider"
        width={size - 4}
        height={size - 4}
        className="object-contain"
      />
    </div>
  );
}
