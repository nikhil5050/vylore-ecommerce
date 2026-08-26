"use client";

import { useEffect, useState } from "react";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { OrderStatusCard } from "@/components/admin/OrderStatusCard";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { getDashboardOverview, getOrders } from "@/lib/admin/api";
import type { AdminDashboardOverview } from "@/services/admin/dashboard.service";
import type { AdminOrder } from "@/types/admin";

export default function AdminDashboardPage() {
  const [overview, setOverview] = useState<AdminDashboardOverview | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);

  useEffect(() => {
    Promise.all([getDashboardOverview(), getOrders()]).then(([overviewResult, ordersResult]) => {
      setOverview(overviewResult);
      setOrders(ordersResult);
    });
  }, []);

  if (!overview) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening with Vylore today.</p>
      </div>

      <DashboardStats kpis={overview.kpis} />

      <OrderStatusCard statuses={overview.orderStatusCounts} />

      <RecentOrdersTable orders={orders.slice(0, 6)} />
    </div>
  );
}
