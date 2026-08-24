"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, PackageX, Truck, TruckIcon } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { ShipmentTable } from "@/components/admin/ShipmentTable";
import { CreateShipmentDialog } from "@/components/admin/CreateShipmentDialog";
import { Card, CardContent } from "@/components/admin/ui/card";
import { mockShipments } from "@/lib/admin/mock";
import type { Shipment } from "@/types/admin";

function StatCard({ label, value, icon: Icon }: { label: string; value: number; icon: typeof Truck }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1.5 font-serif text-2xl font-semibold text-foreground">{value}</p>
        </div>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </CardContent>
    </Card>
  );
}

export default function ShippingPage() {
  const [shipments, setShipments] = useState<Shipment[]>(mockShipments);

  const stats = useMemo(() => {
    const inTransit = shipments.filter((s) => s.status === "in_transit" || s.status === "out_for_delivery" || s.status === "picked_up").length;
    const delivered = shipments.filter((s) => s.status === "delivered").length;
    const failed = shipments.filter((s) => s.status === "failed_delivery" || s.status === "returned").length;
    return { total: shipments.length, inTransit, delivered, failed };
  }, [shipments]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Shipments"
        description="Track and manage every dispatched order fulfilled through your delivery partners."
        actions={<CreateShipmentDialog onCreated={(shipment) => setShipments((prev) => [shipment, ...prev])} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Shipments" value={stats.total} icon={Truck} />
        <StatCard label="In Transit" value={stats.inTransit} icon={TruckIcon} />
        <StatCard label="Delivered" value={stats.delivered} icon={CheckCircle2} />
        <StatCard label="Failed / Returned" value={stats.failed} icon={PackageX} />
      </div>

      <ShipmentTable shipments={shipments} />
    </div>
  );
}
