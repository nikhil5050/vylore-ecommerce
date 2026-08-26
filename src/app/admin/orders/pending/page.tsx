"use client";

import { useEffect, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { OrdersTable } from "@/components/admin/OrdersTable";
import { getOrders } from "@/lib/admin/api";
import type { AdminOrder } from "@/types/admin";

export default function PendingOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    getOrders().then(setOrders);
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader title="Pending Orders" description="Orders awaiting payment confirmation." />
      <OrdersTable
        orders={orders.filter((o) => o.status === "pending_payment" || o.status === "payment_failed")}
        hideStatusFilter
      />
    </div>
  );
}
