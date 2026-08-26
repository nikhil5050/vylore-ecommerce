import { IndianRupee, Package, ShoppingBag, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/admin/ui/card";
import type { KpiCard } from "@/types/admin";

const iconByLabel: Record<string, LucideIcon> = {
  Revenue: IndianRupee,
  Orders: ShoppingBag,
  Customers: Users,
  Products: Package,
};

export function DashboardStats({ kpis }: { kpis: KpiCard[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = iconByLabel[kpi.label] ?? IndianRupee;
        return (
          <Card key={kpi.label}>
            <CardContent className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="mt-1.5 font-serif text-2xl font-semibold text-foreground">{kpi.value}</p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" strokeWidth={1.75} />
              </span>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
