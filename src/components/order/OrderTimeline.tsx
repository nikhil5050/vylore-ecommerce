import { cn } from "@/utils/cn";

// Only "Order Placed" reflects real data — later stages have no fulfillment
// backend yet, so they render as pending rather than fabricated. This is
// intentionally provider-agnostic so a real shipping API can slot in later
// without UI changes.
const timelineSteps = ["Order Placed", "Confirmed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

export function OrderTimeline() {
  return (
    <div>
      <p className="eyebrow text-xs text-muted">Order Status</p>
      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
        {timelineSteps.map((step, index) => (
          <div key={step} className="flex items-center gap-2">
            <span className={cn("h-2 w-2 rounded-full", index === 0 ? "bg-burgundy" : "bg-silver/50")} />
            <span className={cn("text-xs", index === 0 ? "text-charcoal" : "text-muted")}>{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
