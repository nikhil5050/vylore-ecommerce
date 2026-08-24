import { Check, MapPin, PackageCheck, PackageSearch, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { shipmentStatusTone, statusDotClass, toTitleCase } from "@/lib/admin/status";
import { formatAdminDateTime } from "@/lib/admin/format";
import type { TrackingEvent } from "@/types/admin";

const stepIcon: Record<string, typeof Truck> = {
  ready_to_ship: PackageSearch,
  picked_up: PackageCheck,
  in_transit: Truck,
  out_for_delivery: Truck,
  delivered: Check,
  failed_delivery: PackageSearch,
  returned: PackageSearch,
};

export function TrackingTimeline({ events }: { events: TrackingEvent[] }) {
  return (
    <ol className="space-y-6">
      {events.map((event, index) => {
        const Icon = stepIcon[event.status] ?? MapPin;
        const isLast = index === events.length - 1;
        const tone = shipmentStatusTone[event.status] ?? "neutral";
        return (
          <li key={event.id} className="relative flex gap-4 pl-1">
            {!isLast && <span className="absolute top-8 left-[19px] h-[calc(100%+8px)] w-px bg-border" />}
            <span
              className={cn(
                "z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-background text-white",
                statusDotClass(tone),
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="pt-1">
              <p className="text-sm font-medium text-foreground">{toTitleCase(event.status)}</p>
              <p className="text-sm text-muted-foreground">{event.location}</p>
              <p className="mt-0.5 text-xs text-muted-foreground/80">{formatAdminDateTime(event.timestamp)}</p>
              {event.note && <p className="mt-1 text-xs text-muted-foreground">{event.note}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
