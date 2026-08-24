import type { Metadata } from "next";
import { Repeat, UserPlus, Users } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { MetricCard } from "@/components/admin/analytics/MetricCard";
import { CustomerGrowthChart, type CustomerGrowthDatum } from "@/components/admin/analytics/CustomerGrowthChart";
import { CategoryPieChart } from "@/components/admin/analytics/CategoryPieChart";
import { mockCustomers } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Customer Analytics" };

function buildGrowth(): CustomerGrowthDatum[] {
  const sorted = [...mockCustomers].sort((a, b) => (a.joinedAt < b.joinedAt ? -1 : 1));
  const byMonth = new Map<string, number>();
  for (const customer of sorted) {
    const month = customer.joinedAt.slice(0, 7);
    byMonth.set(month, (byMonth.get(month) ?? 0) + 1);
  }
  const months = [...byMonth.keys()].sort();
  let cumulative = 0;
  return months.map((month) => {
    cumulative += byMonth.get(month) ?? 0;
    const label = new Date(`${month}-01`).toLocaleDateString("en-IN", { month: "short", year: "2-digit" });
    return { month: label, customers: cumulative };
  });
}

export default function CustomerAnalyticsPage() {
  const growth = buildGrowth();
  const total = mockCustomers.length;
  const repeat = mockCustomers.filter((c) => c.ordersCount > 1).length;
  const repeatRate = total ? Math.round((repeat / total) * 100) : 0;
  const newCustomers = total - repeat;

  return (
    <div className="space-y-6">
      <PageHeader title="Customer Analytics" description="Growth, retention and repeat purchase behaviour." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <MetricCard label="Total Customers" value={total.toLocaleString("en-IN")} icon={Users} />
        <MetricCard label="Repeat Customers" value={`${repeatRate}%`} icon={Repeat} hint={`${repeat} of ${total} customers`} />
        <MetricCard label="New Customers" value={newCustomers.toLocaleString("en-IN")} icon={UserPlus} hint="Single-order customers" />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <CustomerGrowthChart data={growth} />
        <CategoryPieChart
          title="New vs Returning"
          description="Share of customers by purchase history"
          data={[
            { name: "Returning (2+ orders)", value: repeat },
            { name: "New (1 order)", value: newCustomers },
          ]}
        />
      </div>
    </div>
  );
}
