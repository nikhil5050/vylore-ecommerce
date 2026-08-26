import { apiFetch } from "@/lib/api";
import { formatPrice } from "@/utils/formatPrice";
import { formatCompactNumber } from "@/lib/admin/format";
import type { KpiCard, OrderStatusCount } from "@/types/admin";

interface BackendDashboardStats {
  total_customers: number;
  total_orders: number;
  total_revenue: number;
  orders_by_status: Record<string, number>;
  total_products: number;
}

export interface AdminDashboardOverview {
  kpis: KpiCard[];
  orderStatusCounts: OrderStatusCount[];
}

export async function getAdminDashboardOverview(): Promise<AdminDashboardOverview> {
  const stats = await apiFetch<BackendDashboardStats>("/admin/dashboard/stats");

  const kpis: KpiCard[] = [
    { label: "Revenue", value: formatPrice(stats.total_revenue) },
    { label: "Orders", value: formatCompactNumber(stats.total_orders) },
    { label: "Customers", value: formatCompactNumber(stats.total_customers) },
    { label: "Products", value: formatCompactNumber(stats.total_products) },
  ];

  const orderStatusCounts: OrderStatusCount[] = Object.entries(stats.orders_by_status)
    .map(([status, count]) => ({ status, count }))
    .sort((a, b) => b.count - a.count);

  return { kpis, orderStatusCounts };
}
