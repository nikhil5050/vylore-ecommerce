import type { Metadata } from "next";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { SalesChart } from "@/components/admin/SalesChart";
import { OrderStatusCard } from "@/components/admin/OrderStatusCard";
import { RecentOrdersTable } from "@/components/admin/RecentOrdersTable";
import { mockKpis, mockOrderStatusCounts, mockOrders, mockSalesSeries } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Dashboard" };

export default function AdminDashboardPage() {
  const recentOrders = [...mockOrders]
    .sort((a, b) => (a.placedAt < b.placedAt ? 1 : -1))
    .slice(0, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold text-foreground sm:text-3xl">hii, Akash sir</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here&apos;s what&apos;s happening with Vylore today.</p>
      </div>

      <DashboardStats kpis={mockKpis} />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <SalesChart data={mockSalesSeries} />
        </div>
        <OrderStatusCard statuses={mockOrderStatusCounts} />
      </div>

      <RecentOrdersTable orders={recentOrders} />
    </div>
  );
}
