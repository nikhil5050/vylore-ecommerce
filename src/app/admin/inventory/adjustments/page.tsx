import type { Metadata } from "next";
import Link from "next/link";
import { History } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { AdminEmptyState } from "@/components/admin/AdminEmptyState";
import { Button } from "@/components/admin/ui/button";

export const metadata: Metadata = { title: "Stock Adjustments" };

export default function StockAdjustmentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Stock Adjustments" description="A log of manual inventory changes." />
      <AdminEmptyState
        icon={History}
        title="Adjustment history isn't tracked yet"
        description="The backend doesn't keep an audit log of stock changes. Use the Stock Overview page to adjust quantities directly."
        action={
          <Button size="sm" variant="outline" nativeButton={false} render={<Link href="/admin/inventory" />}>
            Go to Stock Overview
          </Button>
        }
      />
    </div>
  );
}
