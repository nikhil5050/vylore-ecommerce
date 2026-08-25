import type { OrderStatus } from "@/types/order";
import { cn } from "@/utils/cn";

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

interface OrderTimelineProps {
  status?: OrderStatus;
}

export function OrderTimeline({ status }: OrderTimelineProps) {
  const currentStep = status ? STATUS_TO_STEP[status] : 0;

  return (
    <div>
      <p className="eyebrow text-xs text-muted">Order Status</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {timelineSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full", index <= currentStep ? "bg-burgundy" : "bg-silver/50")} />
            <span className={cn("text-xs", index <= currentStep ? "text-charcoal" : "text-muted")}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
