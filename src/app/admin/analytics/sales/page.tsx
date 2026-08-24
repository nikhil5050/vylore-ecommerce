import type { Metadata } from "next";
import { PageHeader } from "@/components/admin/PageHeader";
import { SalesAnalyticsView } from "@/components/admin/analytics/SalesAnalyticsView";
import { mockSalesSeries } from "@/lib/admin/mock";

export const metadata: Metadata = { title: "Sales Analytics" };

export default function SalesAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Sales Analytics" description="Revenue and order trends across any time period." />
      <SalesAnalyticsView data={mockSalesSeries} />
    </div>
  );
}
