import { IndianRupee, Package, ShoppingBag, TrendingDown, TrendingUp, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/admin/ui/card";
import { cn } from "@/lib/utils";
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
        const positive = kpi.changePercent >= 0;
        return (
          <Card key={kpi.label}>
            <CardContent className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{kpi.label}</p>
                <p className="mt-1.5 font-serif text-2xl font-semibold text-foreground">{kpi.value}</p>
                <p className="mt-2 flex items-center gap-1 text-xs">
                  <span
                    className={cn(
                      "flex items-center gap-0.5 rounded-full px-1.5 py-0.5 font-medium",
                      positive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive",
                    )}
                  >
                    {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {positive ? "+" : ""}
                    {kpi.changePercent}%
                  </span>
                  <span className="text-muted-foreground">{kpi.comparisonLabel}</span>
                </p>
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
