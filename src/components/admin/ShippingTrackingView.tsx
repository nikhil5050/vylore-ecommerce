"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/admin/ui/card";
import { Input } from "@/components/admin/ui/input";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { TrackingTimeline } from "@/components/admin/TrackingTimeline";
import { shipmentStatusTone } from "@/lib/admin/status";
import { cn } from "@/lib/utils";
import { mockShipments, mockTrackingEvents } from "@/lib/admin/mock";
import { PackageSearch } from "lucide-react";

export function ShippingTrackingView() {
  const searchParams = useSearchParams();
  const initialAwb = searchParams.get("awb");
  const initialShipment = mockShipments.find((s) => s.awb === initialAwb) ?? mockShipments[0];

  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | undefined>(initialShipment?.id);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return mockShipments;
    return mockShipments.filter(
      (s) => s.awb.toLowerCase().includes(q) || s.orderId.toLowerCase().includes(q) || s.customerName.toLowerCase().includes(q),
    );
  }, [query]);

  const selected = mockShipments.find((s) => s.id === selectedId);
  const events = selected ? mockTrackingEvents[selected.orderId] : undefined;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[360px_1fr]">
      <Card className="h-fit">
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-base">Shipments</CardTitle>
          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search AWB, order or customer…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardHeader>
        <CardContent className="max-h-[520px] space-y-1 overflow-y-auto px-2 pt-2">
          {filtered.map((shipment) => (
            <button
              key={shipment.id}
              type="button"
              onClick={() => setSelectedId(shipment.id)}
              className={cn(
                "flex w-full flex-col gap-1 rounded-lg border px-3 py-2 text-left text-sm transition-colors",
                selectedId === shipment.id ? "border-primary/30 bg-primary/5" : "border-transparent hover:bg-muted",
              )}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="font-medium text-foreground">#{shipment.orderId}</span>
                <StatusBadge status={shipment.status} tone={shipmentStatusTone[shipment.status] ?? "neutral"} />
              </span>
              <span className="text-xs text-muted-foreground">{shipment.customerName}</span>
              <span className="font-mono text-[11px] text-muted-foreground/80">{shipment.awb}</span>
            </button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle className="text-base">
            {selected ? `Tracking — #${selected.orderId}` : "Select a shipment"}
          </CardTitle>
          {selected && (
            <p className="mt-1 text-sm text-muted-foreground">
              {selected.customerName} &middot; {selected.courier} &middot; {selected.destinationCity}
            </p>
          )}
        </CardHeader>
        <CardContent className="pt-6">
          {events?.length ? (
            <TrackingTimeline events={events} />
          ) : (
            <AdminEmptyState
              icon={PackageSearch}
              title="No tracking history yet"
              description="Tracking updates will appear here once the courier partner reports status events."
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
