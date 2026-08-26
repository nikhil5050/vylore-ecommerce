"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";
import type { AdminOrder } from "@/types/admin";

export default function ProcessingOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Processing Orders" description="Paid orders being prepared for shipment." />
      <OrdersTable orders={orders.filter((o) => o.status === "paid" || o.status === "processing")} hideStatusFilter />
    </div>
  );
}
