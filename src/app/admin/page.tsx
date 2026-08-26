import type { Metadata } from "next";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { OrderStatusCard } from "@/components/admin/OrderStatusCard";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { getDashboardOverview, getOrders } from "@/lib/admin/api";

export const metadata: Metadata = { title: "Dashboard" };

export default async function AdminDashboardPage() {
  const [overview, orders] = await Promise.all([getDashboardOverview(), getOrders()]);
  const recentOrders = orders.slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening with Vylore today.</p>
      </div>

      <DashboardStats kpis={overview.kpis} />

      <OrderStatusCard statuses={overview.orderStatusCounts} />

      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
}
