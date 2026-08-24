import type { KpiCard, OrderStatusCount, SalesPoint } from "@/types/admin";
import { mockOrders } from "./orders";
import { mockCustomers } from "./customers";
import { mockProducts } from "./products";

export const mockKpis: KpiCard[] = [
  { label: "Revenue", value: "₹2.84L", changePercent: 12.5, comparisonLabel: "vs last month" },
  { label: "Orders", value: "128", changePercent: 8.2, comparisonLabel: "vs last month" },
  { label: "Customers", value: "1,842", changePercent: 4.6, comparisonLabel: "vs last month" },
  { label: "Products", value: "326", changePercent: 2.1, comparisonLabel: "vs last month" },
];

const baseline = 42000;
const DAYS_OF_HISTORY = 365;
export const mockSalesSeries: SalesPoint[] = Array.from({ length: DAYS_OF_HISTORY }).map((_, index) => {
  const date = new Date("2026-08-24T00:00:00Z");
  date.setDate(date.getDate() - (DAYS_OF_HISTORY - 1 - index));
  const wave = Math.sin(index / 3.2) * 8000;
  const season = Math.sin(index / 60) * 12000;
  const trend = index * 45;
  const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6 ? 6000 : 0;
  const revenue = Math.max(6000, Math.round(baseline * 0.4 + wave + season + trend + weekend));
  const orders = Math.max(2, Math.round(revenue / 3200));
  return { date: date.toISOString().slice(0, 10), revenue, orders };
});

export const mockOrderStatusCounts: OrderStatusCount[] = [
  { status: "Pending", count: 24 },
  { status: "Processing", count: 31 },
  { status: "Shipped", count: 42 },
  { status: "Delivered", count: 87 },
  { status: "Cancelled", count: 4 },
];

export const mockDashboardTotals = {
  totalCustomers: mockCustomers.length,
  totalProducts: mockProducts.length,
  totalOrders: mockOrders.length,
};
